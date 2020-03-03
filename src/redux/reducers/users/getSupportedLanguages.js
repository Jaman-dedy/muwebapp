import {
  GET_SUPPORTED_LANGUAGE_START,
  GET_SUPPORTED_LANGUAGE_FAILURE,
  GET_SUPPORTED_LANGUAGE_SUCCESS,
} from 'constants/action-types/users/language';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_SUPPORTED_LANGUAGE_START:
      return {
        ...state,
        language: {
          ...state.language,
          supported: {
            ...state.language.supported,
            error: null,
            loading: true,
          },
        },
      };
    case GET_SUPPORTED_LANGUAGE_FAILURE:
      return {
        ...state,
        language: {
          ...state.language,
          supported: {
            ...state.language.supported,
            loading: false,
          },
        },
      };
    case GET_SUPPORTED_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: {
          ...state.language,
          supported: {
            ...state.language.supported,
            data: payload,
            error: null,
            loading: false,
          },
        },
      };
    default:
      return null;
  }
};
