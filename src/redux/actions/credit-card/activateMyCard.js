import { toast } from 'react-toastify';
import {
  ACTIVATE_CREDIT_CARD_START,
  ACTIVATE_CREDIT_CARD_SUCCESS,
  ACTIVATE_CREDIT_CARD_ERROR,
  CLEAR_ACTIVATE_CREDIT_CARD_STORE,
} from 'constants/action-types/credit-card/activateCreditCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/CreditCardReceived',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ACTIVATE_CREDIT_CARD_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          toast.success(data[0].Description);
          return dispatch({
            type: ACTIVATE_CREDIT_CARD_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: ACTIVATE_CREDIT_CARD_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: ACTIVATE_CREDIT_CARD_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
export const clearActivateCard = () => dispatch => {
  return dispatch({
    type: CLEAR_ACTIVATE_CREDIT_CARD_STORE,
  });
};
