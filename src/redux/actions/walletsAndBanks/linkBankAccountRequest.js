import { toast } from 'react-toastify';
import {
  LINK_BANK_ACCOUNT_REQUEST_FAILURE,
  LINK_BANK_ACCOUNT_REQUEST_START,
  LINK_BANK_ACCOUNT_REQUEST_SUCCESS,
  CLEAR_LINK_ACCOUNT_REQUEST,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/LinkBankAccountRequest',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: LINK_BANK_ACCOUNT_REQUEST_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: LINK_BANK_ACCOUNT_REQUEST_SUCCESS,
          payload: {
            data: Array.isArray(data) ? data[0] : data || {},
            success:
              Array.isArray(data) && data[0]?.Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        if (Array.isArray(error)) {
          toast.error(error[0]?.Description);
        }
        return dispatch({
          type: LINK_BANK_ACCOUNT_REQUEST_FAILURE,
          payload: {
            error: Array.isArray(error) ? error[0] : error || {},
          },
        });
      },
    }),
  );

export const clearLinkAccountRequest = () => dispatch => {
  return dispatch({ type: CLEAR_LINK_ACCOUNT_REQUEST });
};
