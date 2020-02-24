import {
  GET_CARD_OPERATION_FEES_START,
  GET_CARD_OPERATION_FEES_SUCCESS,
  GET_CARD_OPERATION_FEES_ERROR,
} from 'constants/action-types/addMoney/getCardOperationFees';
import apiAction from 'helpers/apiAction';

export default ({ Amount, Currency }) => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/CardOperationFees',
      data: {
        Amount,
        Currency,
      },
      onStart: () => dispatch =>
        dispatch({
          type: GET_CARD_OPERATION_FEES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_CARD_OPERATION_FEES_SUCCESS,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_CARD_OPERATION_FEES_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
