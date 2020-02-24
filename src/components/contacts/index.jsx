import React from 'react';
import './style.scss';
import { Image } from 'semantic-ui-react';
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
  AddToContact,
  open,
  userData,
  loading,
  form,
  setOpen,
  data,
  searchData,
  getContacts,
  addNewUserData,
  error = { error },
}) => {
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <span className="lighter">
          Hey{' '}
          <span className="bold">
            {userData.data && userData.data.FirstName}
          </span>
          ,manage your contacts
        </span>
      </WelcomeBar>
      <div className="inner-area">
        <div className="heading-text">
          <Image
            src={PREVIOUS_ICON}
            height={30}
            onClick={() => history.goBack()}
          />
          <div className="rightText">
            <p className="sub-title">
              People you have recently transacted with
            </p>
          </div>
        </div>
        <div className="images-wrapper">
          <div className="image-container">
            <RecentlyContactedItems />
          </div>
        </div>
        <div className="main-container">
          <div className="all-contacts">
            <div className="all-contacts-top-wrapper">
              <p className="sub-title">All Contacts</p>
              <Image
                height={90}
                className="addImage"
                src={AddBig}
                onClick={() => setOpen(true)}
              />
            </div>

            <AddNewContactModal
              open={open}
              setOpen={setOpen}
              walletList={walletList}
              onChange={onChange}
              form={form}
              onSubmit={AddToContact}
              searchData={searchData}
              onkeyUp={() => {}}
              addNewUserData={addNewUserData}
            />

            {loading && (
              <LoaderComponent loaderContent="Loading contacts" />
            )}
            {error && (
              <Message
                message={
                  error.error ? error.error : 'Something went wrong'
                }
                action={{
                  onClick: () => {
                    getContacts();
                  },
                }}
              />
            )}

            {data && data[0].ContactsFound === 'NO' && (
              <Message message="No contacts yet" error={false} />
            )}

            {data && data[0] && data[0].DefaultWallet && (
              <div className="contact-list">
                {data.map(item => (
                  <ListItem item={item} key={item.DefaultWallet} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageContacts;
