import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
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

const ServiceFeedList = React.memo(
  () => {
    const { open, service } = useSelector(
      state => state.peerServices.editPricingModal,
    );
    const posts = usePosts();
    const dispatch = useDispatch();

    const handleEditClose = () => {
      openEditPricingModal({ open: false, service: null })(dispatch);
    };

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
            content={global.translate('"Find services near you"')}
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
            handleupdateService={() => {}}
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
                <PostFeed posts={posts} />
              </Grid.Column>
              <Grid.Column width={3} id="right-services-side-column">
                <SidebarAd />
              </Grid.Column>
            </Grid>
          </Container>
        </ResponsiveContainer>
      </>
    );
  },
  () => {},
);

export default ServiceFeedList;
