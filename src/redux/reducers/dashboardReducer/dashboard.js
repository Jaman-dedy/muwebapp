import {
  TOGGLE_SIDEBAR,
  SET_NOTIFICATIONS,
  SET_IS_SENDING_CASH,
  SET_IS_SENDING_MONEY,
  SET_MANAGE_CONTACTS,
  SET_IS_SENDING_OTHERS,
  SET_IS_TOPING_UP,
  SET_IS_SENDING_VOUCHER,
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
          isSendingVoucher: false,
        },
      };
    case SET_MANAGE_CONTACTS:
      return {
        ...state,
        contactActions: {
          isSendingCash: false,
          isSendingMoney: false,
          isSendingVoucher: false,
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
          isSendingVoucher: false,
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
          isSendingVoucher: false,
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
          isSendingVoucher: false,
        },
      };
    case SET_IS_SENDING_VOUCHER:
      return {
        ...state,
        contactActions: {
          isSendingCash: false,
          isSendingMoney: false,
          isManagingContacts: false,
          isSendingOthers: false,
          isTopingUp: false,
          isSendingVoucher: true,
        },
      };

    default:
      return null;
  }
};
