import { lazy } from 'react';

export default {
  exact: true,
  name: 'Store Feedback',
  protected: true,
  path: '/store-feedback',
  component: lazy(() => import('containers/Stores/StoreFeedback')),
};
