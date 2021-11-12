import { lazy } from 'react';

export default {
  exact: false,
  name: 'Contacts',
  protected: true,
  path: '/contacts/:id',
  component: lazy(() => import('containers/contacts')),
};
