import {
  GET_MY_SERVICES_START,
  GET_MY_SERVICES_SUCCESS,
  GET_MY_SERVICES_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_MY_SERVICES_START:
      return {
        ...state,
        myServices: {
          ...state.myServices,
          loading: true,
          error: null,
        },
      };
    case GET_MY_SERVICES_ERROR:
      return {
        ...state,
        myServices: {
          ...state.myServices,
          error: payload,
          loading: false,
        },
      };
    case GET_MY_SERVICES_SUCCESS:
      return {
        ...state,
        myServices: {
          ...state.myServices,
          error: null,
          loading: false,
          data: payload,
        },
      };

    default:
      return null;
  }
};
