import { toast } from 'react-toastify';
import {
  UNLINK_BANK_FAILURE,
  UNLINK_BANK_SUCCESS,
  UNLINK_BANK_START,
  REMOVE_UNLINKED_ACCOUNT,
  CLEAR_UNLINK_BANK,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UnLinkBankAccount',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: UNLINK_BANK_START,
        }),
      onSuccess: data => dispatch => {
        if (Array.isArray(data)) {
          toast.success(data[0]?.Description);
        }
        dispatch({
          type: UNLINK_BANK_SUCCESS,
          payload: {
            data: Array.isArray(data) ? data[0] : data || {},
            success:
              Array.isArray(data) && data[0].Result === 'Success',
          },
        });

        dispatch({
          type: REMOVE_UNLINKED_ACCOUNT,
          payload: {
            ...requestData,
          },
        });
      },
      onFailure: error => dispatch => {
        if (Array.isArray(error)) {
          toast.error(error[0]?.Description);
        }
        return dispatch({
          type: UNLINK_BANK_FAILURE,
          payload: {
            error: Array.isArray(error) ? error[0] : error || {},
          },
        });
      },
    }),
  );

export const clearUnlinkAccount = () => dispatch => {
  return dispatch({ type: CLEAR_UNLINK_BANK });
};
