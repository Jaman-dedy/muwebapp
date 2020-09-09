import {
  BOOKMARK_SERVICE_START,
  BOOKMARK_SERVICE_SUCCESS,
  BOOKMARK_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

const getNewData = (prev, payload) =>
  prev.Data
    ? {
        ...prev,
        Data: [
          {
            ...payload.service,
            UserReview: {
              ...payload.service.UserReview,
              Bookmark: 'YES',
            },
          },
          ...prev?.Data,
        ],
      }
    : {
        Data: [
          {
            ...payload.service,
            UserReview: {
              ...payload.service.UserReview,
              Bookmark: 'YES',
            },
          },
        ],
      };

export default (state, { type, payload }) => {
  switch (type) {
    case BOOKMARK_SERVICE_START:
      return {
        ...state,
        addBookMarkedService: {
          ...state.addBookMarkedService,
          loading: true,
          error: null,
        },
        bookMarkedServices: {
          ...state.bookMarkedServices,
          data: getNewData(state.bookMarkedServices.data, payload),
        },

        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices?.data,
            Data: state.myServices?.data?.Data?.map(item => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...item,
                  UserReview: {
                    ...item.UserReview,
                    Bookmark: 'YES',
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
            ...state.searchResults?.data,
            Data: state.searchResults?.data?.Data?.map(item => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...item,
                  UserReview: {
                    ...item.UserReview,
                    Bookmark: 'YES',
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
            ...state.relatedServices?.data,
            Data: state.relatedServices?.data?.Data?.map(item => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...item,
                  UserReview: {
                    ...item.UserReview,
                    Bookmark: 'YES',
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
            ...state.service?.data,
            Data: state.service?.data?.Data?.map(item => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...item,
                  UserReview: {
                    ...item.UserReview,
                    Bookmark: 'YES',
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
            ...state.servicesList?.data,
            Data: state.servicesList?.data?.Data?.map(item => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...item,
                  UserReview: {
                    ...item.UserReview,
                    Bookmark: 'YES',
                  },
                };
              }
              return item;
            }),
          },
        },
      };
    case BOOKMARK_SERVICE_ERROR:
      return {
        ...state,
        addBookMarkedService: {
          ...state.addBookMarkedService,
          error: payload,
          loading: false,
        },
      };
    case BOOKMARK_SERVICE_SUCCESS:
      return {
        ...state,
        addBookMarkedService: {
          ...state.addBookMarkedService,
          error: null,
          loading: false,
        },
      };

    default:
      return null;
  }
};
