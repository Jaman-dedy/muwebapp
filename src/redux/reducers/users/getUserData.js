import {
  GET_USER_DATA_START,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
} from 'constants/action-types/users/getUserData';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_USER_DATA_START:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          error: null,
        },
      };
    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          error: payload,
          loading: false,
        },
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          data: {
            ...state.currentUser.data,
            ...payload,
          },
        },
      };
    default:
      return null;
  }
};
