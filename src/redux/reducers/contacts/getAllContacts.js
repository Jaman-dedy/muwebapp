import {
  GET_CONTACT_LIST_START,
  GET_CONTACT_LIST_SUCCESS,
  GET_CONTACT_LIST_ERROR,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_CONTACT_LIST_START:
      return {
        ...state,
        allContacts: {
          ...state.allContacts,
          loading: true,
          error: null,
        },
      };
    case GET_CONTACT_LIST_ERROR:
      return {
        ...state,
        allContacts: {
          ...state.allContacts,
          error: payload,
          loading: false,
        },
      };
    case GET_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        allContacts: {
          ...state.allContacts,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
