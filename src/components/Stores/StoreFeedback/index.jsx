import React from 'react';
import PropTypes from 'prop-types';
import './StoreFeedback.scss';
import { useHistory } from 'react-router-dom';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import StoreDetailsCard from 'components/common/StoreDetails/StoreDetailsCard';
import StoreComments from 'components/common/StoreDetails/Comments';

const StoreFeedback = ({
  storeComments,
  postCommentFn,
  postComment,
  handleInputChange,
  form,
  selectedStore,
  likeStore,
  dislikeStore,
  rateStore,
}) => {
  const history = useHistory();

  return (
    <DashboardLayout>
      <WelcomeBar>
        <span>
          <div className="lighter">
            <GoBack style onClickHandler={() => history.goBack()} />
            <span>{global.translate('Details')}</span>
          </div>
        </span>
      </WelcomeBar>
      <div className="StoreFeedback">
        <StoreDetailsCard
          currentStore={selectedStore}
          likeStore={likeStore}
          postComment={postComment}
          form={form}
          dislikeStore={dislikeStore}
          rateStore={rateStore}
        />
        <StoreComments
          comments={storeComments}
          postComment={postComment}
          postCommentFn={postCommentFn}
          handleInputChange={handleInputChange}
          form={form}
        />
      </div>
    </DashboardLayout>
  );
};

StoreFeedback.propTypes = {
  storeComments: PropTypes.objectOf(PropTypes.any),
  postCommentFn: PropTypes.func,
  postComment: PropTypes.objectOf(PropTypes.any),
  handleInputChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  selectedStore: PropTypes.objectOf(PropTypes.any),
  likeStore: PropTypes.func,
  dislikeStore: PropTypes.func,
  rateStore: PropTypes.func,
};

StoreFeedback.defaultProps = {
  storeComments: {},
  postCommentFn: () => {},
  postComment: {},
  handleInputChange: () => {},
  form: {},
  selectedStore: {},
  likeStore: () => {},
  dislikeStore: () => {},
  rateStore: () => {},
};

export default StoreFeedback;
