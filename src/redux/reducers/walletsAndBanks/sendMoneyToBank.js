import {
  SEND_MONEY_TO_BANK_FAILURE,
  SEND_MONEY_TO_BANK_START,
  SEND_MONEY_TO_BANK_SUCCESS,
  CLEAR_SEND_MONEY_TO_BANK,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

export default (state, { type, payload }) => {
  switch (type) {
    case SEND_MONEY_TO_BANK_START:
      return {
        ...state,
        sendMoneyToBankAccount: {
          ...state.sendMoneyToBankAccount,
          error: null,
          loading: true,
          success: false,
        },
      };

    case SEND_MONEY_TO_BANK_SUCCESS:
      return {
        ...state,
        sendMoneyToBankAccount: {
          ...state.sendMoneyToBankAccount,
          loading: false,
          ...payload,
        },
      };
    case SEND_MONEY_TO_BANK_FAILURE:
      return {
        ...state,
        sendMoneyToBankAccount: {
          ...state.sendMoneyToBankAccount,
          error: payload.error,
          loading: false,
          success: false,
        },
      };
    case CLEAR_SEND_MONEY_TO_BANK:
      return {
        ...state,
        sendMoneyToBankAccount: {
          loading: false,
          success: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
