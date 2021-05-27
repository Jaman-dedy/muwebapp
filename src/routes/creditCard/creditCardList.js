import { lazy } from 'react';

export default {
  exact: true,
  name: 'Credit card list',
  protected: true,
  path: '/credit-cards',
  component: lazy(() =>
    import('containers/CreditCard/creditCardList'),
  ),
};
