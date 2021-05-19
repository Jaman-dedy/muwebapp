import {
  UNLINK_BANK_FAILURE,
  UNLINK_BANK_SUCCESS,
  UNLINK_BANK_START,
  CLEAR_UNLINK_BANK,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

export default (state, { type, payload }) => {
  switch (type) {
    case UNLINK_BANK_START:
      return {
        ...state,
        unlinkAccount: {
          ...state.unlinkAccount,
          loading: true,
          error: null,
          success: false,
        },
      };
    case UNLINK_BANK_SUCCESS:
      return {
        ...state,
        unlinkAccount: {
          ...state.unlinkAccount,
          data: payload.data,
          loading: false,
          success: payload.success,
        },
      };
    case UNLINK_BANK_FAILURE:
      return {
        ...state,
        unlinkAccount: {
          ...state.unlinkAccount,
          loading: false,
          error: payload.error,
        },
      };

    case CLEAR_UNLINK_BANK:
      return {
        ...state,
        unlinkAccount: {
          ...state.unlinkAccount,
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
