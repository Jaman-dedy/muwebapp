import {
  GET_TRANSACTIONS_OVERVIEW_ERROR,
  GET_TRANSACTIONS_OVERVIEW_START,
  GET_TRANSACTIONS_OVERVIEW_SUCCESS,
} from 'constants/action-types/transactions/overview';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_TRANSACTIONS_OVERVIEW_START:
      return {
        ...state,
        overview: {
          ...state.overview,
          transactionsOverview: {
            ...state.overview.transactionsOverview,
            loading: true,
            error: null,
          },
        },
      };
    case GET_TRANSACTIONS_OVERVIEW_ERROR:
      return {
        ...state,
        overview: {
          ...state.overview,
          transactionsOverview: {
            ...state.overview.transactionsOverview,
            error: payload,
            loading: false,
          },
        },
      };
    case GET_TRANSACTIONS_OVERVIEW_SUCCESS:
      return {
        ...state,
        overview: {
          ...state.overview,
          transactionsOverview: {
            ...state.overview.transactionsOverview,
            error: null,
            loading: false,
            data: payload,
          },
        },
      };
    default:
      return null;
  }
};
