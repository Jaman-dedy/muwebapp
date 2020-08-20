import Profile from 'containers/UserPeerServices';

export default {
  exact: true,
  name: 'My Services',
  protected: true,
  indexPage: true,
  path: '/user-services/:id',
  component: Profile,
};
