import React, { useState, useEffect } from 'react';
import './style.scss';
import { Button, Input, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import SendCashContainer from 'containers/MoneyTransfer/sendCash';
import SendMoneyContainer from 'containers/MoneyTransfer/SendMoney';
import Favorite from 'containers/contacts/Favorite';
import Logo from 'assets/images/logo.png';
import TransactionsImage from 'assets/images/transactionsimage.png';
import ViewHistoryImage from 'assets/images/viewhistory2.png';
import ChatImage from 'assets/images/chat.png';
import DeleteContactImage from 'assets/images/deletecontact2.png';
import ContactInfoImage from 'assets/images/contactInfo2.png';
import Message from 'components/common/Message';
import ItemsPlaceholder from './Favorite/ItemsLoading';
import ContactDetailsModal from './Detail/ContactDetailsModal';
import DeleteContactModal from './Delete/DeleteContactModal';
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
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [allMyContacts, setAllContacts] = useState([]);
  const [contactType, setNewContactType] = useState('INTERNAL');
  const [initialInternalUsers, setIUsers] = useState([]);

  useEffect(() => {
    setAllContacts(allContacts.data);
  }, [allContacts]);

  const [isDeletingContact, setIsDeletingContact] = useState(false);

  const options = [
    {
      image: TransactionsImage,
      name: global.translate('Send Money', 65),
      onClick: item => {
        setDestinationContact(item);
        setSendMoneyOpen(true);
      },
    },

    {
      image: TransactionsImage,
      name: global.translate('Send Cash'),

      onClick: item => {
        setDestinationContact(item);
        setSendCashOpen(true);
      },
    },

    {
      image: ViewHistoryImage,
      name: global.translate('View Transactions'),

      onClick: item => {
        history.push({
          pathname: '/transactions',
          search: '?ref=contact',
          state: {
            contact: item,
            isSendingCash,
          },
        });
      },
    },
    {
      image: ContactInfoImage,
      name: global.translate('Contact Info'),
      onClick: item => {
        setContact(item);
        setIsDetail(true);
      },
    },
    {
      image: DeleteContactImage,
      name: global.translate('Delete Contact'),
      onClick: item => {
        setContact(item);
        setIsDeletingContact(true);
      },
    },
  ];

  const handleKeyUp = e => {
    e.persist();
    const search = e.target.value;
    const data = isSendingMoney
      ? initialInternalUsers
      : allMyContacts;
    if (search.trim().length > 0) {
      const found = data.filter(
        item =>
          (item.FirstName &&
            item.FirstName.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.LastName &&
            item.LastName.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.PhoneNumber &&
            item.PhoneNumber.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.ContactPID &&
            item.ContactPID.toLowerCase().startsWith(
              search.toLowerCase(),
            )),
      );
      if (isSendingMoney) {
        setIUsers(found);
      } else {
        setAllContacts(found);
      }
    } else {
      setIUsers(
        allContacts.data &&
          allContacts.data.filter(
            item => item.ContactType === 'INTERNAL',
          ),
      );
      setAllContacts(allContacts.data);
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

  console.log('allMyContacts', allMyContacts);

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="contents">
          <div className="lighter">
            {isSendingCash &&
              !isSendingMoney &&
              global.translate('Send Cash', 915)}

            {isSendingMoney &&
              !isManagingContacts &&
              global.translate('Send money', 1198)}
            {isManagingContacts &&
              global.translate('My contacts', 1195)}
          </div>
          {!allContacts.loading && (
            <div className="right-contents">
              {(isSendingMoney || isManagingContacts) && (
                <Button
                  className="new-contact-button"
                  color="orange"
                  onClick={() => {
                    setOpen(true);
                    setNewContactType('INTERNAL');
                  }}
                >
                  <Icon as={Image} src={Logo} height={30} inline />
                  Add New 2U Contact
                </Button>
              )}
              {(isSendingCash || isManagingContacts) && (
                <Button
                  className="new-contact-button"
                  color="orange"
                  icon="phone"
                  onClick={() => {
                    setOpen(true);
                    setNewContactType('EXTERNAL');
                  }}
                  content="Add External Contact"
                />
              )}
            </div>
          )}
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
          }
        }}
      />
      <div className="search-area">
        <Input
          placeholder="Search..."
          icon="search"
          iconPosition="left"
          disabled={!allContacts.data}
          onKeyUp={e => handleKeyUp(e)}
        />
      </div>
      <div className="select-contact">Select Contact</div>
      <div className="contact-list">
        {Array.isArray(allMyContacts) &&
          !isSendingMoney &&
          allMyContacts.length === 0 && (
            <Message
              message={global.translate('No contact found')}
              error={false}
              style={{ margin: '0px 25px' }}
            />
          )}
        {isSendingMoney &&
          initialInternalUsers &&
          initialInternalUsers.length === 0 && (
            <Message
              message={global.translate('No contact found')}
              error={false}
              style={{ margin: '0px 25px' }}
            />
          )}
        {allContacts.loading && !Array.isArray(allMyContacts) && (
          <>
            <ItemsPlaceholder fluid />
            <ItemsPlaceholder fluid />
            <ItemsPlaceholder fluid />
            <ItemsPlaceholder fluid />
          </>
        )}
        {error && !Array.isArray(allMyContacts) && (
          <Message
            message={
              error.error
                ? global.translate(error.error, 162)
                : global.translate(error[0].Description, 195)
            }
            action={{
              onClick: () => {
                getContacts();
              },
            }}
          />
        )}
        {!isSendingMoney &&
          allMyContacts &&
          allMyContacts
            .sort((a, b) => a.FirstName.localeCompare(b.FirstName))
            .map(item => (
              <ListItem
                item={item}
                moreOptions={
                  item.ContactType === 'INTERNAL'
                    ? [
                        {
                          image: ChatImage,
                          name: global.translate('Chat'),
                          onClick: () => {},
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
                }}
              />
            ))}
        {isSendingMoney &&
          initialInternalUsers &&
          initialInternalUsers
            .sort((a, b) => a.FirstName.localeCompare(b.FirstName))
            .map(item => (
              <ListItem
                item={item}
                moreOptions={
                  item.ContactType === 'INTERNAL'
                    ? [
                        {
                          image: ChatImage,
                          name: global.translate('Chat'),
                          onClick: () => {},
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
        contact={contact}
        onEditChange={onEditChange}
        handleFavouriteStatusChange={handleFavouriteStatusChange}
        editForm={editForm}
        handleEditInfo={handleEditInfo}
        isSendingCash={isSendingCash}
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
      )
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
  sendCashOpen: PropTypes.bool,
  setSendCashOpen: PropTypes.func,
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
  handleFavouriteStatusChange: PropTypes.func,
  addRemoveFavorite: PropTypes.func,
  allContacts: PropTypes.objectOf(PropTypes.any),
  country: PropTypes.objectOf(PropTypes.any),
  setCountry: PropTypes.func,
  handleCreateExternalContact: PropTypes.func,
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
  sendCashOpen: false,
  setSendCashOpen: () => {},
  setDestinationContact: () => {},
  setForm: () => {},
  setLocalError: () => {},
  isSendingMoney: false,
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
};
export default ManageContacts;
