/* eslint-disable no-case-declarations */
import {
  SAVE_USER_ID_START,
  SAVE_USER_ID_SUCCESS,
  SAVE_USER_ID_ERROR,
  CLEAR_SAVE_USER_ID_STORE,
} from 'constants/action-types/users/saveUserIdData';

export default (state, { type, payload }) => {
  switch (type) {
    case SAVE_USER_ID_START:
      return {
        ...state,
        userIdData: {
          ...state.userIdData,
          loading: true,
          success: false,
          error: null,
        },
      };
    case SAVE_USER_ID_ERROR:
      return {
        ...state,
        userIdData: {
          ...state.userIdData,
          error: payload,
          loading: false,
        },
      };

    case SAVE_USER_ID_SUCCESS:
      const { DateIssue, ...data } = payload || {};
      return {
        ...state,
        userIdData: {
          ...state.userIdData,
          data: payload,
          loading: false,
          error: null,
        },
        userData: {
          data: {
            ...state.userData.data,
            IDCardInfo: {
              ...state.userData.data.IDCardInfo,
              ...data,
              IssueDate: DateIssue,
            },
          },
        },
      };

    case CLEAR_SAVE_USER_ID_STORE:
      return {
        ...state,
        userIdData: {
          loading: false,
          error: null,
          success: false,
          OK: '',
        },
      };
    default:
      return null;
  }
};
