import {
  LOCATE_USER_START,
  LOCATE_USER_SUCCESS,
  LOCATE_USER_ERROR,
  CLEAR_FOUND_USER,
} from 'constants/action-types/users/locateUser';

export default (state, { type, payload }) => {
  switch (type) {
    case LOCATE_USER_START:
      return {
        ...state,
        locateUser: {
          ...state.locateUser,
          loading: true,
          error: null,
        },
      };

    case CLEAR_FOUND_USER:
      return {
        ...state,
        newContact: {
          error: null,
          data: null,
          loading: false,
          success: null,
        },
        locateUser: {
          ...state.locateUser,
          error: null,
          data: null,
          loading: false,
        },
      };
    case LOCATE_USER_ERROR:
      return {
        ...state,
        locateUser: {
          ...state.locateUser,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case LOCATE_USER_SUCCESS:
      return {
        ...state,
        locateUser: {
          ...state.locateUser,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
