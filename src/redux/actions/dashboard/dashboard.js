import {
  TOGGLE_SIDEBAR,
  SET_IS_SENDING_CASH,
  SET_IS_SENDING_MONEY,
  SET_MANAGE_CONTACTS,
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
export default toggleSidebar;
