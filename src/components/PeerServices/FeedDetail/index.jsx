import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import '../index.scss';
import './style.scss';
import { useSelector } from 'react-redux';
import myServices from 'containers/PeerServices/myServices';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';
import PostFeed from '../ServiceFeed';
import SidebarAd from '../SidebarAdd';
import ResponsiveContainer from '../ResponsiveContainer';
import EditPricingModal from '../OfferService/NewService/PricingModal';
import PostCategories from '../Categories';

const FeedDetailComponent = React.memo(
  () => {
    const { service, relatedServices } = useSelector(
      state => state.peerServices,
    );
    const { handleUpdateServicePricing } = myServices();

    return (
      <ResponsiveContainer>
        <EditPricingModal
          handleUpdateServicePricing={handleUpdateServicePricing}
          onClose={() => {
            openEditPricingModal({ open: false, service: null });
          }}
        />
        <Container style={{ marginTop: 25 }}>
          <Grid>
            <Grid.Column width={3} id="category-column">
              <PostCategories />
            </Grid.Column>

            <Grid.Column id="main-services-column" width={10}>
              <PostFeed
                posts={service}
                allowCreate={false}
                allowView={false}
                emptyMessage={global.translate(
                  'The service you are looking for was not found',
                )}
              />

              <h3 className="you-may-like">
                {global.translate('You may like', 1857)}
              </h3>

              <PostFeed
                emptyMessage={global.translate(
                  'There are no related services at the moment',
                )}
                posts={relatedServices}
                allowCreate={false}
              />
            </Grid.Column>

            <Grid.Column width={3} id="right-services-side-column">
              <SidebarAd />
            </Grid.Column>
          </Grid>
        </Container>
      </ResponsiveContainer>
    );
  },
  () => false,
);

export default FeedDetailComponent;
