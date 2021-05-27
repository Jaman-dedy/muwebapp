import { lazy } from 'react';

export default {
  exact: false,
  name: 'Contacts',
  protected: true,
  path: '/contact/:id',
  component: lazy(() => import('containers/contacts')),
};
