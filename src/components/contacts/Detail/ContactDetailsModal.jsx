/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Icon,
  TransitionablePortal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Thumbnail from 'components/common/Thumbnail';
import './details.scss';
import ActionOption from 'components/common/CircleOption';
import SendCashImage from 'assets/images/sendcash.png';
import sendVoucherIcon from 'assets/images/voucher.png';
import EditWalletImage from 'assets/images/editvisiblewallet.png';
import ChatImage from 'assets/images/chat.png';
import TransactionsImage from 'assets/images/view_transactions.png';
import AirtimeactionsImage from 'assets/images/top-up.png';
import toOthersactionsImage from 'assets/images/to_other_provider.png';
import SimplePieChart from 'components/common/charts/pie';
import WalletCarousel from 'components/common/WalletCarousselSelector';
import countries from 'utils/countryCodes';
import allCountries from 'utils/countries';
import getAllTransactionHistory from 'redux/actions/transactions/getHistory';
import { clearDeleteContact } from 'redux/actions/contacts/deleteContact';
import useWindowSize from 'utils/useWindowSize';

import {
  setIsTopingUp,
  setIsSendingOhters,
} from 'redux/actions/dashboard/dashboard';
import DragDropWallets from '../Edit/DragDropWallets';
import EditContactContents from '../Edit/EditContactContents';
import {
  setGlobalChat,
  openChatList,
} from 'redux/actions/chat/globalchat';
import { ONE_TO_ONE } from 'constants/general';
import toggleSideBar, {
  setIsSendingMoney,
  setIsendingCash,
  setManageContacts,
  setIsSendingVoucher,
} from 'redux/actions/dashboard/dashboard';

