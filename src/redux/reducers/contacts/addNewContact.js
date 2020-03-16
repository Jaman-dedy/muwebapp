import {
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_SUCCESS,
  ADD_NEW_CONTACT_START,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_NEW_CONTACT_START:
      return {
        ...state,
        newContact: {
          ...state.newContact,
          loading: true,
          error: null,
        },
      };

    case ADD_NEW_CONTACT_SUCCESS:
      if (payload.endpoint === '/AddToContact') {
        return {
          ...state,
          newContact: {
            ...state.newContact,
            data: payload.data,
            loading: false,
            success: true,
          },

          allContacts: {
            ...state.allContacts,
            data: [...state.allContacts.data, payload.data[0]],
          },
        };
      }
      return {
        ...state,
        newContact: {
          ...state.newContact,
          data: payload.data,
          loading: false,
          success: true,
        },
        activeContacts: {
          ...state.activeContacts,
          data: [payload.contact, ...state.activeContacts.data],
        },
        externalContacts: {
          ...state.externalContacts,
          data: [...state.externalContacts.data, payload.contact],
        },
      };
    case ADD_NEW_CONTACT_ERROR:
      return {
        ...state,
        newContact: {
          ...state.newContact,
          error: payload,
          loading: false,
        },
      };
    default:
      return null;
  }
};
