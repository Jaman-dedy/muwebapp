import {
  DELETE_SERVICE_COMMENT_SUCCESS,
  DELETE_SERVICE_COMMENT_ERROR,
  DELETE_SERVICE_COMMENT_START,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_SERVICE_COMMENT_START:
      return {
        ...state,
        deleteServiceComment: {
          ...state.deleteServiceComment,
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
                  Comments: state.myServices.data.Data[
                    index
                  ].Comments.map(item =>
                    item.CommentNumber === payload.CommentNumber
                      ? {
                          ...item,
                          updating: true,
                        }
                      : item,
                  ),
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
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...item,
                  Comments: item.Comments.map(item =>
                    item.CommentNumber === payload.CommentNumber
                      ? {
                          ...item,
                          updating: true,
                        }
                      : item,
                  ),
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
                    Comments: state.relatedServices.data.Data[
                      index
                    ].Comments.map(item =>
                      item.CommentNumber === payload.CommentNumber
                        ? {
                            ...item,
                            updating: true,
                          }
                        : item,
                    ),
                  };
                }
                return item;
              },
            ),
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
                    Comments: state.servicesList.data.Data[
                      index
                    ].Comments.map(item =>
                      item.CommentNumber === payload.CommentNumber
                        ? {
                            ...item,
                            updating: true,
                          }
                        : item,
                    ),
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
                  Comments: state.service.data.Data[
                    index
                  ].Comments.map(item =>
                    item.CommentNumber === payload.CommentNumber
                      ? {
                          ...item,
                          updating: true,
                        }
                      : item,
                  ),
                };
              }
              return item;
            }),
          },
        },
      };
    case DELETE_SERVICE_COMMENT_ERROR:
      return {
        ...state,
        deleteServiceComment: {
          ...state.deleteServiceComment,
          error: payload,
          loading: false,
        },
      };
    case DELETE_SERVICE_COMMENT_SUCCESS:
      return {
        ...state,
        deleteServiceComment: {
          ...state.deleteServiceComment,
          error: null,
          loading: false,
          data: payload,
        },

        service: {
          ...state.service,
          data: {
            ...state.service.data,
            Data: state.service.data?.Data?.map((item, index) => {
              if (item.ServiceID === payload.requestData.ServiceID) {
                return {
                  ...state.service.data.Data[index],
                  Comments: state.service.data.Data[
                    index
                  ].Comments.filter(
                    item =>
                      item.CommentNumber !==
                      payload.requestData.CommentNumber,
                  ),
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
              if (item.ServiceID === payload.requestData.ServiceID) {
                return {
                  ...item,
                  Comments: item.Comments.filter(
                    item =>
                      item.CommentNumber !==
                      payload.requestData.CommentNumber,
                  ),
                };
              }
              return item;
            }),
          },
        },

        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices.data,
            Data: state.myServices.data?.Data?.map((item, index) => {
              if (item.ServiceID === payload.requestData.ServiceID) {
                return {
                  ...state.myServices.data.Data[index],
                  Comments: state.myServices.data.Data[
                    index
                  ].Comments.filter(
                    item =>
                      item.CommentNumber !==
                      payload.requestData.CommentNumber,
                  ),
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
                if (
                  item.ServiceID === payload.requestData.ServiceID
                ) {
                  return {
                    ...state.relatedServices.data.Data[index],
                    Comments: state.relatedServices.data.Data[
                      index
                    ].Comments.filter(
                      item =>
                        item.CommentNumber !==
                        payload.requestData.CommentNumber,
                    ),
                  };
                }
                return item;
              },
            ),
          },
        },

        servicesList: {
          ...state.servicesList,
          data: {
            ...state.servicesList.data,
            Data: state.servicesList.data?.Data?.map(
              (item, index) => {
                if (
                  item.ServiceID === payload.requestData.ServiceID
                ) {
                  return {
                    ...state.servicesList.data.Data[index],
                    Comments: state.servicesList.data.Data[
                      index
                    ].Comments.filter(
                      item =>
                        item.CommentNumber !==
                        payload.requestData.CommentNumber,
                    ),
                  };
                }
                return item;
              },
            ),
          },
        },
      };

    default:
      return null;
  }
};
