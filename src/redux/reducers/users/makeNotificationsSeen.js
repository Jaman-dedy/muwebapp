import {
  MAKE_NOTIFICATIONS_SEEN_START,
  MAKE_NOTIFICATIONS_SEEN_SUCCESS,
  MAKE_NOTIFICATIONS_SEEN_ERROR,
} from 'constants/action-types/users/notifications';

export default (state, { type, payload }) => {
  switch (type) {
    case MAKE_NOTIFICATIONS_SEEN_START: {
      const unseen =
        state.notifications.meta.totalUnseen - payload.IDs.length;
      return {
        ...state,
        notifications: {
          ...state.notifications,
          loading: true,
          meta: {
            ...state.notifications.meta,
            totalUnseen: unseen < 0 ? 0 : unseen,
          },
        },
      };
    }
    case MAKE_NOTIFICATIONS_SEEN_ERROR:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          error: payload.error,
          loading: false,
        },
      };
    case MAKE_NOTIFICATIONS_SEEN_SUCCESS:
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
