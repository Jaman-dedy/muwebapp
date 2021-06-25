import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import openCreateModal from 'redux/actions/peerServices/openCreateModal';
import LoaderComponent from 'components/common/Loader';
import EmptyCard from 'components/Stores/MyStores/EmptyCard';
import { LOGIN_RETURN_URL } from 'constants/general';
import PostFeedItem from './Item';
import CreateServiceTrigger from '../CreateTrigger';

const ServicesFeed = ({
  posts,
  allowCreate,
  emptyMessage,
  disableEmptyAdd,
  allowView,
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const { data: user } = useSelector(
    ({ user: { userData } }) => userData,
  );

  const { data, loading, hasMore, loadMoreItems } = posts;

  const handleOpenCreateForm = () => {
    if (!user?.PID) {
      localStorage.toOpenCreateForm = '1';
      history.push({
        pathname: `/login`,
        search: `${LOGIN_RETURN_URL}=${pathname}`,
        state: {
          [LOGIN_RETURN_URL]: pathname,
          toOpenChat: true,
        },
      });
    } else {
      openCreateModal({ open: true })(dispatch);
    }
  };

  const observer = useRef();
  const lastServiceElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const MyServicesLayout = () => (
    <div className="services-wrapper">
      {data?.Data?.length > 0 &&
        data?.Data.map(item => (
          <PostFeedItem
            service={item}
            allowView={allowView}
            key={item.ServiceID}
            ref={lastServiceElementRef}
          />
        ))}
      {loading && (
        <LoaderComponent
          style={{ marginTop: 25 }}
          loaderContent={global.translate('Working...', 412)}
        />
      )}

      {(data?.FoundData === 'NO' || data?.Data?.length === 0) &&
        !loading && (
          <EmptyCard
            body={
              emptyMessage?.body ||
              global.translate(
                'You can create your own services or products and let the public know',
              )
            }
            disableAdd={!!emptyMessage || disableEmptyAdd}
            header={
              emptyMessage?.title ||
              global.translate(
                'Looks like there are no services or products yet',
              )
            }
            createText={global.translate('Create Post')}
            onAddClick={handleOpenCreateForm}
          />
        )}
    </div>
  );

  return (
    <>
      {allowCreate && (
        <CreateServiceTrigger onClick={handleOpenCreateForm} />
      )}
      <MyServicesLayout />
    </>
  );
};

ServicesFeed.propTypes = {
  allowCreate: PropTypes.bool,
  allowView: PropTypes.bool,
  disableEmptyAdd: PropTypes.bool,
  posts: PropTypes.objectOf(PropTypes.any).isRequired,
  emptyMessage: PropTypes.string,
};

ServicesFeed.defaultProps = {
  allowCreate: true,
  emptyMessage: null,
  allowView: true,
  disableEmptyAdd: false,
};

export default ServicesFeed;
