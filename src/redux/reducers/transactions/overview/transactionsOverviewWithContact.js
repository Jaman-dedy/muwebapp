import {
  TRANSACTIONS_OVERVIEW_WITH_CONTACT_ERROR,
  TRANSACTIONS_OVERVIEW_WITH_CONTACT_START,
  TRANSACTIONS_OVERVIEW_WITH_CONTACT_SUCCESS,
} from 'constants/action-types/transactions/overview';

export default (state, { type, payload }) => {
  switch (type) {
    case TRANSACTIONS_OVERVIEW_WITH_CONTACT_START:
      return {
        ...state,
        overview: {
          ...state.overview,
          transactionsOverviewWithContact: {
            ...state.overview.transactionsOverviewWithContact,
            loading: true,
            error: null,
          },
        },
      };
    case TRANSACTIONS_OVERVIEW_WITH_CONTACT_ERROR:
      return {
        ...state,
        overview: {
          ...state.overview,
          transactionsOverviewWithContact: {
            ...state.overview.transactionsOverviewWithContact,
            error: payload,
            loading: false,
          },
        },
      };
    case TRANSACTIONS_OVERVIEW_WITH_CONTACT_SUCCESS:
      return {
        ...state,
        overview: {
          ...state.overview,
          transactionsOverviewWithContact: {
            ...state.overview.transactionsOverviewWithContact,
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
