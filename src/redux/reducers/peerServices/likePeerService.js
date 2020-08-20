import {
  LIKE_SERVICE_START,
  LIKE_SERVICE_SUCCESS,
  LIKE_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

export default (state, { type, payload }) => {
  switch (type) {
    case LIKE_SERVICE_START:
      return {
        ...state,
        likeService: {
          ...state.likeService,
          loading: true,
          error: null,
        },

        myServices: {
          ...state.myServices,
          data: {
            ...state.myServices.data,
            Data: state.myServices.data?.Data?.map((item, index) => {
              const userDisliked = item.UserReview?.DisLike === 'YES';
              const userLiked = item.UserReview?.Like === 'YES';

              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.myServices.data.Data[index],
                  liked: !userLiked,
                  Likes: userLiked
                    ? (
                        Number(
                          state.myServices.data.Data[index].Likes,
                        ) - 1
                      ).toString()
                    : (
                        Number(
                          state.myServices.data.Data[index].Likes,
                        ) + 1
                      ).toString(),

                  UserReview: {
                    ...item.UserReview,
                    Like: userLiked ? 'NO' : 'YES',
                    DisLike: 'NO',
                  },
                  DisLikes: userDisliked
                    ? (
                        Number(
                          state.myServices.data.Data[index].DisLikes,
                        ) - 1
                      ).toString()
                    : Number(
                        state.myServices.data.Data[index].DisLikes,
                      ).toString(),
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
            Data: state.servicesList?.data?.Data?.map(
              (item, index) => {
                const userDisliked =
                  item.UserReview?.DisLike === 'YES';
                const userLiked = item.UserReview?.Like === 'YES';
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.servicesList.data.Data[index],
                    liked: !userLiked,
                    Likes: userLiked
                      ? (
                          Number(
                            state.servicesList.data.Data[index].Likes,
                          ) - 1
                        ).toString()
                      : (
                          Number(
                            state.servicesList.data.Data[index].Likes,
                          ) + 1
                        ).toString(),

                    UserReview: {
                      ...item.UserReview,
                      Like: userLiked ? 'NO' : 'YES',
                      DisLike: 'NO',
                    },
                    DisLikes: userDisliked
                      ? (
                          Number(
                            state.servicesList.data.Data[index]
                              .DisLikes,
                          ) - 1
                        ).toString()
                      : Number(
                          state.servicesList.data.Data[index]
                            .DisLikes,
                        ).toString(),
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
            ...state.service?.data,
            Data: state.service?.data?.Data?.map((item, index) => {
              const userDisliked = item.UserReview?.DisLike === 'YES';
              const userLiked = item.UserReview?.Like === 'YES';

              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.service.data.Data[index],
                  liked: !userLiked,
                  Likes: userLiked
                    ? (
                        Number(state.service.data.Data[index].Likes) -
                        1
                      ).toString()
                    : (
                        Number(state.service.data.Data[index].Likes) +
                        1
                      ).toString(),

                  UserReview: {
                    ...item.UserReview,
                    Like: userLiked ? 'NO' : 'YES',
                    DisLike: 'NO',
                  },
                  DisLikes: userDisliked
                    ? (
                        Number(
                          state.service.data.Data[index].DisLikes,
                        ) - 1
                      ).toString()
                    : Number(
                        state.service.data.Data[index].DisLikes,
                      ).toString(),
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
            Data: state.searchResults?.data?.Data?.map(
              (item, index) => {
                const userDisliked =
                  item.UserReview?.DisLike === 'YES';
                const userLiked = item.UserReview?.Like === 'YES';

                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.searchResults.data.Data[index],
                    liked: !userLiked,
                    Likes: userLiked
                      ? (
                          Number(
                            state.searchResults.data.Data[index]
                              .Likes,
                          ) - 1
                        ).toString()
                      : (
                          Number(
                            state.searchResults.data.Data[index]
                              .Likes,
                          ) + 1
                        ).toString(),

                    UserReview: {
                      ...item.UserReview,
                      Like: userLiked ? 'NO' : 'YES',
                      DisLike: 'NO',
                    },
                    DisLikes: userDisliked
                      ? (
                          Number(
                            state.searchResults.data.Data[index]
                              .DisLikes,
                          ) - 1
                        ).toString()
                      : Number(
                          state.searchResults.data.Data[index]
                            .DisLikes,
                        ).toString(),
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
            ...state.relatedServices?.data,
            Data: state.relatedServices?.data?.Data?.map(
              (item, index) => {
                const userDisliked =
                  item.UserReview?.DisLike === 'YES';
                const userLiked = item.UserReview?.Like === 'YES';

                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.relatedServices.data.Data[index],
                    liked: !userLiked,
                    Likes: userLiked
                      ? (
                          Number(
                            state.relatedServices.data.Data[index]
                              .Likes,
                          ) - 1
                        ).toString()
                      : (
                          Number(
                            state.relatedServices.data.Data[index]
                              .Likes,
                          ) + 1
                        ).toString(),

                    UserReview: {
                      ...item.UserReview,
                      Like: userLiked ? 'NO' : 'YES',
                      DisLike: 'NO',
                    },
                    DisLikes: userDisliked
                      ? (
                          Number(
                            state.relatedServices.data.Data[index]
                              .DisLikes,
                          ) - 1
                        ).toString()
                      : Number(
                          state.relatedServices.data.Data[index]
                            .DisLikes,
                        ).toString(),
                  };
                }
                return item;
              },
            ),
          },
        },
      };
    case LIKE_SERVICE_ERROR:
      return {
        ...state,
        likeService: {
          ...state.likeService,
          error: payload,
          loading: false,
        },
      };
    case LIKE_SERVICE_SUCCESS:
      return {
        ...state,
        likeService: {
          ...state.likeService,
          error: null,
          loading: false,
          data: payload,
        },
      };

    default:
      return null;
  }
};
