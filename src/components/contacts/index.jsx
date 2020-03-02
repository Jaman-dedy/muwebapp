import React, { useState } from 'react';
import './style.scss';
import { Image, Pagination, Input, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddBig from 'assets/images/addBig.png';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import PREVIOUS_ICON from 'assets/images/back.png';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
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
  activeContacts,
  getRecentContacts,
  clearSuccess,
  localError,
}) => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    data && data[0] && data.length / ITEMS_PER_PAGE,
  );
  const indexOfLastContact = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstContact = indexOfLastContact - ITEMS_PER_PAGE;
  const showingContacts =
    data &&
    data[0] &&
    data
      .sort((a, b) => a.FirstName.localeCompare(b.FirstName))
      .slice(indexOfFirstContact, indexOfLastContact);
  const onpageChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <span className="lighter">
          Hey{' '}
          <span className="bold">
            {userData.data && userData.data.FirstName}
          </span>
          ,{global.translate('manage your contacts')}
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
          items={activeContacts}
          getRecentContacts={getRecentContacts}
        />
      </div>
      <div className="inner-area">
        <div className="main-container">
          <div className="all-contacts">
            <div className="all-contacts-top-wrapper">
              <p className="sub-title">
                {global.translate('All Contacts', 71)}
              </p>
              {data && data[0].ContactsFound !== 'NO' && (
                <Form.Input
                  icon="search"
                  iconPosition="left"
                  placeholder="Search"
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
              clearSuccess={clearSuccess}
              searchData={searchData}
              addNewUserData={addNewUserData}
              localError={localError}
            />
            <Image
              height={90}
              className="addImage"
              src={AddBig}
              onClick={() => setOpen(true)}
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
                      : global.translate('Error', 195)
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
              data &&
              data[0].ContactsFound !== 'NO' && (
                <div className="contact-list">
                  {showingContacts.map(item => (
                    <ListItem item={item} />
                  ))}
                </div>
              )}
          </div>
          <div
            className="pagination"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div />
            {data && data[0] && data.length > ITEMS_PER_PAGE && (
              <Pagination
                style={{ alignSelf: 'flex-end', margin: '5px 102px' }}
                boundaryRange={0}
                ellipsisItem
                onPageChange={onpageChange}
                siblingRange={1}
                activePage={currentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
ManageContacts.propTypes = {
  walletList: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.instanceOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  addToContact: PropTypes.func.isRequired,
  open: PropTypes.bool,
  userData: PropTypes.instanceOf(PropTypes.object),
  loading: PropTypes.bool,
  form: PropTypes.objectOf(PropTypes.any),
  setOpen: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.any),
  searchData: PropTypes.objectOf(PropTypes.any),
  getContacts: PropTypes.func,
  addNewUserData: PropTypes.func,
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
  addNewUserData: () => {},
  error: {},
  localError: null,
};
export default ManageContacts;
