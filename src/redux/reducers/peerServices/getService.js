import {
  GET_SERVICE_START,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_SERVICE_START:
      return {
        ...state,
        service: {
          ...state.service,
          loading: true,
          error: null,
        },
      };

    case GET_SERVICE_ERROR:
      return {
        ...state,
        service: {
          ...state.service,
          error: payload,
          loading: false,
        },
      };
    case GET_SERVICE_SUCCESS:
      return {
        ...state,
        service: {
          ...state.service,
          error: null,
          loading: false,
          data: payload,
        },
      };

    default:
      return null;
  }
};
