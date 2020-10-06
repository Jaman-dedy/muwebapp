import TransactionDetail from 'containers/Transactions/TransactionDetail';

export default {
  exact: true,
  name: 'Transaction detail',
  protected: true,
  path: '/transactions/:id',
  component: TransactionDetail,
};
