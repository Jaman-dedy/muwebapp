import {
  GET_ACTIVE_EXTERNAL_CONTACTS_ERROR,
  GET_ACTIVE_EXTERNAL_CONTACTS_SUCCESS,
  GET_ACTIVE_EXTERNAL_CONTACTS_START,
} from 'constants/action-types/contacts/getLastActiveContacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_ACTIVE_EXTERNAL_CONTACTS_START:
      return {
        ...state,
        activeExternalContacts: {
          ...state.activeExternalContacts,
          loading: true,
          error: null,
        },
      };
    case GET_ACTIVE_EXTERNAL_CONTACTS_ERROR:
      return {
        ...state,
        activeExternalContacts: {
          ...state.activeExternalContacts,
          error: payload,
          loading: false,
        },
      };
    case GET_ACTIVE_EXTERNAL_CONTACTS_SUCCESS:
      return {
        ...state,
        activeExternalContacts: {
          ...state.activeExternalContacts,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
