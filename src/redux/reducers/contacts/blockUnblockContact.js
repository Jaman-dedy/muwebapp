import {
  BLOCK_UNBLOCK_START,
  BLOCK_UNBLOCK_SUCCESS,
  BLOCK_UNBLOCK_ERROR,
  CLEAR_BLOCK_UNBLOCK,
} from 'constants/action-types/contacts';

const getUpdatedList = (payload, state) => {
  return Array.isArray(state.blockedContactList.data)
    ? [payload.contact, ...state.blockedContactList.data]
    : [payload.contact];
};

const getNewBlockedList = (payload, state) => {
  return payload.requestData.Block === 'No'
    ? state.blockedContactList.data?.filter(
        item => item.ContactPID !== payload.requestData.ContactPID,
      )
    : getUpdatedList(payload, state);
};

export default (state, { type, payload }) => {
  switch (type) {
    case BLOCK_UNBLOCK_START:
      return {
        ...state,
        blockUnblock: {
          ...state.blockUnblock,
          loading: true,
          error: null,
        },
      };
    case BLOCK_UNBLOCK_ERROR:
      return {
        ...state,
        blockUnblock: {
          ...state.blockUnblock,
          error: payload,
          loading: false,
        },
      };
    case BLOCK_UNBLOCK_SUCCESS:
      return {
        ...state,
        blockUnblock: {
          ...state.blockUnblock,
          loading: false,
          error: null,
          data: payload.data,
          success: true,
        },
        blockedContactList: {
          ...state.blockedContactList,
          error: null,
          loading: false,
          data: getNewBlockedList(payload, state),
        },
      };

    case CLEAR_BLOCK_UNBLOCK:
      return {
        ...state,
        blockUnblock: {
          ...state.blockUnblock,
          loading: false,
          error: null,
          data: null,
          success: false,
          contact: null,
        },
      };

    default:
      return null;
  }
};
