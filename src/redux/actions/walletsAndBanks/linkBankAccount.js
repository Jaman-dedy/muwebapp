import { toast } from 'react-toastify';
import {
  LINK_BANK_ACCOUNT_FAILURE,
  LINK_BANK_ACCOUNT_SUCCESS,
  LINK_BANK_ACCOUNT_START,
  UPDATE_LINKED_BANK_LIST,
} from 'constants/action-types/walletsAndBanks/bankAccounts';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UserLinkBankAccount',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: LINK_BANK_ACCOUNT_START,
        }),
      onSuccess: data => dispatch => {
        if (Array.isArray(data)) {
          toast.success(data[0]?.Description);
        }
        dispatch({
          type: LINK_BANK_ACCOUNT_SUCCESS,
          payload: {
            data: Array.isArray(data) ? data[0] : data || {},
            success:
              Array.isArray(data) && data[0].Result === 'Success',
          },
        });

        dispatch({
          type: UPDATE_LINKED_BANK_LIST,
          payload: {
            update: true,
            data: { ...requestData, Status: '1', Linked: 'YES' },
          },
        });
      },
      onFailure: error => dispatch => {
        if (Array.isArray(error)) {
          toast.error(error[0]?.Description);
        }
        return dispatch({
          type: LINK_BANK_ACCOUNT_FAILURE,
          payload: {
            error: Array.isArray(error) ? error[0] : error || {},
          },
        });
      },
    }),
  );
