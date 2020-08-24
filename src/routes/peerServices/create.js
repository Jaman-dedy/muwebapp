import NewService from 'containers/PeerServices/NewService';

export default {
  exact: true,
  name: 'Create Service',
  protected: true,
  path: '/create-peer-service',
  component: NewService,
};
