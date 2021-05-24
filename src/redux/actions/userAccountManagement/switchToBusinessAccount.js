import { toast } from 'react-toastify';
import {
  SWITCH_TO_BUSINESS_ACCOUNT_START,
  SWITCH_TO_BUSINESS_ACCOUNT_FAILURE,
  SWITCH_TO_BUSINESS_ACCOUNT_SUCCESS,
  CLEAR_SWITCH_ACCOUNT_DATA,
} from 'constants/action-types/userAccountManagement/switchToBusinessAccount';
import { UPDATE_USER_BUSINESS_DATA } from 'constants/action-types/users/getUserInfo';
import apiAction from 'helpers/apiAction';

export default requestData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateBusinessAccountData',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: SWITCH_TO_BUSINESS_ACCOUNT_START,
        }),
      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data[0] || {} : data || {};
        toast.success(res?.Description);
        dispatch({
          type: SWITCH_TO_BUSINESS_ACCOUNT_SUCCESS,
          payload: {
            ...res,
            success: res.Result === 'Success',
          },
        });
        dispatch({
          type: UPDATE_USER_BUSINESS_DATA,
          payload: {
            BusinessExtraKYC: {
              CreationDate: requestData.CreationDate,
              CompanyName: requestData.CompanyName,
              ShortName: requestData.ShortName,
              CompanyType: requestData.CompanyType,
              Activity: requestData.Activity,
              TIN: requestData.TIN,
              RegistrationNumber: requestData.RegistrationNumber,
              CountryCode: requestData.CountryCode,
              City: requestData.City,
              Address: requestData.Address,
              VATNumber: requestData.VATNumber,
              SwitchDate: new Date(),
            },
          },
        });
      },
      onFailure: error => dispatch => {
        const err = Array.isArray(error)
          ? error[0] || {}
          : error || {};
        toast.error(error?.[0].Description);
        return dispatch({
          type: SWITCH_TO_BUSINESS_ACCOUNT_FAILURE,
          payload: {
            ...err,
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
