import {
  SAVE_BANK_ACCOUNT_START,
  SAVE_BANK_ACCOUNT_SUCCESS,
  SAVE_BANK_ACCOUNT_ERROR,
  CLEAR_SAVE_BANK_ACCOUNT_STORE,
} from 'constants/action-types/contacts/saveBankAccount';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SaveContactBankAccount',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: SAVE_BANK_ACCOUNT_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: SAVE_BANK_ACCOUNT_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: SAVE_BANK_ACCOUNT_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: SAVE_BANK_ACCOUNT_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const clearSaveBankAccount = () => dispatch => {
  return dispatch({
    type: CLEAR_SAVE_BANK_ACCOUNT_STORE,
  });
};
