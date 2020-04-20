import {
  ADD_MONEY_FROM_CREDIT_CARD_START,
  ADD_MONEY_FROM_CREDIT_CARD_SUCCESS,
  ADD_MONEY_FROM_CREDIT_CARD_ERROR,
} from 'constants/action-types/addMoney/addMoneyFromCreditCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddMoneyFromCreditCard',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_MONEY_FROM_CREDIT_CARD_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: ADD_MONEY_FROM_CREDIT_CARD_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: ADD_MONEY_FROM_CREDIT_CARD_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_MONEY_FROM_CREDIT_CARD_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
