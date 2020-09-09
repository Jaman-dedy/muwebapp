import PostFeedDetail from 'containers/PeerServices/detail';

export default {
  exact: false,
  name: 'Detail',
  protected: false,
  indexPage: true,
  path: '/marketplace/:id',
  component: PostFeedDetail,
};
