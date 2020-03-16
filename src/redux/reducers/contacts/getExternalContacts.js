import {
  GET_EXTERNAL_CONTACT_LIST_START,
  GET_EXTERNAL_CONTACT_LIST_SUCCESS,
  GET_EXTERNAL_CONTACT_LIST_ERROR,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_EXTERNAL_CONTACT_LIST_START:
      return {
        ...state,
        externalContacts: {
          ...state.externalContacts,
          loading: true,
          error: null,
        },
      };
    case GET_EXTERNAL_CONTACT_LIST_ERROR:
      return {
        ...state,
        externalContacts: {
          ...state.externalContacts,
          error: payload,
          loading: false,
        },
      };
    case GET_EXTERNAL_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        externalContacts: {
          ...state.externalContacts,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
