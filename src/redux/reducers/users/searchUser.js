import {
  SEARCH_USER_START,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_END,
} from 'constants/action-types/users/searchUser';

export default (state, { type, payload }) => {
  switch (type) {
    case SEARCH_USER_START:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          error: null,
          data: {},
          message: '',
        },
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
          loading: false,
          error: null,
        },
      };
    case SEARCH_USER_FAILURE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
          loading: false,
          data: {},
        },
      };
    case SEARCH_USER_END:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
        },
      };
    default:
      return null;
  }
};
