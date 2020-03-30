import {
  GET_INTERNAL_CONTACTS_START,
  GET_INTERNAL_CONTACTS_SUCCESS,
  GET_INTERNAL_CONTACTS_ERROR,
  GET_INTERNAL_CONTACTS_CLEAR,
} from 'constants/action-types/vouchers/internalContacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_INTERNAL_CONTACTS_START:
      return {
        ...state,
        internalContacts: {
          ...state.create,
          loading: true,
          error: null,
        },
      };
    case GET_INTERNAL_CONTACTS_SUCCESS:
      return {
        ...state,
        internalContacts: {
          ...state.create,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case GET_INTERNAL_CONTACTS_ERROR:
      return {
        ...state,
        internalContacts: {
          ...state.create,
          loading: false,
          error: payload,
        },
      };

    case GET_INTERNAL_CONTACTS_CLEAR:
      return {
        ...state,
        internalContacts: {
          ...state.create,
          loading: false,
          success: false,
        },
      };
    default:
      return null;
  }
};
