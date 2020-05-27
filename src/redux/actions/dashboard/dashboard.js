import {
  TOGGLE_SIDEBAR,
  SET_IS_SENDING_CASH,
  SET_IS_SENDING_MONEY,
  SET_MANAGE_CONTACTS,
  SET_IS_SENDING_OTHERS,
  SET_IS_TOPING_UP,
} from 'constants/action-types/dashboard';

const toggleSidebar = dispatch => {
  return dispatch({
    type: TOGGLE_SIDEBAR,
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
export default toggleSidebar;
