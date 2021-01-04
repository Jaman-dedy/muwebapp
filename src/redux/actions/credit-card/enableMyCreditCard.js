import { toast } from 'react-toastify';
import {
  ENABLE_CREDIT_CARD_START,
  ENABLE_CREDIT_CARD_SUCCESS,
  ENABLE_CREDIT_CARD_ERROR,
  CLEAR_ENABLE_CREDIT_CARD_STORE,
} from 'constants/action-types/credit-card/enableCreditCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/EnableCreditCard',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ENABLE_CREDIT_CARD_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          toast.success(data[0].Description);
          return dispatch({
            type: ENABLE_CREDIT_CARD_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: ENABLE_CREDIT_CARD_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: ENABLE_CREDIT_CARD_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
export const clearEnableCard = () => dispatch => {
  return dispatch({
    type: CLEAR_ENABLE_CREDIT_CARD_STORE,
  });
};
