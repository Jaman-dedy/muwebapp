import {
  GET_EXTERNAL_CONTACTS_START,
  GET_EXTERNAL_CONTACTS_SUCCESS,
  GET_EXTERNAL_CONTACTS_ERROR,
  GET_EXTERNAL_CONTACTS_CLEAR,
} from 'constants/action-types/vouchers/externalContacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_EXTERNAL_CONTACTS_START:
      return {
        ...state,
        externalContacts: {
          ...state.create,
          loading: true,
          error: null,
        },
      };
    case GET_EXTERNAL_CONTACTS_SUCCESS:
      return {
        ...state,
        externalContacts: {
          ...state.create,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case GET_EXTERNAL_CONTACTS_ERROR:
      return {
        ...state,
        externalContacts: {
          ...state.create,
          loading: false,
          error: payload,
        },
      };

    case GET_EXTERNAL_CONTACTS_CLEAR:
      return {
        ...state,
        externalContacts: {
          ...state.create,
          loading: false,
          success: false,
        },
      };
    default:
      return null;
  }
};
