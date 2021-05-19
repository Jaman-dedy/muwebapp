import SendMoneyToBank from 'containers/WalletsAndBankAccounts/SendMoneyToBank';

export default {
  exact: true,
  name: 'Send to bank account',
  protected: true,
  path: '/send-money-to-bank',
  component: SendMoneyToBank,
};
