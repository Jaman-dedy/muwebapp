import { toast } from 'react-toastify';
import {
  TRANSFER_TO_OTHERS_ERROR,
  TRANSFER_TO_OTHERS_START,
  TRANSFER_TO_OTHERS_SUCCESS,
  CLEAR_TRANSFER_TO_OTHERS_ERRORS,
} from 'constants/action-types/moneyTransfer';
import apiAction from 'helpers/apiAction';

export default (
  data,
  endpoint = '/TransferToOther',
  type = 'send-money',
) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: endpoint,
      data,
      onStart: () => dispatch =>
        dispatch({
          type: TRANSFER_TO_OTHERS_START,
          payload: data,
        }),
      onSuccess: data => dispatch => {
        if (data?.[0]?.Description || data?.[0]?.Result) {
          toast.success(
            global.translate(data[0].Description || data[0].Result),
          );
        }
        return dispatch({
          type: TRANSFER_TO_OTHERS_SUCCESS,
          payload: [{ ...data[0], type }],
        });
      },
      onFailure: error => dispatch => {
        if (error.Description || error.message) {
          toast.error(
            global.translate(error.Description || error.message),
          );
        }
        return dispatch({
          type: TRANSFER_TO_OTHERS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearTransferToOthersErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_TRANSFER_TO_OTHERS_ERRORS,
  });
};
