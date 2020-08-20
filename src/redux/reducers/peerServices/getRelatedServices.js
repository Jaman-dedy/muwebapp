import {
  GET_RELATED_SERVICES_START,
  GET_RELATED_SERVICES_SUCCESS,
  GET_RELATED_SERVICES_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_RELATED_SERVICES_START:
      return {
        ...state,
        relatedServices: {
          ...state.relatedServices,
          loading: true,
          error: null,
        },
      };
    case GET_RELATED_SERVICES_ERROR:
      return {
        ...state,
        relatedServices: {
          ...state.relatedServices,
          error: payload,
          loading: false,
        },
      };
    case GET_RELATED_SERVICES_SUCCESS:
      return {
        ...state,
        relatedServices: {
          ...state.relatedServices,
          error: null,
          loading: false,
          data: payload.data,
          service: payload.service,
        },
      };

    default:
      return null;
  }
};
