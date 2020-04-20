import React, { useState, useEffect } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Message from 'components/common/Message';
import Thumbnail from 'components/common/Thumbnail';
import './details.scss';
import ActionOption from 'components/common/CircleOption';
import SendCashImage from 'assets/images/sendcash.png';
import EditWalletImage from 'assets/images/editvisiblewallet.png';
import ChatImage from 'assets/images/chat.png';
import TransactionsImage from 'assets/images/view_transactions.png';
import SimplePieChart from 'components/common/charts/pie';
import FlatInput from 'components/common/TextField/FlatInput';
import PhoneNumberInput from 'components/common/TextField/PhoneNumber';
import WalletCarousel from 'components/common/WalletCarousselSelector';
import countries from 'utils/countryCodes';
import allCountries from 'utils/countries';
import getAllTransactionHistory from 'redux/actions/transactions/getHistory';
import uploadFile from 'helpers/uploadImages/uploadFile';
import updateContactPicture from 'redux/actions/contacts/updateContactPicture';
import { clearDeleteContact } from 'redux/actions/contacts/deleteContact';
import DragDropWallets from './DragDropWallets';

const ContactDetailsModal = ({
  open,
  setOpen,
  contact,
  isSendingCash,
  setDestinationContact,
  onEditChange,
  editForm,
  setEditForm,
  handleEditInfo,
  editErrors,
  addNewUserData: { loading, data },
  setSendCashOpen,
  setSendMoneyOpen,
  setEditErrors,
  setIsSharingNewWallet,
  isSharingNewWallet,
  userData,
}) => {
  const [country, setCountry] = useState({
    value: '',
    key: '',
    text: '',
    flag: '',
  });
  const inputRef = React.useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [newContactPicture, setNewContactPicture] = useState(
    contact && contact.PictureURL,
  );
  const [newWallets, setNewWallets] = useState([]);

  useEffect(() => {
    if (newWallets && newWallets.shared) {
      const newWalletss = newWallets.shared.items.map(
        item => item.title,
      );

      setEditForm({ ...editForm, wallets: newWalletss });
    }
  }, [newWallets]);

  const handleUpdateWallets = e => {
    return handleEditInfo('default', contact);
  };

  useEffect(() => {
    if (newContactPicture) {
      setNewContactPicture(newContactPicture);
    }
  }, [newContactPicture]);

  const dispatch = useDispatch();
  const history = useHistory();
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
        ContactPID: isSendingCash
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
      toast.success(
        global.translate('Contact details updated successfully'),
      );
      setisEdit(false);
    }
  }, [data]);

  const { walletList } = useSelector(
    ({ user: { myWallets } }) => myWallets,
  );

  const contactCountry =
    contact &&
    contact.CountryCode &&
    allCountries.find(
      c =>
        c.key &&
        c.key.toLowerCase() === contact.CountryCode &&
        contact.CountryCode.toLowerCase(),
    );

  const showEdit = () => {
    const onImagePicked = async e => {
      e.persist();
      const file = e.target.files;

      if (file) {
        setIsUploading(true);
        const bodyFormData = new FormData();
        bodyFormData.append('file1', file);
        const { data } = await uploadFile({ file1: file[0] });
        if (data && data[0]) {
          setIsUploading(false);
          setNewContactPicture(data[0].url);
          contact.PictureURL = data[0].url;
          updateContactPicture(contact)(dispatch);
        }
      }
    };

    return (
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Modal.Header className="modal-title">
          {global.translate(`Edit Contact`)}
        </Modal.Header>
        <div className="contents-inner">
          <div className="image-contact">
            <div>
              <Thumbnail
                name={contact.FirstName}
                secondName={contact.LastName}
                avatar={newContactPicture}
                style={{ width: 65, height: 65 }}
              />
              {isUploading && (
                <small>{global.translate('Working...')}</small>
              )}
            </div>
            <input
              ref={inputRef}
              name="files"
              onChange={onImagePicked}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div className="cameraHolder">
              <Icon
                disabled={isUploading}
                name="camera"
                className="camera-iconn"
                onClick={() =>
                  inputRef.current && inputRef.current.click()
                }
              />
            </div>
          </div>
          <div className="inner-edit-content">
            <div className="thumb">
              <div className="first-name">
                <FlatInput
                  name="firstName"
                  id="firstName"
                  value={editForm.firstName}
                  placeholder={global.translate('First Name', 8)}
                  onChange={onEditChange}
                />
              </div>
            </div>
            <div className="last-name">
              <FlatInput
                name="lastName"
                placeholder={global.translate('Last Name', 9)}
                value={editForm.lastName}
                onChange={onEditChange}
              />
            </div>
          </div>
          <div className="phone-section">
            <div className="area">
              <PhoneNumberInput
                disabled
                name="phoneNumber"
                value={contact.Phone}
                placeholder={global.translate('Phone number', 13)}
                country={country}
                setCountry={setCountry}
                onChange={onEditChange}
              />
            </div>
          </div>
          {editErrors && <Message error message={editErrors} />}
        </div>
        <Modal.Actions>
          <Button
            disabled={loading}
            negative
            onClick={() => {
              setIsUploading(false);
              setEditErrors(null);
              setisEdit(!isEdit);
              setNewContactPicture('');
            }}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            disabled={loading}
            loading={loading}
            onClick={() => {
              handleEditInfo('external', contact);
            }}
            positive
          >
            {global.translate('Save')}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  useEffect(() => {
    if (
      contact &&
      !isSendingCash &&
      contact.MySharedWallets.length > 0
    ) {
      setSelected(contact.MySharedWallets);
    }
  }, [contact]);
  const shareWallets = () => {
    return (
      <>
        <Modal
          open={isSharingNewWallet}
          onClose={() => setOpen(!open)}
        >
          <Modal.Header className="modal-title">
            {global.translate(`Share `, 896)}
            {global.translate('Wallets', 61)}{' '}
            {global.translate('with')} {contact && contact.FirstName}
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
              negative
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
      </>
    );
  };

  return (
    <>
      {isSharingNewWallet && shareWallets()}
      {isEdit && !isSharingNewWallet && showEdit()}
      {!isEdit && !isSharingNewWallet && (
        <Modal open={open} onClose={() => setOpen(!open)}>
          <Modal.Header className="modal-title">
            {global.translate(`Contact`)}{' '}
            {global.translate('Details', 94)}
            {isSendingCash && (
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
                      <p>{contactCountry && contactCountry.value}</p>
                    </div>

                    {isSendingCash && (
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

                    {!isSendingCash && (
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
                {isSendingCash && (
                  <div className="options">
                    <ActionOption
                      image={SendCashImage}
                      onClick={() => {
                        setSendCashOpen(true);
                        setDestinationContact(contact);
                      }}
                      text={global.translate('Send cash')}
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
                            isSendingCash,
                            chartData,
                          },
                        });
                      }}
                    />
                  </div>
                )}
                {!isSendingCash && (
                  <div className="options">
                    <ActionOption
                      image={ChatImage}
                      text={global.translate('Chat')}
                    />
                    <ActionOption
                      image={SendCashImage}
                      onClick={() => {
                        setDestinationContact(contact);
                        setSendMoneyOpen(true);
                      }}
                      text={global.translate('Send Money')}
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
                            isSendingCash,
                            chartData,
                          },
                        });
                      }}
                      text={global.translate('Transactions', 62)}
                    />
                    <ActionOption
                      image={EditWalletImage}
                      onClick={() => {
                        setIsSharingNewWallet(true);
                      }}
                      text={global.translate('Share Wallets')}
                    />
                  </div>
                )}
                {contact && (
                  <div className="shared-wallets">
                    {contact.MySharedWallets && (
                      <WalletCarousel
                        defaultSelectAll
                        enableAdd={false}
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
              negative
              onClick={() => {
                clearDeleteContact();
                setOpen(!open);
              }}
            >
              {global.translate('Cancel')}
            </Button>
            <Button onClick={() => setOpen(!open)} positive>
              {global.translate('Done')}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};

ContactDetailsModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  contact: PropTypes.objectOf(PropTypes.string),
  isSendingCash: PropTypes.bool,
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
  isSendingCash: false,
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
