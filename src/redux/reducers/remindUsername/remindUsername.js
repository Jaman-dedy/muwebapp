import {
  REMIND_USERNAME_START,
  REMIND_USERNAME_SUCCESS,
  REMIND_USERNAME_ERROR,
  CLEAR_REMIND_USERNAME_STORE,
} from 'constants/action-types/remindUsername';

export default (state, { type, payload }) => {
  switch (type) {
    case REMIND_USERNAME_START:
      return {
        ...state,
        remindUsername: {
          ...state.remindUsername,
          loading: true,
          success: false,
          OK: '',
        },
      };
    case REMIND_USERNAME_ERROR:
      return {
        ...state,
        remindUsername: {
          ...state.remindUsername,
          error: payload,
          loading: false,
        },
      };
    case REMIND_USERNAME_SUCCESS:
      return {
        ...state,
        remindUsername: {
          ...state.remindUsername,
          data: payload,
          loading: false,
          error: null,
        },
      };
    case CLEAR_REMIND_USERNAME_STORE:
      return {
        ...state,
        remindUsername: {
          ...payload,
          loading: false,
          error: null,
          success: false,
          OK: '',
        },
      };
    default:
      return null;
  }
};
