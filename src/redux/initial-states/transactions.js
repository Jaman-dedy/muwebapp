import cashList from './cashList';

export default {
  walletTransactions: {
    data: null,
    loading: false,
    error: null,
  },
  ...cashList,
};