const ContactDetailsModal = ({
  open,
  setOpen,
  contact,
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
  const [newWallets, setNewWallets] = useState([]);
  const { ContactType: contactType = 'INTERNAL' } =
    (contact && contact) || {};

  const [country, setCountry] = useState({
    value: '',
    key: '',
    text: '',
    flag: '',
  });

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
  const dispatch = useDispatch();
  const history = useHistory();
  const { width } = useWindowSize();
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
      setEditForm({ ...editForm, phoneNumber: contact.PhoneNumber });
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
  const [isEdit, setisEdit] = useState(false);
  const [selected, setSelected] = useState([]);
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
    if (
      contact &&
      contactType === 'INTERNAL' &&
      contact.MySharedWallets &&
      contact.MySharedWallets.length > 0
    ) {
      setSelected(contact.MySharedWallets);
    }
  }, [contact]);
  const shareWallets = () => {
    return (
      <>
        <TransitionablePortal
          transition={{
            duration: 400,
            animation: 'fade',
          }}
          onClose={() => setOpen(false)}
          open={open}
        >
          <Modal
            open={isSharingNewWallet}
            onClose={() => setOpen(false)}
          >
            <Modal.Header className="modal-title">
              {global.translate(`Share `, 896)}
              {global.translate('Wallets', 61)}{' '}
              {global.translate('with')}{' '}
              {contact && contact.FirstName}
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
                  setIsSharingNewWallet(false);
                }}
              />
            </Modal.Header>
            <Modal.Content>
              <DragDropWallets
                selected={selected}
                user2={contact}
                user1={userData}
                itemsUpdated={items => {
                  setNewWallets(items);
                }}
                allWallets={walletList}
              />
            </Modal.Content>

            <Modal.Actions>
              <Button
                basic
                color="red"
                disabled={loading}
                onClick={() => {
                  clearDeleteContact();
                  setIsSharingNewWallet(!isSharingNewWallet);
                }}
              >
                {global.translate('Cancel', 86)}
              </Button>
              <Button
                loading={loading}
                disabled={loading}
                onClick={e => handleUpdateWallets(e)}
                positive
              >
                {loading
                  ? global.translate('Please wait a moment.', 413)
                  : global.translate('Save', 614)}
              </Button>
            </Modal.Actions>
          </Modal>
        </TransitionablePortal>
      </>
    );
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
          onClose={() => setOpen(false)}
          open={open}
        >
          <Modal open={open} onClose={() => setOpen(false)}>
            <Modal.Header className="modal-title">
              {global.translate(`Contact`)}{' '}
              {global.translate('Details', 94)}
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

            <div className="content-contacts">
              <div className="contact-inner-inner">
                <div className="contact-inner">
                  <Thumbnail
                    avatar={contact && contact.PictureURL}
                    name={contact && contact.FirstName}
                    style={{
                      width: 75,
                      height: 75,
                      fontSize: 27,
                      margin: ' 5px auto',
                    }}
                    secondName={contact && contact.LastName}
                  />{' '}
                  {contact && (
                    <div className="bio-info">
                      <div className="names">
                        {contact && contact.FirstName !== ''
                          ? contact.FirstName
                          : 'Firstname'}{' '}
                        {contact && contact.LastName !== ''
                          ? contact.LastName
                          : 'Lastname'}{' '}
                      </div>

                      <div className="email">
                        <small>
                          {contact.EMail !== '' ? contact.EMail : ''}{' '}
                        </small>
                      </div>
                      <div className="email">
                        <p>
                          {contactCountry && contactCountry.value}
                        </p>
                      </div>

                      {contactType === 'EXTERNAL' && (
                        <p className="phone-contact">
                          {(contact.PhonePrefix !== '' &&
                            `${contact.PhonePrefix}`) ||
                            ''}
                          <span>
                            {' '}
                            {(contact.Phone !== '' &&
                              `${contact.Phone}`) ||
                              ''}
                          </span>
                        </p>
                      )}

                      {contactType !== 'EXTERNAL' && (
                        <p className="phone-contact">
                          {(contact.PhoneNumber !== '' &&
                            `${contact.PhoneNumber}`) ||
                            ''}
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
                        image={sendVoucherIcon}
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
                        text={global.translate('Transactions', 62)}
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
                        text={global.translate('Buy Airtime', 1552)}
                        onClick={() => {
                          setIsTopingUp(dispatch);
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
                        text={global.translate('Mobile money')}
                        onClick={() => {
                          setIsSendingOhters(dispatch);
                          setDestinationContact(contact);
                          setTopUpOpen(true);
                          history.push({
                            pathname: '/contacts',
                            search: '?ref=to-others',
                            state: {
                              contact,
                              chartData,
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
                        text={
                          addRemoveFavorite.loading
                            ? 'updating...'
                            : contact && contact.Favorite === 'YES'
                            ? global.translate('Favorite')
                            : global.translate('Favorite')
                        }
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
                        image={SendCashImage}
                        onClick={() => {
                          setDestinationContact(contact);
                          setSendMoneyOpen(true);
                          setIsSendingMoney(dispatch);
                        }}
                        text={global.translate('Send Money')}
                      />
                      <ActionOption
                        image={SendCashImage}
                        onClick={() => {
                          setDestinationContact(contact);
                          setSendCashOpen(true);
                        }}
                        text={global.translate('Send Cash')}
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
                        text={global.translate('Transactions', 62)}
                      />
                      <ActionOption
                        image={AirtimeactionsImage}
                        text={global.translate('Buy Airtime')}
                        onClick={() => {
                          setIsTopingUp(dispatch);
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
                        text={global.translate('2U to others')}
                        onClick={() => {
                          setIsSendingOhters(dispatch);
                          setDestinationContact(contact);
                          setTopUpOpen(true);
                          history.push({
                            pathname: '/contacts',
                            search: '?ref=to-others',
                            state: {
                              contact,
                              chartData,
                            },
                          });
                        }}
                      />
                      <ActionOption
                        image={EditWalletImage}
                        onClick={() => {
                          setIsSharingNewWallet(true);
                        }}
                        text={global.translate('Share Wallets')}
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
                              ? 'red'
                              : 'white',
                        }}
                        onClick={() => {
                          handleFavouriteStatusChange(contact);
                        }}
                        text={
                          addRemoveFavorite.loading
                            ? 'updating...'
                            : contact && contact.Favorite === 'YES'
                            ? global.translate('Favorite')
                            : global.translate('Favorite')
                        }
                      />
                    </div>
                  )}
                  {contact && (
                    <div className="shared-wallets">
                      {contact.MySharedWallets && (
                        <WalletCarousel
                          defaultSelectAll
                          enableAdd={false}
                          showControls={shouldShowArrows()}
                          showOptions={false}
                          onAddClick={() =>
                            setIsSharingNewWallet(!isSharingNewWallet)
                          }
                          addTitle={global.translate('Share wallets')}
                          walletTitle={global.translate(
                            'Shared Wallets',
                          )}
                          myWallets={{
                            loading: false,
                            walletList: contact.MySharedWallets.map(
                              (item, ...rest) => ({
                                AccountNumber: item.WalletNumber,
                                AccountName: item.WalletName,
                                Balance: item.Balance,
                                Flag: item.Flag,
                                CurrencyCode: item.Currency,
                                ...rest,
                              }),
                            ),
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
                  clearDeleteContact();
                  setOpen(!open);
                }}
              >
                {global.translate('Close')}
              </Button>
              <Button onClick={() => setOpen(!open)} positive>
                {global.translate('Done')}
              </Button>
            </Modal.Actions>
          </Modal>
        </TransitionablePortal>
      )}
    </>
  );
};

ContactDetailsModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  contact: PropTypes.objectOf(PropTypes.string),
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
};

ContactDetailsModal.defaultProps = {
  setEditErrors: () => {},
  setIsSharingNewWallet: () => {},
  isSharingNewWallet: false,
  userData: null,
  setOpen: () => {},
  open: false,
  contact: {},
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
