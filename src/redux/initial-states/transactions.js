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
  pendingVouchers: {
    data: null,
    loading: false,
    error: null,
  },
  cancelVoucher: {
    data: null,
    loading: false,
    error: null,
  },
  recentStores: {
    data: null,
    loading: false,
    error: null,
  },
  ...cashList,
  overview: {
    transactionsOverview: {
      data: null,
      loading: false,
      error: null,
    },
    transactionsOverviewWithContact: {
      data: null,
      loading: false,
      error: null,
    },
  },
  pendingOther: {
    data: null,
    loading: false,
    error: null,
  },
  editOrCancelOther: {
    data: null,
    loading: false,
    error: null,
  },
};
