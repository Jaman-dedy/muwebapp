import {
  DELETE_PHONE_START,
  DELETE_PHONE_SUCCESS,
  DELETE_PHONE_FAILURE,
  CLEAR_DELETE_PHONE,
} from 'constants/action-types/userAccountManagement/updateUserPhoneList';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_PHONE_START:
      return {
        ...state,
        deletePhone: {
          ...state.deletePhone,
          loading: true,
          error: null,
          success: false,
        },
      };
    case DELETE_PHONE_SUCCESS:
      return {
        ...state,
        deletePhone: {
          ...state.deletePhone,
          ...payload,
          success: true,
          loading: false,
        },
      };
    case DELETE_PHONE_FAILURE:
      return {
        ...state,
        deletePhone: {
          ...state.deletePhone,
          error: payload,
          loading: false,
          success: false,
        },
      };
    case CLEAR_DELETE_PHONE:
      return {
        ...state,
        deletePhone: {
          ...state.deletePhone,
          loading: false,
          error: null,
          success: false,
        },
      };
    default:
      return null;
  }
};
