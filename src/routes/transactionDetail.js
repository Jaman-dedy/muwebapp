import TransactionDetail from 'containers/Transactions/TransactionDetail';

export default {
  exact: true,
  name: 'TransactionDetail',
  protected: true,
  path: '/transactions/:id',
  component: TransactionDetail,
};
