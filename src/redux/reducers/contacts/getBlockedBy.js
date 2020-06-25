import {
  GET_BLOCKING_LIST_START,
  GET_BLOCKING_LIST_SUCCESS,
  GET_BLOCKING_LIST_ERROR,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_BLOCKING_LIST_START:
      return {
        ...state,
        blockedByList: {
          ...state.blockedByList,
          loading: true,
          error: null,
        },
      };
    case GET_BLOCKING_LIST_ERROR:
      return {
        ...state,
        blockedByList: {
          ...state.blockedByList,
          error: payload,
          loading: false,
        },
      };
    case GET_BLOCKING_LIST_SUCCESS:
      return {
        ...state,
        blockedByList: {
          ...state.blockedByList,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
