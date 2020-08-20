import {
  CONFIRM_TRANSACTION_ERROR,
  CONFIRM_TRANSACTION_START,
  CONFIRM_TRANSACTION_SUCCESS,
  CLEAR_TRANSACTION_INFO,
} from 'constants/action-types/moneyTransfer';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/TransferConfirmation',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: CONFIRM_TRANSACTION_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: CONFIRM_TRANSACTION_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CONFIRM_TRANSACTION_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearConfirmation = () => dispatch => {
  return dispatch({
    type: CLEAR_TRANSACTION_INFO,
  });
};
