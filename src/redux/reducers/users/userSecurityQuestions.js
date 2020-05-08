import {
  SECURITY_QUESTION_START,
  SECURITY_QUESTION_SUCCESS,
  SECURITY_QUESTION_FAILURE,
} from 'constants/action-types/users/userSecurityQuestions';

export default (state, { type, payload }) => {
  switch (type) {
    case SECURITY_QUESTION_START:
      return {
        ...state,
        resetPasswordQuestions: {
          ...state.resetPasswordQuestions,
          loading: true,
          error: null,
        },
      };

    case SECURITY_QUESTION_FAILURE:
      return {
        ...state,
        resetPasswordQuestions: {
          ...state.resetPasswordQuestions,
          error: payload.error,
          loading: false,
        },
      };
    case SECURITY_QUESTION_SUCCESS:
      return {
        ...state,
        resetPasswordQuestions: {
          ...state.resetPasswordQuestions,
          ...payload,
          loading: false,
          Questions: payload.Questions,
          success: true,
          error: null,
        },
      };
    default:
      return null;
  }
};
