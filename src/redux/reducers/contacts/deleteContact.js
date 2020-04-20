import {
  DELETE_CONTACT_ERROR,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_START,
  CLEAR_DELETE_CONTACT,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_CONTACT_START:
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          loading: true,
          error: null,
        },
      };

    case DELETE_CONTACT_SUCCESS:
      if (payload.endpoint === '/DeleteContact') {
        return {
          ...state,
          deleteContact: {
            ...state.deleteContact,
            data: payload.data,
            loading: false,
            error: null,
          },

          allContacts: {
            ...state.allContacts,
            data: [
              ...state.allContacts.data.filter(
                contact =>
                  contact.ContactPID !== payload.contact.ContactData,
              ),
            ],
          },
          activeContacts: {
            ...state.activeContacts,
            data: [
              ...state.activeContacts.data.filter(contact => {
                return (
                  contact.ContactPID !== payload.contact.ContactData
                );
              }),
            ],
          },
        };
      }

      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          data: payload.data,
          loading: false,
          error: null,
        },

        externalContacts: {
          ...state.externalContacts,
          data: [
            ...state.externalContacts.data.filter(contact => {
              return (
                contact.PhoneNumber !==
                payload.contact.ContactPhoneNum
              );
            }),
          ],
        },
        activeContacts: {
          ...state.activeContacts,
          data: [
            ...state.activeContacts.data
              .filter(item => item && item.DestPhoneNum)
              .filter(contact => {
                return (
                  contact.DestPhoneNum !==
                  payload.contact.ContactPhoneNum
                );
              }),
          ],
        },
      };
    case DELETE_CONTACT_ERROR:
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          error: payload,
          loading: false,
        },
      };

    case CLEAR_DELETE_CONTACT:
      return {
        ...state,
        updateExternalContactImage: {
          ...state.deleteContact,
          error: null,
          data: null,
          loading: false,
        },
        deleteContact: {
          ...state.deleteContact,
          error: null,
          data: null,
          loading: false,
        },
      };
    default:
      return null;
  }
};
