import {
  TOGGLE_SIDEBAR,
  SET_NOTIFICATIONS,
  SET_IS_SENDING_CASH,
  SET_IS_SENDING_MONEY,
  SET_MANAGE_CONTACTS,
  SET_IS_SENDING_OTHERS,
  SET_IS_TOPING_UP,
  SET_IS_SENDING_VOUCHER,
  UPDATE_MONEY_TRANSFER_STEP,
  CLOSE_PROFILE_DROP_DOWN,
  OPEN_PROFILE_DROP_DOWN,
  UPDATE_CREDIT_CARD_STEP,
  CLEAR_CONTACT_ACTION,
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

    case UPDATE_MONEY_TRANSFER_STEP: {
      return {
        ...state,
        moneyTransfer: {
          step: payload,
        },
      };
    }

    case CLEAR_CONTACT_ACTION:
      return {
        ...state,
        contactActions: {
          isSendingCash: false,
          isSendingMoney: false,
          isManagingContacts: true,
          isSendingOthers: false,
          isTopingUp: false,
          isSendingVoucher: false,
        },
      };
    case UPDATE_CREDIT_CARD_STEP: {
      return {
        ...state,
        creditCard: {
          step: payload,
        },
      };
    }
    case CLOSE_PROFILE_DROP_DOWN: {
      return {
        ...state,
        profileDropDown: {
          open: false,
        },
      };
    }
    case OPEN_PROFILE_DROP_DOWN: {
      return {
        ...state,
        profileDropDown: {
          open: true,
        },
      };
    }

    default:
      return null;
  }
};
