import {
  UPDATE_USER_EMAIL_LIST_START,
  UPDATE_USER_EMAIL_LIST_SUCCESS,
  UPDATE_USER_EMAIL_LIST_FAILURE,
  CLEAR_UPDATE_USER_EMAIL_LIST,
} from 'constants/action-types/userAccountManagement/updateUserEmailList';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_EMAIL_LIST_START:
      return {
        ...state,
        updateUserEmailList: {
          ...state.updateUserEmailList,
          loading: true,
          error: null,
        },
      };
    case UPDATE_USER_EMAIL_LIST_FAILURE:
      return {
        ...state,
        updateUserEmailList: {
          ...state.updateUserEmailList,
          error: payload,
          loading: false,
        },
      };
    case CLEAR_UPDATE_USER_EMAIL_LIST:
      return {
        ...state,
        updateUserEmailList: {
          ...state.updateUserEmailList,
          error: null,
          loading: false,
          success: false,
        },
      };
    case UPDATE_USER_EMAIL_LIST_SUCCESS:
      return {
        ...state,
        updateUserEmailList: {
          ...state.updateUserEmailList,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };
    default:
      return null;
  }
};
