import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';
import PropTypes from 'prop-types';
import { Input, Image } from 'semantic-ui-react';
import ChatImage from 'assets/images/chat.png';
import ContactInfoImage from 'assets/images/contactInfo2.png';
import DeleteContactImage from 'assets/images/deletecontact2.png';
import EmptyContactList from 'assets/images/empty_contact.svg';
import SendOthersImage from 'assets/images/to_other_provider.png';
import TopuUpImage from 'assets/images/top-up.png';
import TransactionsImage from 'assets/images/transactionsimage.png';
import ViewHistoryImage from 'assets/images/viewhistory2.png';
import SendVoucherIcon from 'assets/images/voucher.png';
import DashboardLayout from 'components/common/DashboardLayout';
import EmptyCard from 'components/common/EmptyCard';
import GoBack from 'components/common/GoBack';
import Message from 'components/common/Message';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import { ONE_TO_ONE } from 'constants/general';
import Favorite from 'containers/contacts/Favorite';
import SendCashContainer from 'containers/MoneyTransfer/sendCash';
import SendMoneyContainer from 'containers/MoneyTransfer/SendMoney';
import TopUpContainer from 'containers/MoneyTransfer/TopUp';
import LoadContact from 'assets/images/contacts/loadContact.svg';

import {
  openChatList,
  setGlobalChat,
} from 'redux/actions/chat/globalchat';
import {
  setIsSendingOhters,
  setIsTopingUp,
} from 'redux/actions/dashboard/dashboard';
import { setSelectedStore } from 'redux/actions/vouchers/selectedStore';

import DeleteContactModal from './Delete/DeleteContactModal';
import ContactDetailsModal from './Detail/ContactDetailsModal';
import ListItem from './List/ListItem';
import AddNewContactModal from './New/AddNewContactModal';

