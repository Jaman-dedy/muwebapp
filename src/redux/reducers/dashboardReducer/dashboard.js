import {
  TOGGLE_SIDEBAR,
  SET_NOTIFICATIONS,
} from 'constants/action-types/dashboard';

export default (state, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        dashboardData: {
          ...state.dashboardData,
          isSidebarActive: !state.dashboardData.isSidebarActive,
        },
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        dashboardData: {
          ...state.dashboardData,
          notificationNumber: payload,
        },
      };

    default:
      return null;
  }
};
