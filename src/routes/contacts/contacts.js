import { lazy } from 'react';

export default {
  exact: false,
  name: 'Contacts',
  protected: true,
  path: '/contacts',
  component: lazy(() => import('containers/contacts')),
};
