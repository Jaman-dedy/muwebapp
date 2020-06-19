import {
  GET_STORE_START,
  GET_STORE_SUCCESS,
  GET_STORE_ERROR,
  GET_STORE_CLEAR,
} from 'constants/action-types/vouchers/stores';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_STORE_START:
      return {
        ...state,
        stores: {
          ...state.create,
          loading: true,
          error: null,
        },
      };
    case GET_STORE_SUCCESS:
      return {
        ...state,
        stores: {
          ...state.create,
          ...payload,
          loading: false,
          error: null,
          success: true,
        },
      };

    case GET_STORE_ERROR:
      return {
        ...state,

        stores: {
          ...state.create,
          loading: false,
          error: payload,
        },
      };

    case GET_STORE_CLEAR:
      return {
        ...state,

        stores: {
          ...state.create,
          loading: false,
          success: false,
        },
      };
    default:
      return null;
  }
};
