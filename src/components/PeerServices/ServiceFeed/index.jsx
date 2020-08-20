import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import openCreateModal from 'redux/actions/peerServices/openCreateModal';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import EmptyCard from 'components/Stores/MyStores/EmptyCard';
import { LOGIN_RETURN_URL } from 'constants/general';
import PostFeedItem from './Item';
import CreateServiceTrigger from '../CreateTrigger';

const ServicesFeed = React.memo(
  ({ posts, allowCreate, emptyMessage, allowView }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const history = useHistory();

    const { data: user } = useSelector(
      ({ user: { userData } }) => userData,
    );

    const { data, loading, error, hasMore, loadMoreItems } = posts;

    const handleOpenCreateForm = () => {
      if (!user?.PID) {
        toast.info(global.translate('You need to login first', 1841));
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
        {(pathname === '/peer-services' || pathname === '/results') &&
          data?.Data?.length > 0 &&
          data?.Data.map(item => (
            <PostFeedItem
              service={item}
              allowView={allowView}
              key={item.ServiceID}
              ref={lastServiceElementRef}
            />
          ))}
        {loading && (
          <p>
            <LoaderComponent
              loaderContent={global.translate('Working...', 412)}
            />
          </p>
        )}

        {error && error[0] && !loading && (
          <Message
            message={
              error[0].Description
                ? global.translate(error[0].Description)
                : global.translate(error.error)
            }
          />
        )}
        {error && !error[0] && !loading && (
          <Message message={global.translate(error.error)} />
        )}
        {!loading && !error && (
          <div className="user-services-list">
            {(data?.FoundData === 'NO' || data?.Data?.length === 0) &&
            !loading ? (
              <EmptyCard
                body={
                  emptyMessage ||
                  global.translate(
                    'You can create your own service and let the public know',
                    1892,
                  )
                }
                disableAdd={!!emptyMessage}
                header={global.translate(
                  'Looks like there are no services yet',
                  1893,
                )}
                createText={global.translate('Create Service', 1894)}
                onAddClick={handleOpenCreateForm}
              />
            ) : (
              <>
                {(pathname !== '/peer-services' ||
                  pathname !== '/results') &&
                  data?.Data?.length > 0 &&
                  data?.Data.map(item => (
                    <PostFeedItem
                      service={item}
                      key={item.ServiceID}
                      allowView={allowView}
                      ref={lastServiceElementRef}
                    />
                  ))}
              </>
            )}
          </div>
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
  },
  () => {},
);

ServicesFeed.propTypes = {
  allowCreate: PropTypes.bool,
  allowView: PropTypes.bool,
  posts: PropTypes.objectOf(PropTypes.any).isRequired,
  emptyMessage: PropTypes.string,
};

ServicesFeed.defaultProps = {
  allowCreate: true,
  emptyMessage: null,
  allowView: true,
};

export default ServicesFeed;
