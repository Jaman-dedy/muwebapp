import {
  UN_BOOKMARK_SERVICE_START,
  UN_BOOKMARK_SERVICE_SUCCESS,
  UN_BOOKMARK_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case UN_BOOKMARK_SERVICE_START:
      return {
        ...state,
        removeBookMarkedService: {
          ...state.removeBookMarkedService,
          loading: true,
          error: null,
        },
        bookMarkedServices: {
          ...state.bookMarkedServices,
          data: {
            ...state.bookMarkedServices?.data,
            Data: state.bookMarkedServices?.data?.Data.filter(
              item => item.ServiceID !== payload.service.ServiceID,
            ),
          },
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
                    Bookmark: 'NO',
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
                    Bookmark: 'NO',
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
                    Bookmark: 'NO',
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
                    Bookmark: 'NO',
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
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...item,
                  UserReview: {
                    ...item.UserReview,
                    Bookmark: 'NO',
                  },
                };
              }
              return item;
            }),
          },
        },
      };
    case UN_BOOKMARK_SERVICE_ERROR:
      return {
        ...state,
        removeBookMarkedService: {
          ...state.removeBookMarkedService,
          error: payload,
          loading: false,
        },
      };
    case UN_BOOKMARK_SERVICE_SUCCESS:
      return {
        ...state,
        removeBookMarkedService: {
          ...state.removeBookMarkedService,
          error: null,
          loading: false,
        },
      };

    default:
      return null;
  }
};