const ManageContacts = ({
  walletList,
  history,
  onChange,
  addToContact,
  open,
  userData,
  form,
  setOpen,
  onSearchUser,
  searchData,
  getContacts,
  addNewUserData,
  error,
  destinationContact,
  clearSuccess,
  localError,
  isSendingCash,
  sendCashOpen,
  setSendCashOpen,
  isTopingUp,
  topUpOpen,
  setTopUpOpen,
  setDestinationContact,
  DefaultWallet,
  setForm,
  setLocalError,
  isSendingMoney,
  setSendMoneyOpen,
  sendMoneyOpen,
  removeUserContact,
  deleteContactData,
  clearDeleteContact,
  onEditChange,
  editForm,
  handleEditInfo,
  editErrors,
  setEditForm,
  contact,
  setContact,
  setEditErrors,
  setIsDetail,
  isDetail,
  setIsSharingNewWallet,
  isSharingNewWallet,
  isManagingContacts,
  handleFavouriteStatusChange,
  addRemoveFavorite,
  allContacts,
  country,
  setCountry,
  handleCreateExternalContact,
  isSendingOthers,
  isSendingVoucher,
  targetStore,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [allMyContacts, setAllContacts] = useState([]);
  const [contactType, setNewContactType] = useState('INTERNAL');
  const [initialInternalUsers, setIUsers] = useState([]);
  const [isSelfBuying, setIsSelfBuying] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setAllContacts(allContacts.data?.filter(item => !item.Error));
  }, [allContacts]);

  const [isDeletingContact, setIsDeletingContact] = useState(false);
  const onClickHandler = () => history.goBack();

  const options = [
    {
      image: TransactionsImage,
      name: global.translate('Transfer Money', 1950),
      onClick: item => {
        setDestinationContact(item);
        setSendMoneyOpen(true);
      },
    },

    {
      image: TransactionsImage,
      name: global.translate('Send cash', 1948),
      onClick: item => {
        setDestinationContact(item);
        setSendCashOpen(true);
      },
    },
    {
      image: SendVoucherIcon,
      name: global.translate('Send a Voucher', 763),
      onClick: item => {
        setDestinationContact(item);
        history.push({
          pathname: '/vouchers',
          search: '?ref=send-voucher',
          state: {
            contact: item,
            targetStore,
          },
        });
      },
    },

    {
      image: TopuUpImage,
      name: global.translate('Buy Airtime', 1552),

      onClick: item => {
        setIsTopingUp(dispatch);
        setDestinationContact(item);
        setTopUpOpen(true);
      },
    },
    {
      image: SendOthersImage,
      name: global.translate('Other networks', 2157),

      onClick: item => {
        setIsSendingOhters(dispatch);
        setDestinationContact(item);
        setTopUpOpen(true);
      },
    },

    {
      image: ViewHistoryImage,
      name: global.translate('View transactions', 143),

      onClick: item => {
        history.push({
          pathname: '/transactions',
          search: '?ref=contact',
          state: {
            contact: item,
          },
        });
      },
    },
    {
      image: ContactInfoImage,
      name: global.translate('Contact Info', 1220),
      onClick: item => {
        setContact(item);
        history.push(
          `/contact/${
            item.ContactType === 'INTERNAL'
              ? item.ContactPID
              : item.PhoneNumber
          }?type=${item.ContactType}`,
        );
        setIsDetail(true);
      },
    },
    {
      image: DeleteContactImage,
      name: global.translate('Delete Contact', 1703),
      onClick: item => {
        setContact(item);
        setIsDeletingContact(true);
      },
    },
  ];
  const initializeContacts = () => {
    setIUsers(
      allContacts.data &&
        allContacts.data.filter(
          item => item.ContactType === 'INTERNAL',
        ),
    );
    setAllContacts(allContacts.data?.filter(item => !item.Error));
    setIsSearching(false);
  };

  const handleKeyUp = (e, { value }) => {
    if (localError) {
      setLocalError(null);
    }
    const search = value?.toLowerCase().replace(/"+"/g, '');
    const data = isSendingMoney
      ? initialInternalUsers
      : allMyContacts;
    if (search.trim().length > 0) {
      try {
        setIsSearching(true);
        const found = data.filter(
          item =>
            (item.FirstName &&
              item.FirstName.toLowerCase().search(search) !== -1) ||
            (item.LastName &&
              item.LastName.toLowerCase().search(search) !== -1) ||
            (item.PhoneNumber &&
              item.PhoneNumber.toLowerCase().search(search) !== -1) ||
            (item.ContactPID &&
              item.ContactPID.toLowerCase().search(search) !== -1),
        );
        if (isSendingMoney) {
          setIUsers(found);
        } else {
          setAllContacts(found);
        }
      } catch (error) {
        initializeContacts();
      }
    } else {
      initializeContacts();
    }
  };
  const deleteContact = contact => {
    removeUserContact(contact);
  };

  useEffect(() => {
    if (deleteContactData.data && isSearching) {
      setIsSearching(false);
    }
  }, [deleteContactData.data]);

  useEffect(() => {
    if (isSendingMoney) {
      setIUsers(
        allContacts.data &&
          allContacts.data.filter(
            item => item.ContactType === 'INTERNAL',
          ),
      );
    }
  }, [allContacts, isSendingMoney]);

  useEffect(() => {
    if (history.location.pathname.startsWith('/contact/')) {
      setIsDetail(true);
    }
  }, []);

  return (
    <DashboardLayout>
      <WelcomeBar style={{ minHeight: 90 }}>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {isSendingCash &&
              !isSendingMoney &&
              global.translate(
                'Select the contact to send cash to',
                915,
              )}

            {isSendingVoucher &&
              global.translate('Select the voucher recipient', 2161)}

            {isSendingMoney &&
              !isManagingContacts &&
              global.translate(
                'Select a contact to transfer money to',
                1198,
              )}
            {isManagingContacts &&
              !isTopingUp &&
              global.translate('My contacts', 1195)}
            {isTopingUp &&
              !isSendingOthers &&
              global.translate(
                'Buy for your self or for your contact',
                1552,
              )}
            {isSendingOthers &&
              global.translate(
                'Select a contact to transfer money to',
                581,
              )}
          </h2>
          {!allContacts.loading && (
            <div className="head-buttons">
              {isSendingOthers && (
                <button
                  type="button"
                  onClick={() => {
                    setTopUpOpen(true);
                    setNewContactType('EXTERNAL');
                    setIsSelfBuying(true);
                    setDestinationContact({
                      ...userData.data,
                      ...{ PhoneNumber: userData.data?.MainPhone },
                      ...{ SourceWallet: DefaultWallet },
                    });
                  }}
                >
                  {global.translate('Send to your numbers', 1713)}
                </button>
              )}
              {isTopingUp && (
                <button
                  type="button"
                  onClick={() => {
                    setTopUpOpen(true);
                    setNewContactType('EXTERNAL');
                    setIsSelfBuying(true);
                    setDestinationContact({
                      ...userData.data,
                      ...{ PhoneNumber: userData.data?.MainPhone },
                      ...{ SourceWallet: DefaultWallet },
                    });
                  }}
                >
                  {global.translate('Buy for yourself', 1553)}
                </button>
              )}
              {(isSendingMoney ||
                isManagingContacts ||
                isSendingCash ||
                isTopingUp ||
                isSendingVoucher ||
                isSendingOthers) && (
                <button
                  type="button"
                  onClick={() => {
                    history.push('/withdraw-money');
                  }}
                >
                  {global.translate('Withdraw money')}
                </button>
              )}
              {(isSendingMoney ||
                isManagingContacts ||
                isSendingCash ||
                isTopingUp ||
                isSendingVoucher ||
                isSendingOthers) && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(true);
                    setNewContactType('INTERNAL');
                  }}
                >
                  {global.translate('Add Contact', 1732)}
                </button>
              )}
              {(isSendingCash ||
                isManagingContacts ||
                isTopingUp ||
                isSendingVoucher ||
                isSendingOthers) && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(true);
                    setNewContactType('EXTERNAL');
                  }}
                >
                  {global.translate('Add External Contact', 1714)}
                </button>
              )}
            </div>
          )}
          <div className="clear" />
        </div>
      </WelcomeBar>
      <Favorite
        moreOptions={options}
        onItemClick={contact => {
          if (isSendingMoney) {
            setDestinationContact(contact);
            setSendMoneyOpen(true);
          }
          if (isSendingCash) {
            setDestinationContact(contact);
            setSendCashOpen(true);
          }
          if (isManagingContacts) {
            setContact(contact);
            setIsDetail(true);

            history.push(
              `/contact/${
                contact.ContactType === 'INTERNAL'
                  ? contact.ContactPID
                  : contact.PhoneNumber
              }?type=${contact.ContactType}`,
            );
          }
          if (isSendingOthers) {
            setDestinationContact(contact);
            setTopUpOpen(true);
          }
          if (isTopingUp) {
            setDestinationContact(contact);
            setTopUpOpen(true);
          }

          if (isSendingVoucher) {
            setDestinationContact(contact);
            setSelectedStore(dispatch, null, false);

            history.push({
              pathname: '/vouchers',
              search: '?ref=send-voucher',
              state: {
                contact,
                targetStore,
              },
            });
          }
        }}
      />
      <div className="search-area">
        {(allMyContacts?.length !== 0 || !allContacts.loading) && (
          <Input
            placeholder={global.translate('Search')}
            icon="search"
            iconPosition="left"
            disabled={!allContacts.data}
            onChange={handleKeyUp}
          />
        )}
      </div>
      <div className="select-contact">
        {global.translate('Select a contact', 485)}
      </div>
      <div className="contact-list">
        {!isSearching && allMyContacts?.length === 0 && (
          <EmptyCard
            header={global.translate(
              "Looks like you don't have any contact yet",
            )}
            body={global.translate(
              'You can add new contacts to your list',
            )}
            imgSrc={EmptyContactList}
            createText={global.translate('Add contact', 574)}
            onAddClick={() => {
              setOpen(true);
              setNewContactType('INTERNAL');
            }}
          />
        )}
        {Array.isArray(allMyContacts) &&
          !allContacts.loading &&
          !isSendingMoney &&
          isSearching &&
          allMyContacts.length === 0 && (
            <Message
              message={global.translate(
                'The search returned no result',
                1253,
              )}
              error={false}
              style={{ margin: '0px 25px' }}
            />
          )}
        {isSendingMoney &&
          !allContacts.loading &&
          initialInternalUsers &&
          isSearching &&
          initialInternalUsers.length === 0 && (
            <Message
              message={global.translate(
                'The search returned no result',
                1253,
              )}
              error={false}
              style={{ margin: '0px 25px' }}
            />
          )}
        {allContacts.loading && !Array.isArray(allMyContacts) && (
          <Image src={LoadContact} className="animate-placeholder" />
        )}
        {error && !Array.isArray(allMyContacts) && (
          <Message
            message={global.translate('Something went wrong')}
            action={{
              onClick: () => {
                getContacts();
              },
            }}
          />
        )}
        {!isSendingMoney &&
          allMyContacts?.filter(item => !item.Error) &&
          allMyContacts
            .sort((a, b) => a?.FirstName?.localeCompare(b?.FirstName))
            .map(item => (
              <ListItem
                item={item}
                moreOptions={
                  item.ContactType === 'INTERNAL'
                    ? [
                        {
                          image: ChatImage,
                          name: global.translate('Chat', 577),
                          onClick: item => {
                            setGlobalChat({
                              currentChatType: ONE_TO_ONE,
                              currentChatTarget: item,
                              isChattingWithSingleUser: true,
                            })(dispatch);
                            openChatList()(dispatch);
                          },
                        },
                        ...options,
                      ]
                    : options.filter((item, i) => i !== 0)
                }
                onItemClick={item => {
                  if (isSendingMoney) {
                    setDestinationContact(item);
                    setSendMoneyOpen(true);
                  }
                  if (isSendingCash) {
                    setDestinationContact(item);
                    setSendCashOpen(true);
                  }
                  if (isManagingContacts) {
                    setIsDetail(true);
                    setContact(item);

                    history.push(
                      `/contact/${
                        item?.ContactType === 'INTERNAL'
                          ? item.ContactPID
                          : item.PhoneNumber
                      }?type=${item.ContactType}`,
                    );
                  }
                  if (isSendingVoucher) {
                    setDestinationContact(item);

                    history.push({
                      pathname: '/vouchers',
                      search: '?ref=send-voucher',
                      state: {
                        contact: item,
                        targetStore,
                      },
                    });
                  }

                  if (isSendingOthers) {
                    setDestinationContact({
                      ...item,
                      ...{
                        SourceWallet: DefaultWallet,
                      },
                    });
                    setTopUpOpen(true);
                  }
                  if (isTopingUp) {
                    setDestinationContact({
                      ...item,
                      ...{
                        SourceWallet: DefaultWallet,
                      },
                    });
                    setTopUpOpen(true);
                  }
                }}
              />
            ))}
        {isSendingMoney &&
          initialInternalUsers &&
          initialInternalUsers
            .filter(item => !item.Error)
            .sort((a, b) => a.FirstName.localeCompare(b.FirstName))
            .map(item => (
              <ListItem
                item={item}
                moreOptions={
                  item.ContactType === 'INTERNAL'
                    ? [
                        {
                          image: ChatImage,
                          name: global.translate('Chat', 577),
                          onClick: item => {
                            setGlobalChat({
                              currentChatType: ONE_TO_ONE,
                              currentChatTarget: item,
                              isChattingWithSingleUser: true,
                            })(dispatch);
                            openChatList()(dispatch);
                          },
                        },
                        ...options,
                      ]
                    : options.filter((item, i) => i !== 0)
                }
                onItemClick={item => {
                  if (isSendingMoney) {
                    setDestinationContact(item);
                    setSendMoneyOpen(true);
                  }
                  if (isSendingCash) {
                    setDestinationContact(item);
                    setSendCashOpen(true);
                  }
                  if (isManagingContacts) {
                    setContact(item);
                    setIsDetail(true);
                  }
                  if (isSendingVoucher) {
                    setDestinationContact(item);

                    history.push({
                      pathname: '/vouchers',
                      search: '?ref=send-voucher',
                      state: {
                        contact: item,
                        targetStore,
                      },
                    });
                  }
                  if (isSendingOthers) {
                    setDestinationContact({
                      ...item,
                      ...{
                        SourceWallet: DefaultWallet,
                      },
                    });
                    setTopUpOpen(true);
                  }
                  if (isTopingUp) {
                    setDestinationContact({
                      ...item,
                      ...{
                        SourceWallet: DefaultWallet,
                      },
                    });
                    setTopUpOpen(true);
                  }
                }}
              />
            ))}{' '}
      </div>
      <DeleteContactModal
        open={isDeletingContact}
        contact={contact}
        setDetailsOpen={setIsDetail}
        detailsOpen={isDetail}
        setOpen={setIsDeletingContact}
        deleteContact={deleteContact}
        deleteContactData={deleteContactData}
        clearDeleteContact={clearDeleteContact}
      />
      <ContactDetailsModal
        open={isDetail}
        localContact={contact}
        onEditChange={onEditChange}
        handleFavouriteStatusChange={handleFavouriteStatusChange}
        editForm={editForm}
        handleEditInfo={handleEditInfo}
        isSendingCash={isSendingCash}
        setTopUpOpen={setTopUpOpen}
        setOpen={setIsDetail}
        editErrors={editErrors}
        setIsDeletingContact={setIsDeletingContact}
        setEditForm={setEditForm}
        addNewUserData={addNewUserData}
        setSendCashOpen={setSendCashOpen}
        setEditErrors={setEditErrors}
        userData={userData}
        setSendMoneyOpen={setSendMoneyOpen}
        setDestinationContact={setDestinationContact}
        setIsSharingNewWallet={setIsSharingNewWallet}
        isSharingNewWallet={isSharingNewWallet}
        addRemoveFavorite={addRemoveFavorite}
      />
      <AddNewContactModal
        open={open}
        setOpen={setOpen}
        walletList={walletList}
        onChange={onChange}
        onSearchUser={onSearchUser}
        form={form}
        onSubmit={
          contactType === 'INTERNAL'
            ? addToContact
            : handleCreateExternalContact
        }
        country={country}
        setCountry={setCountry}
        setForm={setForm}
        clearSuccess={clearSuccess}
        contactType={contactType}
        searchData={searchData}
        addNewUserData={addNewUserData}
        localError={localError}
        setLocalError={setLocalError}
      />
      <SendMoneyContainer
        setSendMoneyOpen={setSendMoneyOpen}
        sendMoneyOpen={sendMoneyOpen}
        destinationContact={destinationContact}
        setDestinationContact={setDestinationContact}
        isSendingMoney={isSendingMoney}
      />
      <SendCashContainer
        open={sendCashOpen}
        setOpen={setSendCashOpen}
        isSendingCash={isSendingCash}
        destinationContact={destinationContact}
        setDestinationContact={setDestinationContact}
        userData={userData}
        DefaultWallet={DefaultWallet}
      />
      <TopUpContainer
        open={topUpOpen}
        setOpen={setTopUpOpen}
        isTopingUp={isTopingUp}
        isSendingOthers={isSendingOthers}
        destinationContact={destinationContact}
        setDestinationContact={setDestinationContact}
        userData={userData}
        DefaultWallet={DefaultWallet}
        isSelfBuying={isSelfBuying}
        setIsSelfBuying={setIsSelfBuying}
        isSendingMoney={isSendingMoney}
      />
    </DashboardLayout>
  );
};
ManageContacts.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
  addToContact: PropTypes.func.isRequired,
  open: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  form: PropTypes.objectOf(PropTypes.any),
  setOpen: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.any),
  searchData: PropTypes.objectOf(PropTypes.any),
  getContacts: PropTypes.func,
  addNewUserData: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  clearSuccess: PropTypes.func,
  onSearchUser: PropTypes.func,
  localError: PropTypes.string,
  isSendingCash: PropTypes.bool,
  isSendingOthers: PropTypes.bool,
  isTopingUp: PropTypes.bool,
  sendCashOpen: PropTypes.bool,
  topUpOpen: PropTypes.bool,
  setSendCashOpen: PropTypes.func,

  setTopUpOpen: PropTypes.func,
  setDestinationContact: PropTypes.func,
  DefaultWallet: PropTypes.string.isRequired,
  setForm: PropTypes.func,
  setLocalError: PropTypes.func,
  isSendingMoney: PropTypes.bool,
  setSendMoneyOpen: PropTypes.func,
  sendMoneyOpen: PropTypes.bool,
  destinationContact: PropTypes.objectOf(PropTypes.any),
  removeUserContact: PropTypes.func,
  deleteContactData: PropTypes.func,
  clearDeleteContact: PropTypes.func,
  onEditChange: PropTypes.func,
  editForm: PropTypes.objectOf(PropTypes.any),
  handleEditInfo: PropTypes.func,
  editErrors: PropTypes.bool,
  setEditForm: PropTypes.func,
  contact: PropTypes.objectOf(PropTypes.any),
  setContact: PropTypes.func,
  setEditErrors: PropTypes.func,
  setIsDetail: PropTypes.func,
  isDetail: PropTypes.bool,
  setIsSharingNewWallet: PropTypes.bool,
  isSharingNewWallet: PropTypes.bool,
  isManagingContacts: PropTypes.bool,
  isSendingVoucher: PropTypes.bool,
  handleFavouriteStatusChange: PropTypes.func,
  addRemoveFavorite: PropTypes.func,
  allContacts: PropTypes.objectOf(PropTypes.any),
  country: PropTypes.objectOf(PropTypes.any),
  setCountry: PropTypes.func,
  handleCreateExternalContact: PropTypes.func,
  targetStore: PropTypes.objectOf(PropTypes.any),
};

