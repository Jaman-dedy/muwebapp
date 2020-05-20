import {
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  RESTORE_REGISTER_USER,
} from 'constants/action-types/users/registerUser';

export default (state, { type, payload }) => {
  switch (type) {
    case REGISTER_USER_START:
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          loading: true,
        },
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          error: payload.error,
          loading: false,
        },
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          ...payload,
          loading: false,
        },
      };
    case RESTORE_REGISTER_USER:
      return {
        ...state,
        registerUser: {
          error: null,
          loading: false,
          success: false,
          message: '',
          Wallets: [
            {
              WalletNumber: '',
              CurrencyCode: '',
              Flag: '',
            },
          ],
        },
      };
    default:
      return null;
  }
};
