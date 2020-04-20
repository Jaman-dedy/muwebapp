import {
  GET_EXTERNAL_CONTACT_TRANSACTIONS_START,
  GET_EXTERNAL_CONTACT_TRANSACTIONS_SUCCESS,
  GET_EXTERNAL_CONTACT_TRANSACTIONS_ERROR,
} from 'constants/action-types/transactions/externalContactTransactions';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_EXTERNAL_CONTACT_TRANSACTIONS_START:
      return {
        ...state,
        externalContactTransactions: {
          ...state.externalContactTransactions,
          loading: true,
          error: null,
        },
      };
    case GET_EXTERNAL_CONTACT_TRANSACTIONS_ERROR:
      return {
        ...state,
        externalContactTransactions: {
          ...state.externalContactTransactions,
          error: payload,
          loading: false,
        },
      };
    case GET_EXTERNAL_CONTACT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        externalContactTransactions: {
          ...state.externalContactTransactions,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
