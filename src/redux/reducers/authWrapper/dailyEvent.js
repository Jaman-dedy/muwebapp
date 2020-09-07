import {
  GET_DAILY_EVENT_START,
  GET_DAILY_EVENT_SUCCESS,
  GET_DAILY_EVENT_ERROR,
} from 'constants/action-types/authWrapper';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_DAILY_EVENT_START:
      return {
        ...state,
        dailyEvent: {
          ...state.dailyEvent,
          loading: true,
          error: null,
        },
      };
    case GET_DAILY_EVENT_ERROR:
      return {
        ...state,
        dailyEvent: {
          ...state.dailyEvent,
          error: payload,
          loading: false,
        },
      };
    case GET_DAILY_EVENT_SUCCESS:
      return {
        ...state,
        dailyEvent: {
          ...state.dailyEvent,
          error: null,
          loading: false,
          data: payload.data,
        },
      };
    default:
      return null;
  }
};
