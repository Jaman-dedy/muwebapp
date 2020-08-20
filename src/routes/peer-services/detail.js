import PostFeedDetail from 'containers/PeerServices/detail';

export default {
  exact: true,
  name: 'Detail',
  protected: false,
  path: '/peer-services/:id',
  component: PostFeedDetail,
};
