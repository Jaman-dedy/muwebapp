import {
  GET_RECENT_ACTIVE_CONTACTS_ERROR,
  GET_RECENT_ACTIVE_CONTACTS_SUCCESS,
  GET_RECENT_ACTIVE_CONTACTS_START,
  ADD_CONTACT_TO_RECENTS,
} from 'constants/action-types/contacts/getLastActiveContacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_RECENT_ACTIVE_CONTACTS_START:
      return {
        ...state,
        activeContacts: {
          ...state.activeContacts,
          loading: true,
          error: null,
        },
      };
    case GET_RECENT_ACTIVE_CONTACTS_ERROR:
      return {
        ...state,
        activeContacts: {
          ...state.activeContacts,
          error: payload,
          loading: false,
        },
      };
    case GET_RECENT_ACTIVE_CONTACTS_SUCCESS:
      return {
        ...state,
        activeContacts: {
          ...state.activeContacts,
          error: null,
          loading: false,
          data: payload,
        },
      };

    case ADD_CONTACT_TO_RECENTS:
      return {
        ...state,
        activeContacts: {
          ...state.activeContacts,
          data: [payload, ...state.activeContacts.data],
        },
      };
    default:
      return null;
  }
};
