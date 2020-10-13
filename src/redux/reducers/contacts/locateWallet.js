import {
  LOCATE_WALLET_START,
  LOCATE_WALLET_SUCCESS,
  LOCATE_WALLET_ERROR,
  CLEAR_FOUND_WALLET,
} from 'constants/action-types/users/locateWallet';

export default (state, { type, payload }) => {
  switch (type) {
    case LOCATE_WALLET_START:
      return {
        ...state,
        locateWallet: {
          ...state.locateWallet,
          loading: true,
          error: null,
        },
      };

    case CLEAR_FOUND_WALLET:
      return {
        ...state,
        newContact: {
          error: null,
          data: null,
          loading: false,
          success: null,
        },
        locateWallet: {
          ...state.locateWallet,
          error: null,
          data: null,
          loading: false,
        },
      };
    case LOCATE_WALLET_ERROR:
      return {
        ...state,
        locateWallet: {
          ...state.locateWallet,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case LOCATE_WALLET_SUCCESS:
      return {
        ...state,
        locateWallet: {
          ...state.locateWallet,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
