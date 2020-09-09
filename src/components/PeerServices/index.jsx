import React, { useState, useEffect } from 'react';
import { Container, Grid, Tab } from 'semantic-ui-react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';
import {
  PEER_SERVICES_OG_IMAGE_URL,
  PEER_SERVICES_OG_URL,
} from 'constants/general';
import PostFeed from './ServiceFeed';
import PostCategories from './Categories';
import SidebarAd from './SidebarAdd';
import usePosts from '../../containers/PeerServices/useLoadServices';
import ResponsiveContainer from './ResponsiveContainer';
import EditPricingModal from './OfferService/NewService/PricingModal';
import CreateServiceTrigger from './CreateTrigger';

const ServiceFeedList = () => {
  const { open, service } = useSelector(
    state => state.peerServices.editPricingModal,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const posts = usePosts();
  const dispatch = useDispatch();
  const history = useHistory();

  const params = queryString.parse(history.location.search);

  const handleEditClose = () => {
    openEditPricingModal({ open: false, service: null })(dispatch);
  };

  useEffect(() => {
    if (params.activeIndex === 'saved') {
      setActiveIndex(1);
    }
  }, [params.activeIndex]);

  const { data: user } = useSelector(state => state.user.userData);

  const { bookMarkedServices } = useSelector(
    ({ peerServices }) => peerServices,
  );

  const panes = [
    {
      menuItem: {
        key: 'Posts',
        content: global.translate('Recent', 2110),
      },
      render: () => (
        <Tab.Pane as="div">
          {' '}
          <PostFeed posts={posts} allowCreate={false} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'bookmark',
        content: global.translate('Saved', 2111),
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
          {global.translate('Peer Services')} |{' '}
          {global.translate('Offer Services')}
        </title>
        <meta
          name="description"
          content={global.translate('Find services near you', 1240)}
        />
        <meta name="robots" content="index, nofollow" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={PEER_SERVICES_OG_URL} />
        <meta
          property="og:image"
          content={PEER_SERVICES_OG_IMAGE_URL}
        />
      </Helmet>

      <ResponsiveContainer>
        <EditPricingModal
          service={service}
          open={open}
          onClose={handleEditClose}
        />

        <Container style={{ marginTop: 25 }}>
          <Grid>
            <Grid.Column width={3} id="category-column">
              <PostCategories />
            </Grid.Column>

            <Grid.Column
              id="main-services-column"
              width={10}
              className="menu tabs-menu"
            >
              {user ? (
                <>
                  <CreateServiceTrigger />
                  <Tab
                    activeIndex={activeIndex}
                    panes={panes}
                    onTabChange={(event, data) => {
                      setActiveIndex(data.activeIndex);
                      history.push({
                        pathname: history.location.pathname,
                        search: `?activeIndex=${
                          data.activeIndex === 1 ? 'saved' : 'recent'
                        }`,
                      });
                    }}
                  />
                </>
              ) : (
                <>
                  {' '}
                  <CreateServiceTrigger />
                  <PostFeed posts={posts} allowCreate={false} />
                </>
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

export default ServiceFeedList;
