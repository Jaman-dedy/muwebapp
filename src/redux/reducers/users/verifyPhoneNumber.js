import {
  VERIFY_PHONE_START,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_ERROR,
  CLEAR_PHONE_NUMBER,
} from 'constants/action-types/users/verifyPhoneNumber';

export default (state, { type, payload }) => {
  switch (type) {
    case VERIFY_PHONE_START:
      return {
        ...state,
        verifyPhoneNumber: {
          ...state.verifyPhoneNumber,
          loading: true,
          error: null,
        },
      };
    case VERIFY_PHONE_ERROR:
      return {
        ...state,
        verifyPhoneNumber: {
          ...state.verifyPhoneNumber,
          ...payload,
          loading: false,
        },
      };
    case VERIFY_PHONE_SUCCESS:
      return {
        ...state,
        verifyPhoneNumber: {
          ...state.verifyPhoneNumber,
          ...payload,
          loading: false,
        },
      };
    case CLEAR_PHONE_NUMBER:
      return {
        ...state,
        verifyPhoneNumber: {
          ...payload,
          loading: false,
        },
      };
    default:
      return null;
  }
};
