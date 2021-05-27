import { lazy } from 'react';

export default {
  exact: false,
  name: 'Contacts',
  protected: true,
  path: '/contact/:id/share-wallets',
  component: lazy(() => import('containers/contacts')),
};
