import {
  TOGGLE_SIDEBAR,
  SET_NOTIFICATIONS,
  SET_IS_SENDING_CASH,
  SET_IS_SENDING_MONEY,
  SET_MANAGE_CONTACTS,
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

    case SET_IS_SENDING_CASH:
      return {
        ...state,
        contactActions: {
          isSendingCash: true,
          isSendingMoney: false,
          isManagingContacts: false,
        },
      };
    case SET_MANAGE_CONTACTS:
      return {
        ...state,
        contactActions: {
          isSendingCash: false,
          isSendingMoney: false,
          isManagingContacts: true,
        },
      };

    case SET_IS_SENDING_MONEY:
      return {
        ...state,
        contactActions: {
          isSendingCash: false,
          isSendingMoney: true,
          isManagingContacts: false,
        },
      };

    default:
      return null;
  }
};
