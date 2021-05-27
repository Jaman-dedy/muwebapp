import { lazy } from 'react';

export default {
  exact: false,
  name: 'push to paypal',
  protected: true,
  path: '/push-paypal',
  component: lazy(() =>
    import('containers/MoneyTransfer/SendToPayPal'),
  ),
};
