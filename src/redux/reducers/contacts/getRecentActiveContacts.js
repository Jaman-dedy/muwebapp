import {
  GET_RECENT_ACTIVE_CONTACTS_ERROR,
  GET_RECENT_ACTIVE_CONTACTS_SUCCESS,
  GET_RECENT_ACTIVE_CONTACTS_START,
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

    default:
      return null;
  }
};
