import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../index.scss';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';
import user from 'redux/initial-states/user';
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
          content={global.translate('"Find services near you"')}
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
        title={global.translate('Offer a service', 625)}
      >
        <EditPricingModal
          handleupdateService={() => {}}
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
              <PostFeed
                posts={{ data, loading, error }}
                allowCreate={user.PID === userPID}
                deleteServiceStore={deleteServiceStore}
                setServiceStatusStore={setServiceStatusStore}
              />
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
