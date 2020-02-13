import {
  VERIFY_PID_START,
  VERIFY_PID_SUCCESS,
  VERIFY_PID_ERROR,
} from 'constants/action-types/users/verifyPID';

export default (state, { type, payload }) => {
  switch (type) {
    case VERIFY_PID_START:
      return {
        ...state,
        verifyPID: {
          ...state.verifyPID,
          loading: true,
          error: null,
        },
      };
    case VERIFY_PID_ERROR:
      return {
        ...state,
        verifyPID: {
          ...state.verifyPID,
          error: payload,
          loading: false,
        },
      };
    case VERIFY_PID_SUCCESS:
      return {
        ...state,
        verifyPID: {
          ...state.verifyPID,
          ...payload,
          loading: false,
        },
      };
    default:
      return null;
  }
};
