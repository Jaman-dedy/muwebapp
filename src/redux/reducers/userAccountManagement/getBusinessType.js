import {
  GET_BUSINESS_TYPE_FAILURE,
  GET_BUSINESS_TYPE_SUCCESS,
  GET_BUSINESS_TYPE_START,
} from 'constants/action-types/userAccountManagement/switchToBusinessAccount';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_BUSINESS_TYPE_START:
      return {
        ...state,
        businessType: {
          ...state.businessType,
          loading: true,
          error: null,
        },
      };
    case GET_BUSINESS_TYPE_SUCCESS:
      return {
        ...state,
        businessType: {
          ...state.businessType,
          data: payload?.data,
          loading: false,
        },
      };

    case GET_BUSINESS_TYPE_FAILURE:
      return {
        ...state,
        businessType: {
          ...state.businessType,
          error: payload.error,
          loading: false,
        },
      };
    default:
      return null;
  }
};
