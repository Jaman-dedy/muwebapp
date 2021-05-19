import {
  LINK_BANK_ACCOUNT_REQUEST_FAILURE,
  LINK_BANK_ACCOUNT_REQUEST_START,
  LINK_BANK_ACCOUNT_REQUEST_SUCCESS,
  CLEAR_LINK_ACCOUNT_REQUEST,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

export default (state, { type, payload }) => {
  switch (type) {
    case LINK_BANK_ACCOUNT_REQUEST_START:
      return {
        ...state,
        linkBankAccountRequest: {
          ...state.linkBankAccountRequest,
          loading: true,
          error: null,
          success: false,
        },
      };
    case LINK_BANK_ACCOUNT_REQUEST_SUCCESS:
      return {
        ...state,
        linkBankAccountRequest: {
          ...state.linkBankAccountRequest,
          data: payload.data,
          loading: false,
          success: payload?.success,
        },
      };
    case LINK_BANK_ACCOUNT_REQUEST_FAILURE:
      return {
        ...state,
        linkBankAccountRequest: {
          ...state.linkBankAccountRequest,
          loading: false,
          error: payload.error,
          success: false,
        },
      };
    case CLEAR_LINK_ACCOUNT_REQUEST:
      return {
        ...state,
        linkBankAccountRequest: {
          ...state.linkBankAccountRequest,
          loading: false,
          success: false,
          data: {},
          error: null,
        },
      };
    default:
      return null;
  }
};