ManageContacts.defaultProps = {
  walletList: [],
  history: {},
  open: false,
  destinationContact: null,
  userData: {},
  onSearchUser: () => {},
  loading: false,
  form: {},
  setOpen: () => {},
  data: {},
  searchData: {},
  clearSuccess: {},
  getContacts: () => {},
  isSendingCash: false,
  isSendingOthers: false,
  isTopingUp: false,
  sendCashOpen: false,
  topUpOpen: false,
  setSendCashOpen: () => {},
  setTopUpOpen: () => {},
  setDestinationContact: () => {},
  setForm: () => {},
  setLocalError: () => {},
  isSendingMoney: false,
  isSendingVoucher: false,
  setSendMoneyOpen: () => {},
  sendMoneyOpen: false,
  addNewUserData: {},
  error: {},
  localError: null,
  removeUserContact: () => {},
  deleteContactData: () => {},
  clearDeleteContact: () => {},
  onEditChange: () => {},
  editForm: {},
  handleEditInfo: () => {},
  editErrors: PropTypes.bool,
  setEditForm: () => {},
  contact: {},
  setContact: () => {},
  setEditErrors: () => {},
  setIsDetail: () => {},
  isDetail: false,
  setIsSharingNewWallet: false,
  isSharingNewWallet: false,
  isManagingContacts: false,
  handleFavouriteStatusChange: () => {},
  addRemoveFavorite: () => {},
  allContacts: {},
  country: {},
  setCountry: () => {},
  handleCreateExternalContact: () => {},
  targetStore: {},
};
export default ManageContacts;
