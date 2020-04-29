import {
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  ADD_NEW_NOTIFICATION,
} from 'constants/action-types/users/notifications';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_NOTIFICATIONS_START:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          loading: true,
        },
      };
    case GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          error: payload.error,
          loading: false,
        },
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...payload,
          data: payload.data,
          meta: payload.meta,
          success: true,
          loading: false,
        },
      };

    case ADD_NEW_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: [payload, ...state.notifications.data],
          meta: {
            ...state.notifications.meta,
            totalUnseen:
              state.notifications.meta &&
              state.notifications.meta.totalUnseen + 1,
          },
        },
      };

    default:
      return null;
  }
};
