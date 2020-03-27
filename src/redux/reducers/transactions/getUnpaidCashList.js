import {
  GET_UNPAID_CASH_LIST_START,
  GET_UNPAID_CASH_LIST_SUCCESS,
  GET_UNPAID_CASH_LIST_ERROR,
} from 'constants/action-types/transactions/getUnpaidCashList';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_UNPAID_CASH_LIST_START:
      return {
        ...state,
        unPaidCashList: {
          ...state.unPaidCashList,
          loading: true,
          error: null,
        },
      };
    case GET_UNPAID_CASH_LIST_ERROR:
      return {
        ...state,
        unPaidCashList: {
          ...state.unPaidCashList,
          error: payload,
          loading: false,
        },
      };
    case GET_UNPAID_CASH_LIST_SUCCESS:
      return {
        ...state,
        unPaidCashList: {
          ...state.unPaidCashList,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
