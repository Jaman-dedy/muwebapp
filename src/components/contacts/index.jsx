import React, { useState } from 'react';
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

  const [allContacts, setAllContacts] = useState(
    (data && data[0] && data) || [],
  );

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
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <span className="lighter">
          {global.translate('Hey')}{' '}
          <span className="bold">
            {userData.data && userData.data.FirstName}
          </span>
          ,&nbsp;
          {isSendingCash &&
            !isSendingMoney &&
            global.translate('send cash to your contacts')}
          {isSendingMoney &&
            !isSendingCash &&
            global.translate('send money to your contacts')}
          {!isSendingCash &&
            !isSendingMoney &&
            global.translate('manage your contacts')}
        </span>
      </WelcomeBar>
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
                'People you have recently transacted with',
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
          items={activeContacts}
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
              {data && data[0].ContactsFound !== 'NO' && (
                <Form.Input
                  icon="search"
                  iconPosition="left"
                  placeholder="Search"
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

            {isSendingMoney && (
              <SendMoneyContainer
                setSendMoneyOpen={setSendMoneyOpen}
                sendMoneyOpen={sendMoneyOpen}
                destinationContact={destinationContact}
                setDestinationContact={setDestinationContact}
              />
            )}
            <Image
              height={75}
              className="addImage"
              src={AddBig}
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                isSendingCash ? setSendCashOpen(true) : setOpen(true);
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
                      ? global.translate(error.error)
                      : global.translate(error[0].Description, 195)
                  }
                  action={{
                    onClick: () => {
                      getContacts();
                    },
                  }}
                />
              )}

              {data && data[0].ContactsFound === 'NO' && (
                <Message
                  message={global.translate('No contacts yet')}
                  error={false}
                />
              )}
            </div>
            {showingContacts &&
              !isSearching &&
              data &&
              data[0].ContactsFound !== 'NO' && (
                <div className="contact-list">
                  {showingContacts.map(item => (
                    <ListItem
                      item={item}
                      setSendMoneyOpen={setSendMoneyOpen}
                      isSendingMoney={isSendingMoney}
                      setSendCashOpen={setSendCashOpen}
                      setDestinationContact={setDestinationContact}
                      isSendingCash={isSendingCash}
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
};

ManageContacts.defaultProps = {
  walletList: [],
  history: {},
  open: false,
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
  getRecentContacts: () => {},
  addNewUserData: {},
  error: {},
  localError: null,
};
export default ManageContacts;
