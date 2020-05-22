import {
  GET_FAVORITES_LIST_START,
  GET_FAVORITES_LIST_SUCCESS,
  GET_FAVORITES_LIST_ERROR,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_FAVORITES_LIST_START:
      return {
        ...state,
        favoriteContacts: {
          ...state.favoriteContacts,
          loading: true,
          error: null,
        },
      };
    case GET_FAVORITES_LIST_ERROR:
      return {
        ...state,
        favoriteContacts: {
          ...state.favoriteContacts,
          error: payload,
          loading: false,
        },
      };
    case GET_FAVORITES_LIST_SUCCESS:
      return {
        ...state,
        favoriteContacts: {
          ...state.favoriteContacts,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
