import { toast } from 'react-toastify';
import {
  SELF_LINK_BANK_ACCOUNT_FAILURE,
  SELF_LINK_BANK_ACCOUNT_START,
  SELF_LINK_BANK_ACCOUNT_SUCCESS,
  UPDATE_LINKED_BANK_LIST,
  CLEAR_SELF_LINK_BANK,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SelfLinkBankAccount',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: SELF_LINK_BANK_ACCOUNT_START,
        }),
      onSuccess: data => dispatch => {
        if (Array.isArray(data)) {
          toast.success(data[0]?.Description);
        }
        console.log(`requestData`, requestData);
        dispatch({
          type: SELF_LINK_BANK_ACCOUNT_SUCCESS,
          payload: {
            data: { ...data, ...requestData },
            success:
              Array.isArray(data) && data[0]?.Result === 'Success',
          },
        });
        dispatch({
          type: UPDATE_LINKED_BANK_LIST,
          payload: {
            data: {
              ...requestData,
              ...data[0],
              Linked: 'YES',
              Status: '1',
            },
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: SELF_LINK_BANK_ACCOUNT_FAILURE,
          payload: {
            error: Array.isArray(error) ? error[0] : error,
          },
        });
      },
    }),
  );

export const clearSelfLinkAccount = () => dispatch => {
  return dispatch({ type: CLEAR_SELF_LINK_BANK });
};
