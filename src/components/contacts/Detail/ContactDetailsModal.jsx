/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './details.scss';

import moment from 'moment';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Grid,
  Icon,
  Modal,
  TransitionablePortal,
} from 'semantic-ui-react';
import ChatImage from 'assets/images/ContactChatIcon.svg';
import toOthersactionsImage from 'assets/images/ContactOthersIcon.svg';
import SendCashImage from 'assets/images/ContactSendcashIcon.svg';
import sendMoneyIcon from 'assets/images/ContactSendmoneyIcon.svg';
import TransactionsImage from 'assets/images/ContactTransactionsIcon.svg';
import ContactVoucherIcon from 'assets/images/ContactVoucherIcon.svg';
import EditWalletImage from 'assets/images/ContactWalletIcon.svg';
import SimplePieChart from 'components/common/charts/pie';
import ActionOption from 'components/common/CircleOption';
import LoaderComponent from 'components/common/Loader';
import Thumbnail from 'components/common/Thumbnail';
import WalletCarousel from 'components/common/WalletCarousselSelector';
import { ONE_TO_ONE } from 'constants/general';
import {
  openChatList,
  setGlobalChat,
} from 'redux/actions/chat/globalchat';
import { clearDeleteContact } from 'redux/actions/contacts/deleteContact';
import {
  setIsendingCash,
  setIsSendingMoney,
  setIsTopingUp,
} from 'redux/actions/dashboard/dashboard';
import getAllTransactionHistory from 'redux/actions/transactions/getHistory';
import allCountries from 'utils/countries';
import countries from 'utils/countryCodes';
import useWindowSize from 'utils/useWindowSize';
import AirtimeactionsImage from 'assets/images/top-up.png';
import DragDropWallets from '../Edit/DragDropWallets';
import EditContactContents from '../Edit/EditContactContents';
import PreviewProfileImg from './PreviewProfileImg';

