import {
  GET_USER_DATA_START,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
} from 'constants/action-types/users/getUserData';
import { UPDATE_USER_EMAIL_LIST } from 'constants/action-types/userAccountManagement/updateUserEmailList';
import { UPDATE_USER_PHONE_LIST } from 'constants/action-types/userAccountManagement/updateUserPhoneList';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_USER_DATA_START:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          error: null,
        },
      };
    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          error: payload,
          loading: false,
        },
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          data: {
            ...state.currentUser.data,
            ...payload,
          },
        },
      };
    case UPDATE_USER_EMAIL_LIST:
      return {
        ...state,
        userData: {
          ...state.userData,
          loading: false,
          data: {
            ...state.userData.data,
            Emails: payload.data,
          },
        },
      };
    case UPDATE_USER_PHONE_LIST:
      return {
        ...state,
        userData: {
          ...state.userData,
          loading: false,
          data: {
            ...state.userData.data,
            Phones: payload.Phones,
          },
        },
      };
    default:
      return null;
  }
};
