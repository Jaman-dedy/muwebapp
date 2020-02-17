import {
  GET_USER_LOCATION_DATA_START,
  GET_USER_LOCATION_DATA_SUCCESS,
  GET_USER_LOCATION_DATA_ERROR,
} from 'constants/action-types/users/userLocationData';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_USER_LOCATION_DATA_START:
      return {
        ...state,
        userLocationData: {
          ...state.userLocationData,
          loading: true,
        },
      };
    case GET_USER_LOCATION_DATA_ERROR:
      return {
        ...state,
        userLocationData: {
          ...state.userLocationData,
          error: payload.error,
          loading: false,
        },
      };
    case GET_USER_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        userLocationData: {
          ...state.userLocationData,
          ...payload,
          loading: false,
        },
      };
    default:
      return null;
  }
};