const ContactDetailsModal = ({
  open,
  setOpen,
  localContact,
  setDestinationContact,
  onEditChange,
  editForm,
  setEditForm,
  handleEditInfo,
  editErrors,
  addNewUserData: { loading, data },
  setSendCashOpen,
  setTopUpOpen,
  setSendMoneyOpen,
  setEditErrors,
  setIsSharingNewWallet,
  isSharingNewWallet,
  userData,
  handleFavouriteStatusChange,
  addRemoveFavorite,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { width } = useWindowSize();
  const [newWallets, setNewWallets] = useState([]);
  const [openPreviewImgModal, setOpenPreviewImgModal] = useState(
    false,
  );

  const [contact, setContact] = useState({});

  const params = useParams();

  const currentPath = history?.location?.pathname || null;
  const currentPathSearchParams = history?.location?.search || null;

  const { allContacts } = useSelector(({ contacts }) => contacts);

  const parsedQueries = queryString.parse(history.location?.search);

  const pathContact = params.id;

  const handleDismissModal = () => {
    setOpen(false);
    history.replace({});
  };

  useEffect(() => {
    if (parsedQueries.type === 'INTERNAL') {
      const globalContact = allContacts.data?.find(
        item => item.ContactPID === pathContact,
      );
      if (globalContact) {
        setContact(globalContact);
      }
    }

    if (parsedQueries.type === 'EXTERNAL') {
      const globalContact = allContacts.data?.find(
        item =>
          item.PhoneNumber === pathContact &&
          item.ContactType === 'EXTERNAL',
      );
      if (globalContact) {
        setContact(globalContact);
      }
    }

    if (!parsedQueries.type) {
      const globalContact = allContacts.data?.find(
        item => item.ContactPID === pathContact,
      );
      if (globalContact) {
        setContact(globalContact);
      }
    }
  }, [allContacts.data, pathContact]);

  useEffect(() => {
    if (localContact) {
      setContact(localContact);
    }
  }, [localContact]);

  const [hasError, setHasError] = useState(false);
  const { ContactType: contactType = 'INTERNAL' } =
    (contact && contact) || {};

  const [country, setCountry] = useState({
    value: '',
    key: '',
    text: '',
    flag: '',
  });

  const [isEdit, setisEdit] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (newWallets && newWallets.shared) {
      const newWalletss = newWallets.shared.items.map(
        item => item.title,
      );
      setEditForm({ ...editForm, wallets: newWalletss });
    }
  }, [newWallets]);

  const handleUpdateWallets = () => {
    return handleEditInfo('default', contact);
  };

  const {
    history: { data: historyData, error, loading: historyLoading },
  } = useSelector(({ transactions }) => transactions);

  const { data: newTransaction } = useSelector(
    state => state.moneyTransfer.moveFundsTo2UWallet,
  );
  const { data: updatePic } = useSelector(
    state => state.contacts.updateExternalContactImage,
  );

  useEffect(() => {
    if (updatePic) {
      toast.success(
        global.translate('Contact picture updated successfully'),
      );
      clearDeleteContact()(dispatch);
    }
  }, [updatePic]);

  useEffect(() => {
    if (contact && contact.FirstName) {
      getAllTransactionHistory({
        WalletNumber: '',
        ContactWalletNumber: '',
        ContactPID:
          contactType === 'EXTERNAL'
            ? contact.PhoneNumber
            : contact.ContactPID,
        DateFrom: moment()
          .subtract(12, 'months')
          .format('YYYY-MM-DD'),
        DateTo: moment().format('YYYY-MM-DD'),
        MaxRecordsReturned: '100000',
      })(dispatch);
    }
  }, [newTransaction]);

  const [chartData, setChartData] = useState([
    {
      name: global.translate('Credit'),
      name2: global.translate('Total Credit'),
      value: 0,
      total: 0,
    },
    {
      name: global.translate('Debit'),
      name2: global.translate('Total Debit'),
      value: 0,
      total: 0,
    },
  ]);

  const getChartData = () => {
    let creditCount = 0;
    let debitCount = 0;
    let debitAmountCount = 0;
    let creditAmountCount = 0;
    for (let i = 0; i < historyData.length; i += 1) {
      const element = historyData[i];
      if (element.OpsType === '-') {
        debitCount += 1;
        debitAmountCount += parseFloat(element.Amount.split(' ')[0]);
      } else if (element.OpsType === '+') {
        creditCount += 1;
        creditAmountCount +=
          (element.Amount &&
            parseFloat(element.Amount.split(' ')[0])) ||
          0;
      }
    }
    setChartData([
      {
        name: global.translate('Credit'),
        value: creditCount,
        total: creditAmountCount,
      },
      {
        name: global.translate('Debit'),
        value: debitCount,
        total: debitAmountCount,
      },
    ]);
  };

  useEffect(() => {
    if (historyData) {
      getChartData();
    }
  }, [historyData]);

  useEffect(() => {
    if (contact && contact.CountryCode) {
      setCountry(
        countries.find(c => {
          const prefixed =
            contact.PhonePrefix && contact.PhonePrefix.startsWith('+')
              ? contact.PhonePrefix
              : `+${contact.PhonePrefix}`;
          return c.value === prefixed;
        }),
      );
    }
  }, [contact]);

  useEffect(() => {
    if (contact) {
      setEditForm({
        ...editForm,
        phoneNumber: contact?.PhoneNumber?.substr(3),
      });
    }
  }, [contact]);

  useEffect(() => {
    if (editForm.phoneNumber) {
      setEditForm({ ...editForm, firstName: contact.FirstName });
    }
  }, [editForm.phoneNumber]);

  useEffect(() => {
    if (editForm.firstName) {
      setEditForm({ ...editForm, lastName: contact.LastName });
    }
  }, [editForm.firstName]);

  useEffect(() => {
    if (data && isEdit && !isSharingNewWallet) {
      toast.success(global.translate(data?.[0]?.Description));
      setisEdit(false);
    }
  }, [data]);

  const { walletList } = useSelector(
    ({ user: { myWallets } }) => myWallets,
  );
  const checkSize = () => {
    if (width < 700 && contact.MySharedWallets.length < 3) {
      return false;
    }
    if (width > 700 && contact.MySharedWallets.length < 3) {
      return false;
    }
    return true;
  };
  const shouldShowArrows = () => {
    if (!contact) {
      return false;
    }

    return contact.MySharedWallets.length > 5 || checkSize();
  };
  const contactCountry =
    contact &&
    contact.CountryCode &&
    allCountries.find(
      c =>
        c.key &&
        c.key.toLowerCase() === contact.CountryCode &&
        contact.CountryCode.toLowerCase(),
    );

  useEffect(() => {
    if (!contact.PictureURL) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [open, contact]);

  useEffect(() => {
    if (
      contact &&
      contactType === 'INTERNAL' &&
      contact.MySharedWallets &&
      contact.MySharedWallets.length > 0
    ) {
      setSelected(contact.MySharedWallets);
    }
  }, [contact]);

  useEffect(() => {
    if (currentPath?.endsWith('/share-wallets')) {
      setIsSharingNewWallet(true);
    } else {
      setIsSharingNewWallet(false);
    }
  }, [currentPath, currentPathSearchParams]);

  const shareWallets = () => {
    const getShareWalletTitle = () => {
      if (contact && contact.FirstName) {
        return `${global.translate(`Share `)} ${global.translate(
          'Wallets',
        )} ${global.translate('with')} ${contact.FirstName}`;
      }
      return global.translate('Please wait a moment.');
    };

    return (
      <>
        <TransitionablePortal
          transition={{
            duration: 400,
            animation: 'fade',
          }}
          onClose={() => {
            setHasError(false);
            setDestinationContact(null);
            history.push(
              `/contact/${
                contact.ContactPID
                  ? contact.ContactPID
                  : contact.PhoneNumber
              }?redirect_back=1`,
            );
          }}
          open={open}
        >
          <Modal open={isSharingNewWallet}>
            <Modal.Header className="modal-title">
              {getShareWalletTitle()}
              <Icon
                name="close"
                size="small"
                style={{
                  float: 'right',
                  paddingTop: '10px',
                  cursor: 'pointer',
                }}
                floated="right"
                onClick={() => {
                  history.push(
                    `/contact/${
                      contact.ContactPID
                        ? contact.ContactPID
                        : contact.PhoneNumber
                    }?redirect_back=1`,
                  );
                }}
              />
            </Modal.Header>
            <Modal.Content>
              {contact.FirstName && userData.data?.FirstName && (
                <DragDropWallets
                  selected={selected}
                  user2={contact}
                  user1={userData}
                  itemsUpdated={items => {
                    setNewWallets(items);
                  }}
                  allWallets={walletList}
                />
              )}

              {(!contact.FirstName || !userData.data?.FirstName) && (
                <LoaderComponent
                  size="large"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '300px',
                    alignItems: 'center',
                  }}
                />
              )}
            </Modal.Content>

            <Modal.Actions>
              <Button
                basic
                color="gray"
                disabled={loading}
                onClick={() => {
                  clearDeleteContact();
                  history.push(
                    `/contact/${
                      contact.ContactPID
                        ? contact.ContactPID
                        : contact.PhoneNumber
                    }?redirect_back=1`,
                  );
                }}
              >
                {global.translate('Cancel')}
              </Button>
              <Button
                loading={loading}
                disabled={loading}
                onClick={e => handleUpdateWallets(e)}
                positive
              >
                {loading
                  ? global.translate('Please wait a moment.')
                  : global.translate('Save')}
              </Button>
            </Modal.Actions>
          </Modal>
        </TransitionablePortal>
      </>
    );
  };
  const getText = () => {
    if (addRemoveFavorite.loading) {
      return 'updating...';
    }
    if (contact && contact.Favorite === 'YES') {
      return global.translate('Favorite');
    }
    return global.translate('Favorite');
  };
  const getContactDetailModalTitle = () => {
    if (contact.FirstName) {
      return `${global.translate(`Contact`)} ${global.translate(
        'details',
      )}`;
    }
    return global.translate('Please wait a moment.');
  };
  return (
    <>
      {isSharingNewWallet && shareWallets()}
      {isEdit && !isSharingNewWallet && (
        <EditContactContents
          contact={contact}
          onEditChange={onEditChange}
          editErrors={editErrors}
          setEditErrors={setEditErrors}
          open={open}
          setOpen={setOpen}
          editForm={editForm}
          loading={loading}
          handleEditInfo={handleEditInfo}
          country={country}
          setCountry={setCountry}
          dispatch={dispatch}
          setisEdit={setisEdit}
          isEdit={isEdit}
        />
      )}
      {!isEdit && !isSharingNewWallet && (
        <TransitionablePortal
          transition="fade"
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          <Modal
            open={open}
            onClose={() => {
              setHasError(false);
            }}
          >
            <Modal.Header className="modal-title">
              {getContactDetailModalTitle()}
              {contactType === 'EXTERNAL' && (
                <Icon
                  name="pencil"
                  size="small"
                  style={{
                    float: 'right',
                    paddingTop: '10px',
                    cursor: 'pointer',
                  }}
                  floated="right"
                  onClick={() => {
                    setisEdit(true);
                  }}
                />
              )}
            </Modal.Header>
            <div className="wrap_contact">
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column mobile={16} tablet={6} computer={6}>
                    <div className="contact-inner">
                      <div
                        onClick={() => {
                          if (!hasError) {
                            setOpenPreviewImgModal(true);
                          }
                        }}
                        className="image-preview"
                      >
                        {!hasError && (
                          <span
                            className="zoom-image"
                            onClick={() =>
                              setOpenPreviewImgModal(true)
                            }
                            role="button"
                            onKeyDown={() => {}}
                          />
                        )}
                        <Thumbnail
                          avatar={
                            (contact && contact.PictureURL) || ''
                          }
                          name={(contact && contact.FirstName) || ''}
                          width={120}
                          height={120}
                          style={{
                            width: 120,
                            height: 120,
                            fontSize: 27,
                            margin: '0 auto 5px auto',
                          }}
                          secondName={
                            (contact && contact.LastName) || ''
                          }
                          hasError={hasError}
                          setHasError={setHasError}
                        />
                      </div>
                      {contact && (
                        <div className="bio-info">
                          {contact.FirstName && contact.LastName && (
                            <h4 className="names">
                              {contact.FirstName} {contact.LastName}
                            </h4>
                          )}
                          {contact.EMail && (
                            <div className="email">
                              <Icon name="envelope" />
                              {contact.EMail}
                            </div>
                          )}
                          <div className="email">
                            {contactCountry && contactCountry.value}
                          </div>
                          {contactType === 'EXTERNAL' &&
                            contact.Phone && (
                              <p className="phone-contact">
                                <Icon name="phone" />
                                <span>
                                  {contact.PhoneNumber.replace(
                                    /\D/g,
                                    '',
                                  ).replace(
                                    /(\d{3})(\d{3})(\d{3})/,
                                    '+$1 $2 $3 ',
                                  )}
                                </span>
                              </p>
                            )}
                          {contactType !== 'EXTERNAL' &&
                            contact.PhoneNumber && (
                              <p className="phone-contact">
                                <Icon name="phone" />
                                {contact.PhoneNumber}
                              </p>
                            )}
                          {contact.address && (
                            <div className="address">
                              <small>
                                {(contact.address !== '' &&
                                  contact.address) ||
                                  ''}
                              </small>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={10} computer={10}>
                    {contactType === 'EXTERNAL' && (
                      <div className="options">
                        <ActionOption
                          image={SendCashImage}
                          onClick={() => {
                            setSendCashOpen(true);
                            setDestinationContact(contact);
                            setIsendingCash(dispatch);
                          }}
                          text={global.translate('Send cash')}
                        />
                        <ActionOption
                          image={ContactVoucherIcon}
                          onClick={() => {
                            setDestinationContact(contact);
                            history.push({
                              pathname: '/vouchers',
                              search: '?ref=send-voucher',
                              state: {
                                contact,
                              },
                            });
                          }}
                          text={global.translate('Send voucher')}
                        />
                        <ActionOption
                          image={TransactionsImage}
                          text={global.translate('Transactions')}
                          onClick={() => {
                            setOpen(false);
                            history.push({
                              pathname: '/transactions',
                              search: '?ref=contact',
                              state: {
                                contact,
                                chartData,
                              },
                            });
                          }}
                        />
                        <ActionOption
                          image={AirtimeactionsImage}
                          text={global.translate('Buy Airtime')}
                          onClick={() => {
                            // setIsTopingUp(dispatch);
                            setDestinationContact(contact);
                            setTopUpOpen(true);
                            history.push({
                              pathname: '/contacts',
                              search: '?ref=to-up',
                              state: {
                                contact,
                                chartData,
                              },
                            });
                          }}
                        />
                        <ActionOption
                          image={toOthersactionsImage}
                          text={global.translate(
                            'Other network',
                            2247,
                          )}
                          onClick={() => {
                            setDestinationContact(contact);
                            setTopUpOpen(true);

                            history.push({
                              pathname: '/contacts',
                              search: '?ref=to-others',
                              state: {
                                contact,
                                chartData,
                                isFromContactInfo: true,
                              },
                            });
                          }}
                        />
                        <ActionOption
                          iconProps={{
                            style: { margin: 'auto' },
                            name:
                              contact &&
                              contact.Favorite &&
                              contact.Favorite !== 'NO'
                                ? 'heart'
                                : 'heart outline',
                            size: 'large',
                            color:
                              contact &&
                              contact.Favorite &&
                              contact.Favorite !== 'NO'
                                ? 'red'
                                : 'white',
                          }}
                          onClick={() => {
                            handleFavouriteStatusChange(contact);
                          }}
                          text={getText()}
                        />
                      </div>
                    )}
                    {contactType === 'INTERNAL' && (
                      <div className="options">
                        <ActionOption
                          image={ChatImage}
                          text={global.translate('Chat')}
                          onClick={() => {
                            setGlobalChat({
                              currentChatType: ONE_TO_ONE,
                              currentChatTarget: contact,
                              isChattingWithSingleUser: true,
                            })(dispatch);
                            openChatList()(dispatch);
                          }}
                        />
                        <ActionOption
                          image={ContactVoucherIcon}
                          onClick={() => {
                            setDestinationContact(contact);
                            history.push({
                              pathname: '/vouchers',
                              search: '?ref=send-voucher',
                              state: {
                                contact,
                              },
                            });
                          }}
                          text={global.translate('Send voucher')}
                        />
                        <ActionOption
                          image={sendMoneyIcon}
                          onClick={() => {
                            setDestinationContact(contact);
                            setSendMoneyOpen(true);
                            setIsSendingMoney(dispatch);
                          }}
                          text={global.translate('Transfer Money')}
                        />
                        <ActionOption
                          image={SendCashImage}
                          onClick={() => {
                            setDestinationContact(contact);
                            setSendCashOpen(true);
                          }}
                          text={global.translate('Send cash')}
                        />
                        <ActionOption
                          image={TransactionsImage}
                          onClick={() => {
                            setOpen(false);
                            history.push({
                              pathname: '/transactions',
                              search: '?ref=contact',
                              state: {
                                contact,
                                chartData,
                              },
                            });
                          }}
                          text={global.translate('Transactions')}
                        />
                        <ActionOption
                          image={AirtimeactionsImage}
                          text={global.translate('Buy Airtime')}
                          onClick={() => {
                            // setIsTopingUp(dispatch);
                            setDestinationContact(contact);
                            setTopUpOpen(true);
                            history.push({
                              pathname: '/contacts',
                              search: '?ref=to-up',
                              state: {
                                contact,
                                chartData,
                              },
                            });
                          }}
                        />
                        <ActionOption
                          image={toOthersactionsImage}
                          text={global.translate('Other networks')}
                          onClick={() => {
                            setDestinationContact(contact);
                            setTopUpOpen(true);
                            history.push({
                              pathname: '/contacts',
                              search: '?ref=to-others',
                              state: {
                                contact,
                                chartData,
                                isFromContactInfo: true,
                              },
                            });
                          }}
                        />
                        <ActionOption
                          image={EditWalletImage}
                          onClick={() => {
                            history.push(
                              `/contact/${
                                contact.ContactPID
                              }/share-wallets?type=${contact.ContactType ||
                                ''}`,
                            );
                          }}
                          text={global.translate(
                            'Share Wallet numbers',
                          )}
                        />
                        <ActionOption
                          iconProps={{
                            style: { margin: 'auto' },
                            name:
                              contact && contact.Favorite !== 'NO'
                                ? 'heart'
                                : 'heart outline',
                            size: 'large',
                            color:
                              contact && contact.Favorite !== 'NO'
                                ? 'gray'
                                : 'white',
                          }}
                          onClick={() => {
                            handleFavouriteStatusChange(contact);
                          }}
                          text={getText()}
                        />
                      </div>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <div className="content-contacts">
              <div className="contact-inner-inner">
                <div className="contact-inner">
                  {contact && (
                    <div className="shared-wallets">
                      {contact.MySharedWallets?.filter(
                        item => item.WalletNumber !== '',
                      )?.length > 0 && (
                        <WalletCarousel
                          enableAdd={false}
                          showControls={shouldShowArrows()}
                          showOptions={false}
                          onAddClick={() => {
                            history.push(
                              `/contact/${
                                contact.ContactPID
                              }/share-wallets?type=${contact.ContactType ||
                                ''}`,
                            );
                          }}
                          addTitle={global.translate(
                            'Visible Wallet numbers',
                          )}
                          walletTitle={global.translate(
                            'Visible Wallet numbers',
                          )}
                          myWallets={{
                            loading: false,
                            walletList: contact.MySharedWallets?.filter(
                              item => item.WalletNumber !== '',
                            ).map((item, ...rest) => {
                              return {
                                AccountNumber: item.WalletNumber,
                                AccountName: item.WalletName,
                                Balance: item.Balance,
                                Flag: item.Flag,
                                CurrencyCode: item.Currency,
                                ...rest,
                              };
                            }),
                          }}
                        />
                      )}
                    </div>
                  )}
                  <div className="graph_">
                    {!historyLoading &&
                      !error &&
                      historyData &&
                      historyData.length > 1 && (
                        <SimplePieChart
                          verticalAlign="bottom"
                          data={chartData}
                        />
                      )}
                  </div>
                </div>
              </div>
            </div>
            <Modal.Actions>
              <Button
                basic
                color="red"
                onClick={() => {
                  setDestinationContact(null);
                  clearDeleteContact();
                  setOpen(!open);
                  setHasError(false);
                  handleDismissModal();
                }}
              >
                {global.translate('Close')}
              </Button>
              <Button
                onClick={() => {
                  setDestinationContact(null);
                  clearDeleteContact();
                  setOpen(!open);
                  setHasError(false);
                }}
                positive
              >
                {global.translate('Done')}
              </Button>
            </Modal.Actions>
            {!hasError && (
              <PreviewProfileImg
                pictureURL={contact && contact.PictureURL}
                openPreviewImgModal={openPreviewImgModal}
                setOpenPreviewImgModal={setOpenPreviewImgModal}
              />
            )}
          </Modal>
        </TransitionablePortal>
      )}
    </>
  );
};
ContactDetailsModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  localContact: PropTypes.objectOf(PropTypes.string),
  setDestinationContact: PropTypes.func,
  onEditChange: PropTypes.func,
  editForm: PropTypes.objectOf(PropTypes.any),
  setEditForm: PropTypes.func,
  handleEditInfo: PropTypes.func,
  editErrors: PropTypes.string,
  addNewUserData: PropTypes.objectOf(PropTypes.any),
  setSendCashOpen: PropTypes.func,
  setSendMoneyOpen: PropTypes.func,
  setEditErrors: PropTypes.func,
  setIsSharingNewWallet: PropTypes.func,
  isSharingNewWallet: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any),
  setTopUpOpen: PropTypes.func.isRequired,
  handleFavouriteStatusChange: PropTypes.func.isRequired,
  addRemoveFavorite: PropTypes.objectOf(PropTypes.any).isRequired,
};
ContactDetailsModal.defaultProps = {
  setEditErrors: () => {},
  setIsSharingNewWallet: () => {},
  isSharingNewWallet: false,
  userData: null,
  setOpen: () => {},
  open: false,
  localContact: null,
  setDestinationContact: () => null,
  onEditChange: () => null,
  editForm: null,
  setEditForm: () => null,
  handleEditInfo: () => null,
  editErrors: null,
  addNewUserData: null,
  setSendCashOpen: () => null,
  setSendMoneyOpen: () => null,
};
export default ContactDetailsModal;
