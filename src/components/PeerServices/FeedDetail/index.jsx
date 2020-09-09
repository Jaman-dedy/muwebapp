import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import '../index.scss';
import './style.scss';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import myServices from 'containers/PeerServices/myServices';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';
import {
  PEER_SERVICES_OG_IMAGE_URL,
  PEER_SERVICES_OG_URL,
} from 'constants/general';
import PostFeed from '../ServiceFeed';
import SidebarAd from '../SidebarAdd';
import ResponsiveContainer from '../ResponsiveContainer';
import EditPricingModal from '../OfferService/NewService/PricingModal';
import PostCategories from '../Categories';

const FeedDetailComponent = React.memo(
  ({ currentService }) => {
    const { service, relatedServices } = useSelector(
      state => state.peerServices,
    );
    const { handleupdateService } = myServices();

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{global.translate(currentService?.Title)}</title>
          <meta
            name="description"
            content={global.translate(currentService?.Description)}
          />
          <meta name="robots" content="index, nofollow" />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${PEER_SERVICES_OG_URL}/${currentService?.ServiceID}`}
          />
          <meta
            property="og:image"
            content={PEER_SERVICES_OG_IMAGE_URL}
          />
        </Helmet>
        <ResponsiveContainer>
          <EditPricingModal
            handleupdateService={handleupdateService}
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
                  emptyMessage={{
                    title: global.translate(
                      'No products or services matched',
                      2105,
                    ),
                    body: global.translate(
                      'The service you are looking for was not found',
                      1789,
                    ),
                  }}
                />
                {relatedServices.data?.Data?.[0] && (
                  <div>
                    {!service.loading && (
                      <h3 className="you-may-like">
                        {global.translate('You may also like')}
                      </h3>
                    )}

                    {!service.loading && (
                      <PostFeed
                        emptyMessage={{
                          title: global.translate(
                            'No related Services found',
                          ),
                          body: global.translate(
                            'There are no related services at the moment',
                          ),
                        }}
                        posts={relatedServices}
                        allowCreate={false}
                      />
                    )}
                  </div>
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
  },
  () => false,
);

export default FeedDetailComponent;
