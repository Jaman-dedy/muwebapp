import {
  UPDATE_CONTACT_PICTURE_START,
  UPDATE_CONTACT_PICTURE_SUCCESS,
  UPDATE_CONTACT_PICTURE_ERROR,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_CONTACT_PICTURE_START:
      return {
        ...state,
        updateExternalContactImage: {
          ...state.updateExternalContactImage,
          loading: true,
          error: null,
        },
      };
    case UPDATE_CONTACT_PICTURE_ERROR:
      return {
        ...state,
        updateExternalContactImage: {
          ...state.updateExternalContactImage,
          error: payload,
          loading: false,
        },
      };
    case UPDATE_CONTACT_PICTURE_SUCCESS:
      return {
        ...state,
        updateExternalContactImage: {
          ...state.updateExternalContactImage,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
