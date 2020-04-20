import cashList from './cashList';

export default {
  history: {
    data: null,
    loading: false,
    error: null,
  },
  walletTransactions: {
    data: null,
    loading: false,
    error: null,
  },
  modifyCash: {
    data: null,
    loading: false,
    error: null,
  },
  cancelTransaction: {
    data: null,
    loading: false,
    error: null,
  },
  externalContactTransactions: {
    data: null,
    loading: false,
    error: null,
  },
  ...cashList,
};
