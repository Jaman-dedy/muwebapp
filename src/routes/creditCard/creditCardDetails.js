import { lazy } from 'react';

export default {
  exact: true,
  name: 'Credit card details',
  protected: true,
  path: '/credit-card-details',
  component: lazy(() =>
    import('containers/CreditCard/creditCardDetails'),
  ),
};
