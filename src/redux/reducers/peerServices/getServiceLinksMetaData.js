import {
  GET_SERVICE_LINK_PREVIEW_ERROR,
  GET_SERVICE_LINK_PREVIEW_START,
  GET_SERVICE_LINK_PREVIEW_SUCCESS,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_SERVICE_LINK_PREVIEW_START:
      return {
        ...state,
        serviceLinkMetaData: {
          ...state.serviceLinkMetaData,
          serviceId: payload,
        },
      };
    case GET_SERVICE_LINK_PREVIEW_SUCCESS:
      return {
        ...state,
        serviceLinkMetaData: {
          ...state.serviceLinkMetaData,
          data: payload,
        },
      };
    case GET_SERVICE_LINK_PREVIEW_ERROR:
      return {
        ...state,
        serviceLinkMetaData: {
          ...state.serviceLinkMetaData,
          data: payload,
        },
      };
    default:
      return null;
  }
};
