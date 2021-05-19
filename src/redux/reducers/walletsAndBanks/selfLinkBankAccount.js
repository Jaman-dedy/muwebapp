import {
  SELF_LINK_BANK_ACCOUNT_FAILURE,
  SELF_LINK_BANK_ACCOUNT_START,
  SELF_LINK_BANK_ACCOUNT_SUCCESS,
  CLEAR_SELF_LINK_BANK,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

export default (state, { type, payload }) => {
  switch (type) {
    case SELF_LINK_BANK_ACCOUNT_START:
      return {
        ...state,
        selfLinkBankAccount: {
          ...state.selfLinkBankAccount,
          loading: true,
          error: null,
          success: false,
        },
      };
    case SELF_LINK_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        selfLinkBankAccount: {
          ...state.selfLinkBankAccount,
          data: payload.data,
          loading: false,
          success: payload.success,
        },
      };
    case SELF_LINK_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        selfLinkBankAccount: {
          ...state.selfLinkBankAccount,
          error: payload.error,
          loading: false,
          success: false,
        },
      };
    case CLEAR_SELF_LINK_BANK:
      return {
        ...state,
        selfLinkBankAccount: {
          ...state.selfLinkBankAccount,
          data: {},
          loading: false,
          error: null,
          success: false,
        },
      };

    default:
      return null;
  }
};
