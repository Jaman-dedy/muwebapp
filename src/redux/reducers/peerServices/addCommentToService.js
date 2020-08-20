import {
  ADD_COMMENT_TO_SERVICE_START,
  ADD_COMMENT_TO_SERVICE_SUCCESS,
  ADD_COMMENT_TO_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_COMMENT_TO_SERVICE_START:
      return {
        ...state,
        addComment: {
          ...state.addComment,
          loading: true,
          error: null,
        },

        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices?.data,
            Data: state.myServices?.data?.Data?.map(item => {
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...item,
                  Comments: [
                    ...item.Comments,
                    {
                      ...payload.comment,
                      justAdded: true,
                      updating: true,
                    },
                  ],
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
                  Comments: [
                    ...item.Comments,
                    {
                      ...payload.comment,
                      justAdded: true,
                      updating: true,
                    },
                  ],
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
                  Comments: [
                    ...item.Comments,
                    {
                      ...payload.comment,
                      justAdded: true,
                      updating: true,
                    },
                  ],
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
                  Comments: [
                    ...item.Comments,
                    {
                      ...payload.comment,
                      justAdded: true,
                      updating: true,
                    },
                  ],
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
                  Comments: [
                    ...item.Comments,
                    {
                      ...payload.comment,
                      justAdded: true,
                      updating: true,
                    },
                  ],
                };
              }
              return item;
            }),
          },
        },
      };
    case ADD_COMMENT_TO_SERVICE_ERROR:
      return {
        ...state,
        addComment: {
          ...state.addComment,
          error: payload,
          loading: false,
        },
      };
    case ADD_COMMENT_TO_SERVICE_SUCCESS:
      return {
        ...state,
        addComment: {
          ...state.addComment,
          error: null,
          loading: false,
          data: payload,
        },

        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices.data,
            Data: state.myServices?.data?.Data?.map(item => {
              if (item.ServiceID === payload.requestData.ServiceID) {
                return {
                  ...item,
                  Comments: item.Comments.map(item => {
                    if (item.updating) {
                      return {
                        ...item,
                        CommentNumber: payload.data.CommentNumber,
                        justAdded: false,
                        updating: false,
                      };
                    }
                    return item;
                  }),
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
            Data: state.relatedServices?.data?.Data?.map(
              (item, index) => {
                if (
                  item.ServiceID === payload.requestData.ServiceID
                ) {
                  return {
                    ...item,
                    Comments: state.relatedServices.data.Data[
                      index
                    ].Comments.map(item => {
                      if (item.updating) {
                        return {
                          ...item,
                          CommentNumber: payload.data.CommentNumber,
                          justAdded: false,
                          updating: false,
                        };
                      }
                      return item;
                    }),
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
            ...state.searchResults?.data,
            Data: state.searchResults?.data?.Data?.map(item => {
              if (item.ServiceID === payload.requestData.ServiceID) {
                return {
                  ...item,
                  Comments: item.Comments.map(item => {
                    if (item.updating) {
                      return {
                        ...item,
                        CommentNumber: payload.data.CommentNumber,
                        justAdded: false,
                        updating: false,
                      };
                    }
                    return item;
                  }),
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
              if (item.ServiceID === payload.requestData.ServiceID) {
                return {
                  ...item,
                  Comments: item.Comments.map(item => {
                    if (item.updating) {
                      return {
                        ...item,
                        CommentNumber: payload.data.CommentNumber,
                        justAdded: false,
                        updating: false,
                      };
                    }
                    return item;
                  }),
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
              if (item.ServiceID === payload.requestData.ServiceID) {
                return {
                  ...item,
                  Comments: item.Comments.map(item => {
                    if (item.updating) {
                      return {
                        ...item,
                        CommentNumber: payload.data.CommentNumber,
                        justAdded: false,
                        updating: false,
                      };
                    }
                    return item;
                  }),
                };
              }
              return item;
            }),
          },
        },
      };

    default:
      return null;
  }
};
