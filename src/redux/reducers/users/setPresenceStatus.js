import {
  SET_USER_PRESENCE_STATUS_ERROR,
  SET_USER_PRESENCE_STATUS_START,
  SET_USER_PRESENCE_STATUS_SUCCESS,
} from 'constants/action-types/users/setPresenceStatus';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_USER_PRESENCE_STATUS_START:
      return {
        ...state,
        setPresenceStatus: {
          ...state.setPresenceStatus,
          loading: true,
        },
        userData: {
          ...state.userData,
          data: {
            ...state.userData.data,
            ...{ PresenceStatus: payload.PresenceStatus },
          },
        },
      };
    case SET_USER_PRESENCE_STATUS_ERROR:
      return {
        ...state,
        setPresenceStatus: {
          ...state.setPresenceStatus,
          error: payload,
          loading: false,
        },
      };
    case SET_USER_PRESENCE_STATUS_SUCCESS:
      return {
        ...state,
        setPresenceStatus: {
          ...state.setPresenceStatus,
          error: null,
          loading: false,
          data: payload.data,
        },
      };

    default:
      return null;
  }
};
