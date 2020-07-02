import {
  GET_BLOCKING_LIST_START,
  GET_BLOCKING_LIST_SUCCESS,
  GET_BLOCKING_LIST_ERROR,
  UPDATE_BLOCKING_LIST,
} from 'constants/action-types/contacts';
import { BLOCKED_ME } from 'constants/general';

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

    case UPDATE_BLOCKING_LIST: {
      const { action, contact } = payload;
      return {
        ...state,
        blockedByList: {
          ...state.blockedByList,
          data:
            action === BLOCKED_ME
              ? [
                  ...(state.blockedByList.data || []),
                  { ContactPID: contact },
                ]
              : state.blockedByList.data?.filter(
                  item => item.ContactPID !== contact,
                ),
        },
      };
    }
    default:
      return null;
  }
};
