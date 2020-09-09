import React, { useState, useEffect } from 'react';
import { Container, Grid, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../index.scss';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import { useHistory } from 'react-router-dom';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';
import {
  PEER_SERVICES_OG_IMAGE_URL,
  PEER_SERVICES_OG_URL,
} from 'constants/general';
import ResponsiveContainer from '../ResponsiveContainer';
import PostFeed from '../ServiceFeed';
import SidebarAd from '../SidebarAdd';
import ProfileCard from './ProfileCard';
import ProfileCardOptions from './ProfileCardOptions';
import EditPricingModal from './NewService/PricingModal';

const ProfileComponent = ({ userPID }) => {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: user } = useSelector(state => state.user.userData);

  const { bookMarkedServices } = useSelector(
    ({ peerServices }) => peerServices,
  );
  const { data, error, loading } = useSelector(
    ({ peerServices: { myServices } }) => myServices,
  );

  const deleteServiceStore = useSelector(
    ({ peerServices: { deleteService } }) => deleteService,
  );
  const setServiceStatusStore = useSelector(
    ({ peerServices: { setServiceStatus } }) => setServiceStatus,
  );

  const { open, service } = useSelector(
    state => state.peerServices.editPricingModal,
  );

  const dispatch = useDispatch();

  const handleEditClose = () => {
    openEditPricingModal({ open: false, service: null })(dispatch);
  };
  const params = queryString.parse(history.location.search);

  useEffect(() => {
    if (params.activeIndex === 'saved') {
      setActiveIndex(1);
    }
  }, [params.activeIndex]);

  const panes = [
    {
      menuItem: {
        key: 'Posts',
        content: global.translate('My Posts'),
      },
      render: () => (
        <Tab.Pane as="div">
          {' '}
          <PostFeed
            posts={{ data, loading, error }}
            allowCreate={user?.PID === userPID}
            deleteServiceStore={deleteServiceStore}
            setServiceStatusStore={setServiceStatusStore}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'bookmark',
        content: global.translate('Saved'),
      },
      render: () => (
        <Tab.Pane as="div">
          {' '}
          <PostFeed
            posts={bookMarkedServices}
            allowCreate={false}
            disableEmptyAdd
            emptyMessage={{
              title: global.translate('No saved posts yet', 2112),
              body: global.translate(
                'All products and services you bookmark will appear here',
                2113,
              ),
            }}
            deleteServiceStore={deleteServiceStore}
            setServiceStatusStore={setServiceStatusStore}
          />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {global.translate('Peer Services')} |
          {global.translate('Offers Services')}
        </title>
        <meta
          name="description"
          content={global.translate('Find services near you', 1240)}
        />
        <meta name="robots" content="index, nofollow" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${PEER_SERVICES_OG_URL}/${userPID}`}
        />
        <meta
          property="og:image"
          content={PEER_SERVICES_OG_IMAGE_URL}
        />
      </Helmet>

      <ResponsiveContainer
        title={
          userPID === user?.PID?.toLowerCase() || userPID === 'me'
            ? global.translate('My Posts', 2109)
            : global.translate('User Posts')
        }
      >
        <EditPricingModal
          service={service}
          open={open}
          onClose={handleEditClose}
        />

        <Container style={{ marginTop: 25 }}>
          <Grid>
            <Grid.Column width={3} id="category-column">
              {!loading && (
                <>
                  <ProfileCard />
                  <ProfileCardOptions />
                </>
              )}
            </Grid.Column>

            <Grid.Column
              width={10}
              id="main-services-column"
              className="menu tabs-menu"
            >
              {userPID === user?.PID?.toLowerCase() ||
              userPID === 'me' ? (
                <Tab
                  panes={panes}
                  activeIndex={activeIndex}
                  onTabChange={(event, data) => {
                    setActiveIndex(data.activeIndex);

                    history.push({
                      pathname: history.location.pathname,
                      search: `?activeIndex=${
                        data.activeIndex === 1 ? 'saved' : 'all'
                      }`,
                    });
                  }}
                />
              ) : (
                <PostFeed
                  posts={{ data, loading, error }}
                  allowCreate={user?.PID === userPID}
                  deleteServiceStore={deleteServiceStore}
                  setServiceStatusStore={setServiceStatusStore}
                />
              )}
            </Grid.Column>

            <Grid.Column width={3} id="right-services-side-column">
              <SidebarAd />
            </Grid.Column>
          </Grid>
        </Container>
      </ResponsiveContainer>
    </>
  );
};
ProfileComponent.propTypes = {
  userPID: PropTypes.string,
};
ProfileComponent.defaultProps = {
  userPID: null,
};
export default ProfileComponent;
