import {
  GET_USER_INFO_START,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_BUSINESS_DATA,
} from 'constants/action-types/users/getUserInfo';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_USER_INFO_START:
      return {
        ...state,
        userData: {
          ...state.userData,
          loading: true,
          error: null,
        },
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        userData: {
          ...state.userData,
          error: payload,
          loading: false,
        },
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          error: null,
          loading: false,
          data: payload.data[0],
        },
      };

    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          error: null,
          loading: false,
          data: {
            ...state.userData.data,
            ...payload,
          },
        },
      };
    case UPDATE_USER_BUSINESS_DATA:
      return {
        ...state,
        userData: {
          ...state.userData,
          data: {
            ...state.userData.data,
            BusinessAccount: 'YES',
            BusinessExtraKYC: {
              ...state.userData.data.BusinessExtraKYC,
              ...payload?.BusinessExtraKYC,
            },
          },
        },
      };
    default:
      return null;
  }
};
