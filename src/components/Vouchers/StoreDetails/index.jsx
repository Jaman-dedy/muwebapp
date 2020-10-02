import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';

import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import PositionPickerModal from 'components/Stores/AddStore/PositionPickerModal';
import Pagination from 'components/common/Pagination';
import LoaderComponent from 'components/common/Loader';
import Thumbnail from 'components/common/Thumbnail';
import Message from 'components/common/Message';
import SendVoucherModalComp from 'components/Vouchers/SendVoucherModal';
import StoreDetailsCard from 'components/common/StoreDetails/StoreDetailsCard';

import './StoreDetails.scss';

const StoreDetails = ({
  userData,
  storeDetails,
  selectedStore,
  handleInputChange,
  SendVoucherModal,
  comments,
  form,
}) => {
  const [hasError, setHasError] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [commentsToShow, setCommentsToShow] = useState([]);
  const onPageChange = itemsToShow => {
    setCommentsToShow(itemsToShow);
  };

  const toggleOpenSendModal = () => {
    SendVoucherModal.setSendMoneyOpen(
      !SendVoucherModal.sendMoneyOpen,
    );
  };

  const onClickHandler = () => {
    storeDetails.goBack();
  };

  return (
    <>
      <WelcomeBar loading={userData.loading}>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {userData.data && userData.data?.FirstName}
            <span>, {global.translate('Send a Voucher', 763)}</span>
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>

      <div className="storeDetails">
        <div className="sendBtnFloat">
          <Button
            className="sendVoucherTop"
            onClick={() => toggleOpenSendModal()}
          >
            {global.translate('Send voucher', 863)}
          </Button>
        </div>

        <div style={{ margin: '10px', marginLeft: '20px' }}>
          <StoreDetailsCard
            currentStore={selectedStore}
            form={form}
            isDisabled
          />
        </div>

        <div className="commentThreads">
          {comments && comments.loading && (
            <Segment style={{ margin: '10px', marginLeft: '20px' }}>
              <LoaderComponent
                loaderContent={global.translate('Working...', 412)}
              />
            </Segment>
          )}

          {comments &&
            comments.data &&
            comments.data[0] &&
            comments.data[0].Comments && (
              <Segment style={{ margin: '10px', marginLeft: '20px' }}>
                {commentsToShow &&
                  commentsToShow.map(item => (
                    <span className="commentThread">
                      <span>
                        <Thumbnail
                          avatar={item.PictureURL || 'N/A'}
                          name={item.Name || 'Unknown'}
                          secondName={item.Name || 'User'}
                          style={{ height: '50px', width: '50px' }}
                          hasError={hasError}
                          setHasError={setHasError}
                        />
                      </span>
                      <span className="commentInfo flex flex-column">
                        <span className="flex flex-row">
                          <span className="commentUser">
                            {item.Name}
                          </span>
                          <span className="commentTime">
                            {item.Date}
                          </span>
                        </span>
                        <span>{item.Comment}</span>
                      </span>
                    </span>
                  ))}
              </Segment>
            )}

          {comments &&
            comments.data &&
            comments.data[0] &&
            comments.data[0].Error === '2016' && (
              <Message
                error={false}
                message={global.translate('No comment', 871)}
                style={{ width: '95%', margin: 'auto' }}
              />
            )}
          {comments &&
            comments.data &&
            comments.data[0] &&
            comments.data[0].Comments && (
              <Pagination
                data={comments.data[0].Comments}
                onPageChange={onPageChange}
                itemsPerPage={5}
                className="pagination"
                style={{
                  width: '80%',
                  marginTop: '20px',
                  marginBottom: '20px',
                }}
              />
            )}
        </div>
      </div>

      <SendVoucherModalComp SendVoucherModal={SendVoucherModal} />
      <PositionPickerModal
        open={openMap}
        setOpen={setOpenMap}
        handleInputChange={handleInputChange}
        defaultLatitude={selectedStore.Latitude}
        defaultLongitude={selectedStore.Longitude}
        addStoreData={selectedStore}
      />
    </>
  );
};

StoreDetails.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  storeDetails: PropTypes.objectOf(PropTypes.any),
  selectedStore: PropTypes.objectOf(PropTypes.any),
  handleInputChange: PropTypes.func.isRequired,
  SendVoucherModal: PropTypes.func.isRequired,
  comments: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.objectOf(PropTypes.any),
};

StoreDetails.defaultProps = {
  storeDetails: {},
  userData: {},
  selectedStore: {},
  comments: {},
  form: {},
};
export default StoreDetails;
