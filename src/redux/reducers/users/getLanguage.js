import {
  GET_LANGUAGE_START,
  GET_LANGUAGE_FAILURE,
  GET_LANGUAGE_SUCCESS,
} from 'constants/action-types/users/language';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_LANGUAGE_START:
      return {
        ...state,
        language: {
          ...state.language,
          loading: true,
          error: null,
        },
      };
    case GET_LANGUAGE_FAILURE:
      return {
        ...state,
        language: {
          ...state.language,
          error: payload,
          loading: false,
        },
      };
    case GET_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: {
          ...state.language,
          ...payload,
          error: null,
          loading: false,
        },
      };
    default:
      return null;
  }
};
