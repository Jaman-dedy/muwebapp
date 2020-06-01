import {
  TOGGLE_SIDEBAR,
  SET_NOTIFICATIONS,
  SET_IS_SENDING_CASH,
  SET_IS_SENDING_MONEY,
  SET_MANAGE_CONTACTS,
  SET_IS_SENDING_OTHERS,
  SET_IS_TOPING_UP,
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
    case SET_IS_SENDING_OTHERS:
      return {
        ...state,
        contactActions: {
          isSendingCash: false,
          isSendingMoney: false,
          isManagingContacts: false,
          isSendingOthers: true,
        },
      };
    case SET_IS_TOPING_UP:
      return {
        ...state,
        contactActions: {
          isSendingCash: false,
          isSendingMoney: false,
          isManagingContacts: false,
          isSendingOthers: false,
          isTopingUp: true,
        },
      };

    default:
      return null;
  }
};
