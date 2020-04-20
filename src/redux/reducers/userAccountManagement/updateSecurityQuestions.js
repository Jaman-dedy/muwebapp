import {
  UPDATE_SECURITY_QUESTIONS_START,
  UPDATE_SECURITY_QUESTIONS_SUCCESS,
  UPDATE_SECURITY_QUESTIONS_FAILURE,
  CLEAR_UPDATE_SECURITY_QUESTIONS,
} from 'constants/action-types/userAccountManagement/updateSecurityQuestions';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_SECURITY_QUESTIONS_START:
      return {
        ...state,
        updateSecurityQuestions: {
          ...state.updateSecurityQuestions,
          loading: true,
          error: null,
        },
      };
    case UPDATE_SECURITY_QUESTIONS_FAILURE:
      return {
        ...state,
        updateSecurityQuestions: {
          ...state.updateSecurityQuestions,
          error: payload,
          loading: false,
        },
      };
    case CLEAR_UPDATE_SECURITY_QUESTIONS:
      return {
        ...state,
        updateSecurityQuestions: {
          ...state.updateSecurityQuestions,
          error: null,
          loading: false,
          success: false,
        },
      };
    case UPDATE_SECURITY_QUESTIONS_SUCCESS:
      return {
        ...state,
        updateSecurityQuestions: {
          ...state.updateSecurityQuestions,
          ...payload,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
