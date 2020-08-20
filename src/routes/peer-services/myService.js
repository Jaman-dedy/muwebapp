import ServiceDetailContainer from 'containers/PeerServices/detail';

export default {
  exact: true,
  name: 'My Service',
  protected: false,
  path: '/service/:id',
  component: ServiceDetailContainer,
};
