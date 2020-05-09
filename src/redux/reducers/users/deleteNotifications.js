import {
  DELETE_NOTIFICATIONS_START,
  DELETE_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_ERROR,
} from 'constants/action-types/users/notifications';

export default (state, { type, payload }) => {
  switch (type) {
    case DELETE_NOTIFICATIONS_START: {
      const total =
        state.notifications.meta.total - payload.IDs.length;

      const newData = state.notifications.data.filter(
        ({ id }) => !payload.IDs.includes(id),
      );
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: [...newData],
          meta: {
            ...state.notifications.meta,
            total: total < 0 ? 0 : total,
          },
        },
      };
    }
    case DELETE_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          error: payload.error,
          loading: false,
        },
      };
    case DELETE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          success: true,
          loading: false,
        },
      };

    default:
      return null;
  }
};
