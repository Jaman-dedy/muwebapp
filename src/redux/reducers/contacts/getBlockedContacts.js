import {
  GET_BLOCKED_LIST_START,
  GET_BLOCKED_LIST_SUCCESS,
  GET_BLOCKED_LIST_ERROR,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_BLOCKED_LIST_START:
      return {
        ...state,
        blockedContactList: {
          ...state.blockedContactList,
          loading: true,
          error: null,
        },
      };
    case GET_BLOCKED_LIST_ERROR:
      return {
        ...state,
        blockedContactList: {
          ...state.blockedContactList,
          error: payload,
          loading: false,
        },
      };
    case GET_BLOCKED_LIST_SUCCESS:
      return {
        ...state,
        blockedContactList: {
          ...state.blockedContactList,
          error: null,
          loading: false,
          data: payload,
        },
      };
    default:
      return null;
  }
};
