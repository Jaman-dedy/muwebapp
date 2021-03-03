import {
  TOGGLE_SIDEBAR,
  SET_IS_SENDING_CASH,
  SET_IS_SENDING_MONEY,
  SET_MANAGE_CONTACTS,
  SET_IS_SENDING_OTHERS,
  SET_IS_TOPING_UP,
  SET_IS_SENDING_VOUCHER,
  SET_CHAT_LIST_OPEN,
  SET_CHAT_LIST_CLOSED,
  UPDATE_MONEY_TRANSFER_STEP,
  OPEN_PROFILE_DROP_DOWN,
  CLOSE_PROFILE_DROP_DOWN,
  UPDATE_CREDIT_CARD_STEP,
  CLEAR_CONTACT_ACTION,
} from 'constants/action-types/dashboard';

const toggleSidebar = dispatch => {
  return dispatch({
    type: TOGGLE_SIDEBAR,
  });
};

export const updateMoneyTransferStep = step => dispatch => {
  return dispatch({
    type: UPDATE_MONEY_TRANSFER_STEP,
    payload: step,
  });
};
export const updateCreditCardStep = step => dispatch => {
  return dispatch({
    type: UPDATE_CREDIT_CARD_STEP,
    payload: step,
  });
};
export const openProfileDropDown = dispatch => {
  return dispatch({
    type: OPEN_PROFILE_DROP_DOWN,
  });
};
export const closeProfileDropDown = dispatch => {
  return dispatch({
    type: CLOSE_PROFILE_DROP_DOWN,
  });
};

export const setIsendingCash = dispatch => {
  return dispatch({
    type: SET_IS_SENDING_CASH,
  });
};
export const setManageContacts = dispatch => {
  return dispatch({
    type: SET_MANAGE_CONTACTS,
  });
};
export const setIsSendingMoney = dispatch => {
  return dispatch({
    type: SET_IS_SENDING_MONEY,
  });
};
export const setIsSendingOhters = dispatch => {
  return dispatch({
    type: SET_IS_SENDING_OTHERS,
  });
};
export const setIsTopingUp = dispatch => {
  return dispatch({
    type: SET_IS_TOPING_UP,
  });
};
export const setIsSendingVoucher = dispatch => {
  return dispatch({
    type: SET_IS_SENDING_VOUCHER,
  });
};
export const openChatList = dispatch => {
  return dispatch({
    type: SET_CHAT_LIST_OPEN,
  });
};
export const closeChatList = dispatch => {
  return dispatch({
    type: SET_CHAT_LIST_CLOSED,
  });
};
export const clearContactAction = dispatch => {
  return dispatch({
    type: CLEAR_CONTACT_ACTION,
  });
};
export default toggleSidebar;
