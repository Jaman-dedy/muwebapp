import { toast } from 'react-toastify';
import {
  BLOCK_UNBLOCK_START,
  BLOCK_UNBLOCK_SUCCESS,
  BLOCK_UNBLOCK_ERROR,
  CLEAR_BLOCK_UNBLOCK,
} from 'constants/action-types/contacts';

import apiAction from 'helpers/apiAction';

export default (requestData, contact) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/BlockContact',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: BLOCK_UNBLOCK_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(global.translate(data[0].Description));
        return dispatch({
          type: BLOCK_UNBLOCK_SUCCESS,
          payload: { data, requestData, contact },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: BLOCK_UNBLOCK_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearBlockSuccess = () => dispatch => {
  return dispatch({ type: CLEAR_BLOCK_UNBLOCK });
};
