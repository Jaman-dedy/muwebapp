import {
  SAVE_USER_DATA_START,
  SAVE_USER_DATA_FAILURE,
  SAVE_USER_DATA_SUCCESS,
  CLEAR_SAVE_USER_DATA,
} from 'constants/action-types/userAccountManagement/saveUserData';

export default (state, { type, payload }) => {
  switch (type) {
    case SAVE_USER_DATA_START:
      return {
        ...state,
        saveUserData: {
          ...state.saveUserData,
          loading: true,
          error: null,
        },
      };
    case SAVE_USER_DATA_FAILURE:
      return {
        ...state,
        saveUserData: {
          ...state.saveUserData,
          error: payload,
          loading: false,
        },
      };
    case CLEAR_SAVE_USER_DATA:
      return {
        ...state,
        saveUserData: {
          ...state.saveUserData,
          error: null,
          loading: false,
          success: false,
        },
      };
    case SAVE_USER_DATA_SUCCESS:
      return {
        ...state,
        saveUserData: {
          ...state.saveUserData,
          loading: false,
          error: null,
          success: true,
        },
      };
    default:
      return null;
  }
};
