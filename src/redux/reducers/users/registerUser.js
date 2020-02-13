import {
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
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
    default:
      return null;
  }
};
