import { toast } from 'react-toastify';
import {
  EDIT_CREDIT_CARD_START,
  EDIT_CREDIT_CARD_SUCCESS,
  EDIT_CREDIT_CARD_ERROR,
  CLEAR_EDIT_CREDIT_CARD,
} from 'constants/action-types/credit-card/editCreditCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/ChangeCardPIN',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: EDIT_CREDIT_CARD_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          toast.success(data[0].Description);
          return dispatch({
            type: EDIT_CREDIT_CARD_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: EDIT_CREDIT_CARD_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: EDIT_CREDIT_CARD_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
export const clearChangeCard = () => dispatch => {
  return dispatch({
    type: CLEAR_EDIT_CREDIT_CARD,
  });
};
