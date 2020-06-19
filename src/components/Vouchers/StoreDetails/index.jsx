import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';

import WelcomeBar from 'components/Dashboard/WelcomeSection';
import PositionPickerModal from 'components/Stores/AddStore/PositionPickerModal';
import Pagination from 'components/common/Pagination';
import LoaderComponent from 'components/common/Loader';
import Thumbnail from 'components/common/Thumbnail';
import GoBack from 'components/common/GoBack';
import Message from 'components/common/Message';
import StoreDetailsComponent from './StoreDetailsComponent';
import SendVoucherModalComp from '../SendVoucherModal';
import './StoreDetails.scss';

const StoreDetails = ({
  userData,
  storeDetails,
  selectedStore,
  handleInputChange,
  SendVoucherModal,
  comments,
}) => {
  const [openMap, setOpenMap] = useState(false);
  const [commentsToShow, setCommentsToShow] = useState([]);
  const onPageChange = itemsToShow => {
    setCommentsToShow(itemsToShow);
  };

  const toggleOpenSendModal = () => {
    SendVoucherModal.setStep(1);
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
        <span className="lighter">
          <GoBack style onClickHandler={onClickHandler} />
          <span className="bold">
            {userData.data && userData.data.FirstName}
          </span>
          , send a voucher.
        </span>
      </WelcomeBar>

      <div className="storeDetails">
        <div className="sendBtnFloat">
          <Button
            className="sendVoucherTop"
            onClick={() => toggleOpenSendModal()}
          >
            Send voucher
          </Button>
        </div>

        <Segment style={{ margin: '10px', marginLeft: '20px' }}>
          <StoreDetailsComponent
            currentStore={selectedStore}
            toggleOpenSendModal={toggleOpenSendModal}
          />
        </Segment>

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
};

StoreDetails.defaultProps = {
  storeDetails: {},
  userData: {},
  selectedStore: {},
  comments: {},
};
export default StoreDetails;
