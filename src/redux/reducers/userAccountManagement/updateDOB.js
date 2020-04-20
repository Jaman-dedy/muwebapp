import {
  UPDATE_DOB_START,
  UPDATE_DOB_SUCCESS,
  UPDATE_DOB_FAILURE,
  CLEAR_UPDATE_DOB,
} from 'constants/action-types/userAccountManagement/updateDOB';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_DOB_START:
      return {
        ...state,
        updateDOB: {
          ...state.updateDOB,
          loading: true,
          error: null,
        },
      };
    case UPDATE_DOB_FAILURE:
      return {
        ...state,
        updateDOB: {
          ...state.updateDOB,
          error: payload,
          loading: false,
        },
      };
    case CLEAR_UPDATE_DOB:
      return {
        ...state,
        updateDOB: {
          ...state.updateDOB,
          error: null,
          loading: false,
          success: false,
        },
      };
    case UPDATE_DOB_SUCCESS:
      return {
        ...state,
        updateDOB: {
          ...state.updateDOB,
          ...payload,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
