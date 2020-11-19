import {
  GET_PENDING_OTHER_START,
  GET_PENDING_OTHER_SUCCESS,
  GET_PENDING_OTHER_ERROR,
} from 'constants/action-types/transactions/getPendingOther';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_PENDING_OTHER_START:
      return {
        ...state,
        pendingOther: {
          ...state.pendingOther,
          loading: true,
          error: null,
        },
      };
    case GET_PENDING_OTHER_ERROR:
      return {
        ...state,
        pendingOther: {
          ...state.pendingOther,
          error: payload,
          loading: false,
        },
      };
    case GET_PENDING_OTHER_SUCCESS:
      return {
        ...state,
        pendingOther: {
          ...state.pendingOther,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
