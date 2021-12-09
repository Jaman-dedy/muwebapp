import {
  GET_PAY_PAL_FEES_START,
  GET_PAY_PAL_FEES_SUCCESS,
  GET_PAY_PAL_FEES_ERROR,
} from 'constants/action-types/addMoney/getPayPalFees';
import apiAction from 'helpers/apiAction';

export default ({ Amount, Currency }) => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/PayPalAddMoneyFees',
      data: {
        Amount,
        Currency,
      },
      onStart: () => dispatch =>
        dispatch({
          type: GET_PAY_PAL_FEES_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] || {} : data || {};
        return dispatch({
          type: GET_PAY_PAL_FEES_SUCCESS,
          payload: {
            ...res,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_PAY_PAL_FEES_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
