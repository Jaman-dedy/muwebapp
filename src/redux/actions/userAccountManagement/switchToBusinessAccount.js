import { toast } from 'react-toastify';
import {
  SWITCH_TO_BUSINESS_ACCOUNT_START,
  SWITCH_TO_BUSINESS_ACCOUNT_FAILURE,
  SWITCH_TO_BUSINESS_ACCOUNT_SUCCESS,
  CLEAR_SWITCH_ACCOUNT_DATA,
} from 'constants/action-types/userAccountManagement/switchToBusinessAccount';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SwitchToBusinessAccount',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: SWITCH_TO_BUSINESS_ACCOUNT_START,
        }),
      onSuccess: data => dispatch => {
        if (Array.isArray(data)) {
          toast.success(data[0]?.Description);
        }
        dispatch({
          type: SWITCH_TO_BUSINESS_ACCOUNT_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        if (Array.isArray(error)) {
          toast.error(error?.[0].Description);
        }
        return dispatch({
          type: SWITCH_TO_BUSINESS_ACCOUNT_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const clearSwitchAccountData = () => dispatch => {
  return dispatch({
    type: CLEAR_SWITCH_ACCOUNT_DATA,
  });
};
