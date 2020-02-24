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
      return {
        ...state,
        newContact: {
          ...state.newContact,
          data: payload,
          loading: false,
          success: true,
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
