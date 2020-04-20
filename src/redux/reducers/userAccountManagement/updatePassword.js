import {
  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  CLEAR_UPDATE_PASSWORD,
} from 'constants/action-types/userAccountManagement/updatePassword';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_PASSWORD_START:
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          loading: true,
          error: null,
        },
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          error: payload,
          loading: false,
        },
      };
    case CLEAR_UPDATE_PASSWORD:
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          error: null,
          loading: false,
          success: false,
        },
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          ...payload,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
