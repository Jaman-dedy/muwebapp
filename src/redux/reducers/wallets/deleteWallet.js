/* import {
  DELETE_WALLET_START,
  DELETE_WALLET_SUCCESS,
  DELETE_WALLET_ERROR,
  DELETE_WALLET_CLEAR,
  DELETE_WALLET_END,
} from 'constants/action-types/users/deleteWallet';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_WALLET_START:
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          error: null,
        },
      };
    case DELETE_WALLET_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case DELETE_WALLET_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          error: payload,
        },
      };

    case DELETE_WALLET_CLEAR:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          Name: '',
          Currency: '',
          success: false,
          error: null,
        },
      };
    case DELETE_WALLET_END:
      return {
        ...state.create,
        success: false,
        error: null,
      };
    default:
      return null;
  }
};
 */
