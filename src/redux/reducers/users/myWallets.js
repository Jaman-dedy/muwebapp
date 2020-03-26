import {
  GET_MY_WALLETS_START,
  GET_MY_WALLETS_SUCCESS,
  GET_MY_WALLETS_ERROR,
} from 'constants/action-types/users/getMyWallets';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_MY_WALLETS_START:
      return {
        ...state,
        myWallets: {
          ...state.myWallets,
          loading: true,
        },
      };
    case GET_MY_WALLETS_ERROR:
      return {
        ...state,
        myWallets: {
          ...state.myWallets,
          error: payload.error,
          loading: false,
        },
      };
    case GET_MY_WALLETS_SUCCESS:
      return {
        ...state,
        myWallets: {
          ...state.myWallets,
          ...payload,
          success: true,
          loading: false,
        },
      };

    default:
      return null;
  }
};
