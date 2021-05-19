import {
  ADD_MONEY_TO_WALLET_FAILURE,
  ADD_MONEY_TO_WALLET_START,
  ADD_MONEY_TO_WALLET_SUCCESS,
  CLEAR_ADD_MONEY_TO_WALLET,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_MONEY_TO_WALLET_START:
      return {
        ...state,
        addMoneyToWallet: {
          ...state.addMoneyToWallet,
          error: null,
          loading: true,
          success: false,
        },
      };

    case ADD_MONEY_TO_WALLET_SUCCESS:
      return {
        ...state,
        addMoneyToWallet: {
          ...state.addMoneyToWallet,
          loading: false,
          ...payload,
        },
      };
    case ADD_MONEY_TO_WALLET_FAILURE:
      return {
        ...state,
        addMoneyToWallet: {
          ...state.addMoneyToWallet,
          error: payload.error,
          loading: false,
          success: false,
        },
      };
    case CLEAR_ADD_MONEY_TO_WALLET:
      return {
        ...state,
        addMoneyToWallet: {
          ...state.addMoneyToWallet,
          error: null,
          loading: false,
          success: false,
        },
      };
    default:
      return null;
  }
};
