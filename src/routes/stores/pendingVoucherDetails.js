import VoucherDetails from 'containers/Stores/VoucherDetails';

export default {
  exact: false,
  name: 'Pending voucher details',
  protected: true,
  path: '/my-stores/pending-vouchers/:id',
  component: VoucherDetails,
};
