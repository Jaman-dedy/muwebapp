import {
  RATE_SERVICE_START,
  RATE_SERVICE_SUCCESS,
  RATE_SERVICE_ERROR,
} from 'constants/action-types/peerServices';

const getNewAverageRating = (userRatedBefore, item, payload) => {
  if (item.RatingCount === '0') {
    return payload.requestData.Rating;
  }

  const sumOfAllRatings = parseFloat(
    Number(payload.requestData.Rating) +
      parseFloat(item.AverageRating),
  );

  const totalNumberOfRatings = userRatedBefore
    ? Number(item.RatingCount)
    : Number(item.RatingCount) + 1;

  const newAverageRating = sumOfAllRatings / totalNumberOfRatings;

  const formatted = parseFloat(newAverageRating).toFixed(2);

  return formatted;
};

export default (state, { type, payload }) => {
  switch (type) {
    case RATE_SERVICE_START:
      return {
        ...state,
        rateService: {
          ...state.rateService,
          loading: true,
          error: null,
        },
        servicesList: {
          ...state.servicesList,
          data: {
            ...state.servicesList?.data,
            Data: state.servicesList?.data?.Data?.map(
              (item, index) => {
                const userRatedBefore =
                  Number(item.UserReview?.Rating) > 0 || false;
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.servicesList.data.Data[index],
                    AverageRating: getNewAverageRating(
                      userRatedBefore,
                      item,
                      payload,
                    ),

                    RatingCount: userRatedBefore
                      ? state.servicesList.data.Data[index]
                          .RatingCount
                      : String(
                          Number(
                            state.servicesList.data.Data[index]
                              .RatingCount,
                          ) + 1,
                        ),
                    UserReview: {
                      ...state.servicesList.data?.Data[index]
                        ?.UserReview,
                      Rating: payload.Rating,
                    },
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
              const userRatedBefore =
                Number(item.UserReview?.Rating) > 0 || false;
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.myServices.data.Data[index],
                  AverageRating: getNewAverageRating(
                    userRatedBefore,
                    item,
                    payload,
                  ),

                  RatingCount: userRatedBefore
                    ? state.myServices.data.Data[index].RatingCount
                    : String(
                        Number(
                          state.myServices.data.Data[index]
                            .RatingCount,
                        ) + 1,
                      ),
                  UserReview: {
                    ...state.myServices.data?.Data[index]?.UserReview,
                    Rating: payload.Rating,
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
            Data: state.service?.data?.Data?.map((item, index) => {
              const userRatedBefore =
                Number(item.UserReview?.Rating) > 0 || false;
              if (item.ServiceID === payload.ServiceID) {
                return {
                  ...state.service.data.Data[index],
                  AverageRating: getNewAverageRating(
                    userRatedBefore,
                    item,
                    payload,
                  ),

                  RatingCount: userRatedBefore
                    ? state.service.data.Data[index].RatingCount
                    : String(
                        Number(
                          state.service.data.Data[index].RatingCount,
                        ) + 1,
                      ),
                  UserReview: {
                    ...state.service.data?.Data[index]?.UserReview,
                    Rating: payload.Rating,
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
            Data: state.relatedServices?.data?.Data?.map(
              (item, index) => {
                const userRatedBefore =
                  Number(item.UserReview?.Rating) > 0 || false;
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.relatedServices.data.Data[index],
                    AverageRating: getNewAverageRating(
                      userRatedBefore,
                      item,
                      payload,
                    ),

                    RatingCount: userRatedBefore
                      ? state.relatedServices.data.Data[index]
                          .RatingCount
                      : String(
                          Number(
                            state.relatedServices.data.Data[index]
                              .RatingCount,
                          ) + 1,
                        ),
                    UserReview: {
                      ...state.relatedServices.data?.Data[index]
                        ?.UserReview,
                      Rating: payload.Rating,
                    },
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
                const userRatedBefore =
                  Number(item.UserReview?.Rating) > 0 || false;
                if (item.ServiceID === payload.ServiceID) {
                  return {
                    ...state.searchResults.data.Data[index],
                    AverageRating: getNewAverageRating(
                      userRatedBefore,
                      item,
                      payload,
                    ),

                    RatingCount: userRatedBefore
                      ? state.searchResults.data.Data[index]
                          .RatingCount
                      : String(
                          Number(
                            state.searchResults.data.Data[index]
                              .RatingCount,
                          ) + 1,
                        ),
                    UserReview: {
                      ...state.searchResults.data?.Data[index]
                        ?.UserReview,
                      Rating: payload.Rating,
                    },
                  };
                }
                return item;
              },
            ),
          },
        },
      };
    case RATE_SERVICE_ERROR:
      return {
        ...state,
        rateService: {
          ...state.rateService,
          error: payload,
          loading: false,
        },
      };
    case RATE_SERVICE_SUCCESS:
      return {
        ...state,
        rateService: {
          ...state.rateService,
          error: null,
          loading: false,
          data: payload,
        },
      };

    default:
      return null;
  }
};
