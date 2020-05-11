import React, { useState, useEffect } from 'react';
import './style.scss';
import { Image, Pagination, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddBig from 'assets/images/addBig.png';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import PREVIOUS_ICON from 'assets/images/back.png';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import SendCashContainer from 'containers/MoneyTransfer/sendCash';
import SendMoneyContainer from 'containers/MoneyTransfer/SendMoney';
import AddNewContactModal from './AddNewContactModal';
import RecentlyContactedItems from './RecentlyContactedItems';
import ListItem from './ListItem';
import DeleteContactModal from './DeleteContactModal';
import ContactDetailsModal from './ContactDetailsModal';

const ManageContacts = ({
  walletList,
  history,
  onChange,
  addToContact,
  open,
  userData,
  loading,
  form,
  setOpen,
  data,
  onSearchUser,
  searchData,
  getContacts,
  addNewUserData,
  error,
  destinationContact,
  activeContacts,
  getRecentContacts,
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
  activeExternalContacts,
}) => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const totalPages = Math.ceil(
    data && data[0] && data.length / ITEMS_PER_PAGE,
  );
  const indexOfLastContact = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstContact = indexOfLastContact - ITEMS_PER_PAGE;
  const showingContacts =
    data &&
    data[0] &&
    data
      .sort(
        (a, b) =>
          a.FirstName && a.FirstName.localeCompare(b.FirstName),
      )
      .slice(indexOfFirstContact, indexOfLastContact);
  const onPageChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  const [allContacts, setAllContacts] = useState(data || []);
  const [isDeletingContact, setIsDeletingContact] = useState(false);

  const handleKeyUp = e => {
    e.persist();
    const search = e.target.value;
    if (search.trim().length > 0) {
      setIsSearching(true);

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
      setAllContacts(found);
    } else {
      setIsSearching(false);
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
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <span className="lighter">
          {isSendingCash &&
            !isSendingMoney &&
            global.translate('Send Cash', 915)}

          {isSendingMoney &&
            !isManagingContacts &&
            global.translate('Send money to your contacts', 1198)}
          {isManagingContacts &&
            global.translate('Manage my contacts', 1195)}
        </span>
      </WelcomeBar>

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
      />
      <div className="inner-area1">
        <div className="heading-text">
          <Image
            src={PREVIOUS_ICON}
            height={30}
            className="goBack"
            onClick={() => history.goBack()}
          />
          <div className="rightText">
            <p className="sub-title">
              {global.translate(
                'Most recent people you have transacted with',
                1194,
              )}
            </p>
          </div>
        </div>
        <RecentlyContactedItems
          setSendCashOpen={setSendCashOpen}
          setSendMoneyOpen={setSendMoneyOpen}
          setDestinationContact={setDestinationContact}
          isSendingCash={isSendingCash}
          isSendingMoney={isSendingMoney}
          DefaultWallet={DefaultWallet}
          items={
            isSendingCash ? activeExternalContacts : activeContacts
          }
          getRecentContacts={getRecentContacts}
        />
      </div>
      <div className="inner-area">
        <div className="main-container">
          <div className="all-contacts">
            <div className="all-contacts-top-wrapper">
              <p className="sub-title">
                {isSendingCash || isSendingMoney
                  ? global.translate('Select Contact', 71)
                  : global.translate('All Contacts', 71)}
              </p>
              {data && data[0] && data[0].ContactsFound !== 'NO' && (
                <Form.Input
                  icon="search"
                  iconPosition="left"
                  placeholder={global.translate('Search', 278)}
                  onKeyUp={handleKeyUp}
                  className="searchField"
                />
              )}
            </div>
            <AddNewContactModal
              open={open}
              setOpen={setOpen}
              walletList={walletList}
              onChange={onChange}
              onSearchUser={onSearchUser}
              form={form}
              onSubmit={addToContact}
              setForm={setForm}
              clearSuccess={clearSuccess}
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
            <Image
              height={75}
              className="addImage"
              src={AddBig}
              onClick={() => {
                if (isSendingCash) {
                  setSendCashOpen(true);
                } else {
                  setOpen(true);
                }
              }}
            />
            <div className="loading-error-section">
              {loading && (
                <LoaderComponent
                  loaderContent={global.translate('Working…', 412)}
                />
              )}
              {error && (
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
              {data && data.length === 0 && !isSendingCash && (
                <Message
                  message={global.translate(
                    'You don’t have any contact yet.',
                    573,
                  )}
                  error={false}
                />
              )}

              {data &&
                data[0] &&
                data[0].ContactsFound === 'NO' &&
                !isSendingCash && (
                  <Message
                    message={global.translate(
                      'You don’t have any contact yet.',
                      573,
                    )}
                    error={false}
                  />
                )}
            </div>
            {showingContacts &&
              !isSearching &&
              data &&
              data[0] &&
              data[0].ContactsFound !== 'NO' &&
              !data[0].Error && (
                <div className="contact-list">
                  {showingContacts
                    .filter(item => !item.Error)
                    .map(item => (
                      <ListItem
                        item={item}
                        setSendMoneyOpen={setSendMoneyOpen}
                        isSendingMoney={isSendingMoney}
                        setSendCashOpen={setSendCashOpen}
                        setDestinationContact={setDestinationContact}
                        isSendingCash={isSendingCash}
                        setIsDeletingContact={setIsDeletingContact}
                        setContact={setContact}
                        open={isDetail}
                        setIsDetail={setIsDetail}
                      />
                    ))}
                </div>
              )}

            {isSearching && allContacts.length === 0 && (
              <Message
                message={global.translate('No contacts found')}
                error={false}
              />
            )}
            {data && data[0] && data[0].Error && (
              <Message
                message={global.translate(data[0].Description)}
                error={false}
              />
            )}
            {isSearching && allContacts.length > 0 && (
              <div className="contact-list">
                {allContacts.map(item => (
                  <ListItem
                    item={item}
                    setSendMoneyOpen={setSendMoneyOpen}
                    isSendingMoney={isSendingMoney}
                    setSendCashOpen={setSendCashOpen}
                    setDestinationContact={setDestinationContact}
                    isSendingCash={isSendingCash}
                    setContact={setContact}
                    setIsDeletingContact={setIsDeletingContact}
                    open={isDetail}
                    setIsDetail={setIsDetail}
                  />
                ))}
              </div>
            )}
          </div>

          {!isSearching &&
            data &&
            data[0] &&
            data.length > ITEMS_PER_PAGE && (
              <div className="app-pagination">
                <div />
                <div>
                  <Pagination
                    boundaryRange={0}
                    ellipsisItem
                    onPageChange={onPageChange}
                    siblingRange={1}
                    activePage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              </div>
            )}
        </div>

        {isSendingCash && (
          <SendCashContainer
            open={sendCashOpen}
            setOpen={setSendCashOpen}
            isSendingCash={isSendingCash}
            destinationContact={destinationContact}
            setDestinationContact={setDestinationContact}
            userData={userData}
            DefaultWallet={DefaultWallet}
          />
        )}
      </div>
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
  activeContacts: PropTypes.objectOf(PropTypes.any),
  getRecentContacts: PropTypes.func,
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
  activeExternalContacts: PropTypes.objectOf(PropTypes.any),
};

ManageContacts.defaultProps = {
  walletList: [],
  history: {},
  open: false,
  destinationContact: null,
  userData: {},
  activeContacts: {},
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
  getRecentContacts: () => {},
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
  activeExternalContacts: {},
};
export default ManageContacts;
