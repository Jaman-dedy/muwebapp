import {
  LINK_BANK_ACCOUNT_FAILURE,
  LINK_BANK_ACCOUNT_START,
  LINK_BANK_ACCOUNT_SUCCESS,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

export default (state, { type, payload }) => {
  switch (type) {
    case LINK_BANK_ACCOUNT_START:
      return {
        ...state,
        linkBankAccount: {
          ...state.linkBankAccount,
          loading: true,
          error: null,
          success: false,
        },
      };
    case LINK_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        linkBankAccount: {
          ...state.linkBankAccount,
          data: payload.data,
          loading: false,
          success: payload?.success,
        },
      };
    case LINK_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        linkBankAccount: {
          ...state.linkBankAccount,
          loading: false,
          error: payload.error,
          success: false,
        },
      };

    default:
      return null;
  }
};
