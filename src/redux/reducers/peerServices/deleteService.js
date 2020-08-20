import {
  DELETE_SERVICE_START,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_SERVICE_START:
      return {
        ...state,
        deleteService: {
          ...state.deleteService,
          loading: true,
          error: null,
        },
      };
    case DELETE_SERVICE_ERROR:
      return {
        ...state,
        deleteService: {
          ...state.deleteService,
          error: payload,
          loading: false,
        },
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        deleteService: {
          ...state.deleteService,
          error: null,
          loading: false,
          data: payload,
        },
        servicesList: {
          ...state.servicesList,
          data: {
            ...state.servicesList.data,
            Data: state.servicesList.data?.Data?.filter(
              item => item.ServiceID !== payload.ServiceID,
            ),
          },
        },
        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices.data,
            Data: state.myServices.data?.Data?.filter(
              item => item.ServiceID !== payload.ServiceID,
            ),
          },
        },

        service: {
          ...state.service,
          data: {
            ...state.service.data,
            Data: state.service.data?.Data?.filter(
              item => item.ServiceID !== payload.ServiceID,
            ),
          },
        },
        relatedServices: {
          ...state.relatedServices,
          data: {
            ...state.relatedServices.data,
            Data: state.relatedServices.data?.Data?.filter(
              item => item.ServiceID !== payload.ServiceID,
            ),
          },
        },
        searchResults: {
          ...state.searchResults,
          data: {
            ...state.searchResults.data,
            Data: state.searchResults.data?.Data?.filter(
              item => item.ServiceID !== payload.ServiceID,
            ),
          },
        },
      };

    default:
      return null;
  }
};
