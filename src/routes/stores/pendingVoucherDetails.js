import { lazy } from 'react';

export default {
  exact: false,
  name: 'Pending voucher details',
  protected: true,
  path: '/my-stores/pending-vouchers/:id',
  component: lazy(() => import('containers/Stores/VoucherDetails')),
};
