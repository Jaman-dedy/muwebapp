import {
  UPDATE_SERVICE_PRICING_ERROR,
  UPDATE_SERVICE_PRICING_START,
  UPDATE_SERVICE_PRICING_SUCCESS,
  CLEAR_SERVICE_UPDATES,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case UPDATE_SERVICE_PRICING_START:
      return {
        ...state,
        updateService: {
          ...state.updateService,
          loading: true,
          error: null,
        },
      };
    case UPDATE_SERVICE_PRICING_ERROR:
      return {
        ...state,
        updateService: {
          ...state.updateService,
          error: payload,
          loading: false,
        },
      };
    case UPDATE_SERVICE_PRICING_SUCCESS:
      return {
        ...state,
        updateService: {
          ...state.updateService,
          error: null,
          loading: false,
          data: payload,
        },
        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices.data,
            Data: state.myServices.data?.Data?.map((item, index) => {
              if (item.ServiceID === payload.data.ServiceID) {
                return {
                  ...state.myServices.data?.Data?.[index],
                  ...{
                    ...payload.data,
                    Owner: payload.requestData.Owner,
                    Media:
                      payload.requestData.Media.length > 0
                        ? payload.requestData.Media.filter(
                            item => item.Action !== 'D',
                          )
                        : item.Media,
                    ExternalMedia:
                      payload.requestData.ExternalMedia.length > 0
                        ? payload.requestData.ExternalMedia.filter(
                            item => item.Action !== 'D',
                          )
                        : item.ExternalMedia,
                  },
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
            Data: state.servicesList.data?.Data?.map(item => {
              if (item.ServiceID === payload.data.ServiceID) {
                return {
                  ...item,
                  ...{
                    ...payload.data,
                    Owner: payload.requestData.Owner,
                    Media:
                      payload.requestData.Media.length > 0
                        ? payload.requestData.Media.filter(
                            item => item.Action !== 'D',
                          )
                        : item.Media,
                    ExternalMedia:
                      payload.requestData.ExternalMedia.length > 0
                        ? payload.requestData.ExternalMedia.filter(
                            item => item.Action !== 'D',
                          )
                        : item.ExternalMedia,
                  },
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
            Data: state.relatedServices.data?.Data?.map(item => {
              if (item.ServiceID === payload.data.ServiceID) {
                return {
                  ...item,
                  ...{
                    ...payload.data,
                    Owner: payload.requestData.Owner,
                    Media:
                      payload.requestData.Media.length > 0
                        ? payload.requestData.Media.filter(
                            item => item.Action !== 'D',
                          )
                        : item.Media,
                    ExternalMedia:
                      payload.requestData.ExternalMedia.length > 0
                        ? payload.requestData.ExternalMedia.filter(
                            item => item.Action !== 'D',
                          )
                        : item.ExternalMedia,
                  },
                };
              }
              return item;
            }),
          },
        },
        searchResults: {
          ...state.searchResults,
          data: {
            ...state.searchResults.data,
            Data: state.searchResults.data?.Data?.map(item => {
              if (item.ServiceID === payload.data.ServiceID) {
                return {
                  ...item,
                  ...{
                    ...payload.data,
                    Owner: payload.requestData.Owner,
                    Media:
                      payload.requestData.Media.length > 0
                        ? payload.requestData.Media.filter(
                            item => item.Action !== 'D',
                          )
                        : item.Media,
                    ExternalMedia:
                      payload.requestData.ExternalMedia.length > 0
                        ? payload.requestData.ExternalMedia.filter(
                            item => item.Action !== 'D',
                          )
                        : item.ExternalMedia,
                  },
                };
              }
              return item;
            }),
          },
        },

        service: {
          ...state.service,
          data: {
            ...state.service.data,
            Data: state.service.data?.Data?.map(item => {
              if (item.ServiceID === payload.data.ServiceID) {
                return {
                  ...item,
                  ...{
                    ...payload.data,
                    Owner: payload.requestData.Owner,
                    Media:
                      payload.requestData.Media.length > 0
                        ? payload.requestData.Media.filter(
                            item => item.Action !== 'D',
                          )
                        : item.Media,

                    ExternalMedia:
                      payload.requestData.ExternalMedia.length > 0
                        ? payload.requestData.ExternalMedia.filter(
                            item => item.Action !== 'D',
                          )
                        : item.ExternalMedia,
                  },
                };
              }
              return item;
            }),
          },
        },
      };
    case CLEAR_SERVICE_UPDATES:
      return {
        ...state,
        deleteService: {
          ...state.deleteService,
          error: null,
          loading: false,
          data: null,
        },
        createService: {
          ...state.createService,
          error: null,
          loading: false,
          data: null,
        },

        updateService: {
          ...state.updateService,
          loading: false,
          error: null,
          data: null,
        },

        setServiceStatus: {
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
