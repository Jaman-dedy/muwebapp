import {
  UPDATE_PIN_START,
  UPDATE_PIN_SUCCESS,
  UPDATE_PIN_FAILURE,
  CLEAR_UPDATE_PIN,
} from 'constants/action-types/userAccountManagement/updatePIN';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_PIN_START:
      return {
        ...state,
        updatePIN: {
          ...state.updatePIN,
          loading: true,
          error: null,
        },
      };
    case UPDATE_PIN_FAILURE:
      return {
        ...state,
        updatePIN: {
          ...state.updatePIN,
          error: payload,
          loading: false,
        },
      };
    case CLEAR_UPDATE_PIN:
      return {
        ...state,
        updatePIN: {
          ...state.updatePIN,
          error: null,
          loading: false,
          success: false,
        },
      };
    case UPDATE_PIN_SUCCESS:
      return {
        ...state,
        updatePIN: {
          ...state.updatePIN,
          ...payload,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
