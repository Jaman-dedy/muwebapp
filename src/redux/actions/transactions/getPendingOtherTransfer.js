import {
  GET_PENDING_OTHER_ERROR,
  GET_PENDING_OTHER_START,
  GET_PENDING_OTHER_SUCCESS,
} from 'constants/action-types/transactions/getPendingOther';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/GetPendingOtherTransfer',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_PENDING_OTHER_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_PENDING_OTHER_SUCCESS,
          payload: data[0],
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_PENDING_OTHER_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
