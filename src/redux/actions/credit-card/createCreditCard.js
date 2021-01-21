import { toast } from 'react-toastify';
import {
  CREATE_CREDIT_CARD_START,
  CREATE_CREDIT_CARD_SUCCESS,
  CREATE_CREDIT_CARD_ERROR,
  CLEAR_CREATE_CREDIT_CARD_STORE,
} from 'constants/action-types/credit-card/createCreditCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddCreditCard',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: CREATE_CREDIT_CARD_START,
        }),
      onSuccess: ([data]) => dispatch => {
        toast.success(data.Description);
        return dispatch({
          type: CREATE_CREDIT_CARD_SUCCESS,
          payload: {
            ...data,
            success: data.Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CREATE_CREDIT_CARD_ERROR,
          payload: Array.isArray(error)
            ? {
                ...error[0],
              }
            : error,
        });
      },
    }),
  );

export const clearAddCreditCard = () => dispatch => {
  return dispatch({
    type: CLEAR_CREATE_CREDIT_CARD_STORE,
  });
};
