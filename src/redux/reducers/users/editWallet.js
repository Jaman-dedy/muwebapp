import {
  EDIT_WALLET_START,
  EDIT_WALLET_SUCCESS,
  EDIT_WALLET_ERROR,
  EDIT_WALLET_CLEAR,
  EDIT_WALLET_END,
} from 'constants/action-types/users/editWallet';

export default (state, { type, payload }) => {
  switch (type) {
    case EDIT_WALLET_START:
      return {
        ...state,
        editWallet: {
          ...state.editWallet,
          loading: true,
          error: null,
        },
      };
    case EDIT_WALLET_SUCCESS:
      return {
        ...state,
        editWallet: {
          ...state.editWallet,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case EDIT_WALLET_ERROR:
      return {
        ...state,
        editWallet: {
          ...state.editWallet,
          loading: false,
          error: payload,
        },
      };

    case EDIT_WALLET_CLEAR:
      return {
        ...state,
        editWallet: {
          ...state.editWallet,
          loading: false,
          Name: '',
          Currency: '',
          success: false,
          error: null,
        },
        setAsDefault: {
          ...state.setAsDefault,
          loading: false,
          success: false,
          error: null,
        },
      };

    case EDIT_WALLET_END:
      return {
        ...state.editWallet,
        success: false,
        error: null,
      };
    default:
      return null;
  }
};
