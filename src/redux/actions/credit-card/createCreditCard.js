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
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          toast.success(data[0].Description);
          return dispatch({
            type: CREATE_CREDIT_CARD_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: CREATE_CREDIT_CARD_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CREATE_CREDIT_CARD_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const clearAddCreditCard = () => dispatch => {
  return dispatch({
    type: CLEAR_CREATE_CREDIT_CARD_STORE,
  });
};
