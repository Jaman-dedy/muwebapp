import Profile from 'containers/PeerServices/UserPeerServices';

export default {
  exact: false,
  name: 'User products and services',
  protected: true,
  indexPage: true,
  path: '/marketplace/user/:id',
  component: Profile,
};
