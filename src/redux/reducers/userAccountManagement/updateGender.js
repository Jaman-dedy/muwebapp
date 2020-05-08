import {
  UPDATE_GENDER_START,
  UPDATE_GENDER_SUCCESS,
  UPDATE_GENDER_FAILURE,
  CLEAR_UPDATE_GENDER,
} from 'constants/action-types/userAccountManagement/updateGender';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_GENDER_START:
      return {
        ...state,
        updateGender: {
          ...state.updateGender,
          loading: true,
          error: null,
        },
      };
    case UPDATE_GENDER_FAILURE:
      return {
        ...state,
        updateGender: {
          ...state.updateGender,
          error: payload,
          loading: false,
        },
      };
    case CLEAR_UPDATE_GENDER:
      return {
        ...state,
        updateGender: {
          ...state.updateGender,
          error: null,
          loading: false,
          success: false,
        },
      };
    case UPDATE_GENDER_SUCCESS:
      return {
        ...state,
        updateGender: {
          ...state.updateGender,
          ...payload,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
