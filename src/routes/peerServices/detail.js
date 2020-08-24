import PostFeedDetail from 'containers/PeerServices/detail';

export default {
  exact: true,
  name: 'Detail',
  protected: false,
  indexPage: true,
  path: '/service/:id',
  component: PostFeedDetail,
};
