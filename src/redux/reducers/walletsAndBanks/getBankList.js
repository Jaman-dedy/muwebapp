import {
  GET_BANK_LIST_FAILURE,
  GET_BANK_LIST_START,
  GET_BANK_LIST_SUCCESS,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_BANK_LIST_START:
      return {
        ...state,
        bankList: {
          ...state.bankList,
          data: [],
          loading: true,
          error: null,
        },
      };
    case GET_BANK_LIST_SUCCESS:
      return {
        ...state,
        bankList: {
          ...state.bankList,
          data: payload.data,
          loading: false,
        },
      };
    case GET_BANK_LIST_FAILURE:
      return {
        ...state,
        bankList: {
          ...state.bankList,
          loading: false,
          error: payload.error,
        },
      };
    default:
      return null;
  }
};
