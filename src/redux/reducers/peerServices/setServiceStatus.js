import {
  SET_SERVICE_STATUS_ERROR,
  SET_SERVICE_STATUS_START,
  SET_SERVICE_STATUS_SUCCESS,
  CLEAR_SERVICE_UPDATES,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_SERVICE_STATUS_START:
      return {
        ...state,
        setServiceStatus: {
          ...state.setServiceStatus,
          loading: true,
          error: null,
        },

        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices.data,
            Data: state.myServices.data?.Data?.map((item, index) => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.myServices.data.Data[index],
                  updating: true,
                };
              }
              return item;
            }),
          },
        },

        servicesList: {
          ...state.servicesList,
          data: {
            ...state.servicesList.data,
            Data: state.servicesList.data?.Data?.map(
              (item, index) => {
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.servicesList.data.Data[index],
                    updating: true,
                  };
                }
                return item;
              },
            ),
          },
        },

        relatedServices: {
          ...state.relatedServices,
          data: {
            ...state.relatedServices.data,
            Data: state.relatedServices.data?.Data?.map(
              (item, index) => {
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.relatedServices.data.Data[index],
                    updating: true,
                  };
                }
                return item;
              },
            ),
          },
        },

        searchResults: {
          ...state.searchResults,
          data: {
            ...state.searchResults.data,
            Data: state.searchResults.data?.Data?.map(
              (item, index) => {
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.searchResults.data.Data[index],
                    updating: true,
                  };
                }
                return item;
              },
            ),
          },
        },

        service: {
          ...state.service,
          data: {
            ...state.service.data,
            Data: state.service.data?.Data?.map((item, index) => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.service.data.Data[index],
                  updating: true,
                };
              }
              return item;
            }),
          },
        },
      };
    case SET_SERVICE_STATUS_ERROR:
      return {
        ...state,
        setServiceStatus: {
          ...state.setServiceStatus,
          error: payload,
          loading: false,
        },

        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices.data,
            Data: state.myServices.data?.Data?.map((item, index) => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.myServices.data.Data[index],
                  updating: false,
                };
              }
              return item;
            }),
          },
        },
      };
    case SET_SERVICE_STATUS_SUCCESS:
      return {
        ...state,
        setServiceStatus: {
          ...state.setServiceStatus,
          error: null,
          loading: false,
          data: payload.data,
        },
        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices.data,
            Data: state.myServices.data?.Data?.map((item, index) => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.myServices.data.Data[index],
                  Available:
                    state.myServices.data.Data[index].Available ===
                    'YES'
                      ? 'NO'
                      : 'YES',
                  updating: false,
                };
              }
              return item;
            }),
          },
        },

        servicesList: {
          ...state.servicesList,
          data: {
            ...state.servicesList.data,
            Data: state.servicesList.data?.Data?.map(
              (item, index) => {
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.servicesList.data.Data[index],
                    Available:
                      state.servicesList.data.Data[index]
                        .Available === 'YES'
                        ? 'NO'
                        : 'YES',
                    updating: false,
                  };
                }
                return item;
              },
            ),
          },
        },

        service: {
          ...state.service,
          data: {
            ...state.service.data,
            Data: state.service.data?.Data?.map((item, index) => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.service.data.Data[index],
                  Available:
                    state.service.data.Data[index].Available === 'YES'
                      ? 'NO'
                      : 'YES',
                  updating: false,
                };
              }
              return item;
            }),
          },
        },

        relatedServices: {
          ...state.relatedServices,
          data: {
            ...state.relatedServices.data,
            Data: state.relatedServices.data?.Data?.map(
              (item, index) => {
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.relatedServices.data.Data[index],
                    Available:
                      state.relatedServices.data.Data[index]
                        .Available === 'YES'
                        ? 'NO'
                        : 'YES',
                    updating: false,
                  };
                }
                return item;
              },
            ),
          },
        },

        searchResults: {
          ...state.searchResults,
          data: {
            ...state.searchResults.data,
            Data: state.searchResults.data?.Data?.map(
              (item, index) => {
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.searchResults.data.Data[index],
                    Available:
                      state.searchResults.data.Data[index]
                        .Available === 'YES'
                        ? 'NO'
                        : 'YES',
                    updating: false,
                  };
                }
                return item;
              },
            ),
          },
        },
      };
    case CLEAR_SERVICE_UPDATES:
      return {
        ...state,
        setServiceStatus: {
          ...state.setServiceStatus,
          loading: false,
          error: null,
          data: null,
        },
        reportServiceOrComment: {
          loading: false,
          data: null,
          type: null,
          error: null,
        },

        updateService: {
          loading: false,
          data: null,
          error: null,
        },
        updateServiceDetails: {
          loading: false,
          data: null,
          error: null,
        },
        updateServiceMedia: {
          loading: false,
          data: null,
          error: null,
        },
      };
    default:
      return null;
  }
};
