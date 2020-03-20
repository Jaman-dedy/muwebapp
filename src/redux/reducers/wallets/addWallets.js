import {
  ADD_WALLET_START,
  ADD_WALLET_SUCCESS,
  ADD_WALLET_ERROR,
  ADD_WALLET_CLEAR,
} from 'constants/action-types/wallet/addWallet';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_WALLET_START:
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          error: null,
        },
      };
    case ADD_WALLET_SUCCESS:
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

    case ADD_WALLET_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          losding: false,
          error: payload,
        },
      };

    case ADD_WALLET_CLEAR:
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
    default:
      return null;
  }
};
