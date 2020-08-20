import {
  DISLIKE_SERVICE_START,
  DISLIKE_SERVICE_SUCCESS,
  DISLIKE_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case DISLIKE_SERVICE_START:
      return {
        ...state,
        disLike: {
          ...state.disLike,
          loading: true,
          error: null,
        },

        servicesList: {
          ...state.servicesList,
          data: {
            ...state.servicesList?.data,
            Data: state.servicesList?.data?.Data?.map(
              (item, index) => {
                const userDisliked =
                  item.UserReview?.DisLike === 'YES';
                const userLiked = item.UserReview?.Like === 'YES';

                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.servicesList.data.Data[index],
                    disLiked: !userDisliked,
                    DisLikes: userDisliked
                      ? (
                          Number(
                            state.servicesList.data.Data[index]
                              .DisLikes,
                          ) - 1
                        ).toString()
                      : (
                          Number(
                            state.servicesList.data.Data[index]
                              .DisLikes,
                          ) + 1
                        ).toString(),

                    UserReview: {
                      ...item.UserReview,
                      DisLike: userDisliked ? 'NO' : 'YES',
                      Like: 'NO',
                    },
                    Likes: userLiked
                      ? (
                          Number(
                            state.servicesList.data.Data[index].Likes,
                          ) - 1
                        ).toString()
                      : Number(
                          state.servicesList.data.Data[index].Likes,
                        ).toString(),
                  };
                }
                return item;
              },
            ),
          },
        },

        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices?.data,
            Data: state.myServices?.data?.Data?.map((item, index) => {
              const userDisliked = item.UserReview?.DisLike === 'YES';
              const userLiked = item.UserReview?.Like === 'YES';

              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.myServices.data.Data[index],
                  disLiked: !userDisliked,
                  DisLikes: userDisliked
                    ? (
                        Number(
                          state.myServices.data.Data[index].DisLikes,
                        ) - 1
                      ).toString()
                    : (
                        Number(
                          state.myServices.data.Data[index].DisLikes,
                        ) + 1
                      ).toString(),

                  UserReview: {
                    ...item.UserReview,
                    DisLike: userDisliked ? 'NO' : 'YES',
                    Like: 'NO',
                  },
                  Likes: userLiked
                    ? (
                        Number(
                          state.myServices.data.Data[index].Likes,
                        ) - 1
                      ).toString()
                    : Number(
                        state.myServices.data.Data[index].Likes,
                      ).toString(),
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
            Data: state.service?.data?.Data?.map((item, index) => {
              const userDisliked = item.UserReview?.DisLike === 'YES';
              const userLiked = item.UserReview?.Like === 'YES';

              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.service.data.Data[index],
                  disLiked: !userDisliked,
                  DisLikes: userDisliked
                    ? (
                        Number(
                          state.service.data.Data[index].DisLikes,
                        ) - 1
                      ).toString()
                    : (
                        Number(
                          state.service.data.Data[index].DisLikes,
                        ) + 1
                      ).toString(),

                  UserReview: {
                    ...item.UserReview,
                    DisLike: userDisliked ? 'NO' : 'YES',
                    Like: 'NO',
                  },
                  Likes: userLiked
                    ? (
                        Number(state.service.data.Data[index].Likes) -
                        1
                      ).toString()
                    : Number(
                        state.service.data.Data[index].Likes,
                      ).toString(),
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
                const userDisliked =
                  item.UserReview?.DisLike === 'YES';
                const userLiked = item.UserReview?.Like === 'YES';

                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.relatedServices.data.Data[index],
                    disLiked: !userDisliked,
                    DisLikes: userDisliked
                      ? (
                          Number(
                            state.relatedServices.data.Data[index]
                              .DisLikes,
                          ) - 1
                        ).toString()
                      : (
                          Number(
                            state.relatedServices.data.Data[index]
                              .DisLikes,
                          ) + 1
                        ).toString(),

                    UserReview: {
                      ...item.UserReview,
                      DisLike: userDisliked ? 'NO' : 'YES',
                      Like: 'NO',
                    },
                    Likes: userLiked
                      ? (
                          Number(
                            state.relatedServices.data.Data[index]
                              .Likes,
                          ) - 1
                        ).toString()
                      : Number(
                          state.relatedServices.data.Data[index]
                            .Likes,
                        ).toString(),
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
            Data: state.searchResults?.data?.Data?.map(
              (item, index) => {
                const userDisliked =
                  item.UserReview?.DisLike === 'YES';
                const userLiked = item.UserReview?.Like === 'YES';

                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.searchResults.data.Data[index],
                    disLiked: !userDisliked,
                    DisLikes: userDisliked
                      ? (
                          Number(
                            state.searchResults.data.Data[index]
                              .DisLikes,
                          ) - 1
                        ).toString()
                      : (
                          Number(
                            state.searchResults.data.Data[index]
                              .DisLikes,
                          ) + 1
                        ).toString(),

                    UserReview: {
                      ...item.UserReview,
                      DisLike: userDisliked ? 'NO' : 'YES',
                      Like: 'NO',
                    },
                    Likes: userLiked
                      ? (
                          Number(
                            state.searchResults.data.Data[index]
                              .Likes,
                          ) - 1
                        ).toString()
                      : Number(
                          state.searchResults.data.Data[index].Likes,
                        ).toString(),
                  };
                }
                return item;
              },
            ),
          },
        },
      };
    case DISLIKE_SERVICE_ERROR:
      return {
        ...state,
        disLike: {
          ...state.disLike,
          error: payload,
          loading: false,
        },
      };
    case DISLIKE_SERVICE_SUCCESS:
      return {
        ...state,
        disLike: {
          ...state.disLike,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
