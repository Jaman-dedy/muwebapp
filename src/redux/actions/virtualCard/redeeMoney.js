import {
  REDEEM_MONEY_START,
  REDEEM_MONEY_SUCCESS,
  REDEEM_MONEY_ERROR,
  CLEAR_REDEEM_MONEY_STORE,
} from 'constants/action-types/virtual-card/redeeMoney';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/RedeemVirtualCardBalance',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: REDEEM_MONEY_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: REDEEM_MONEY_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: REDEEM_MONEY_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: REDEEM_MONEY_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const clearRedeeMoney = () => dispatch => {
  return dispatch({
    type: CLEAR_REDEEM_MONEY_STORE,
  });
};
