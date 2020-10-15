import { toast } from 'react-toastify';
import {
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  RESTORE_REGISTER_USER,
} from 'constants/action-types/users/registerUser';
import { RESTORE_COUNTRY_CURRENCIES } from 'constants/action-types/users/countryCurrencies';

import apiAction from 'helpers/apiAction';
import countryCodes from 'utils/countryCodes';

export const restoreRegisterUser = () => dispatch => {
  dispatch({
    type: RESTORE_REGISTER_USER,
  });
  dispatch({
    type: RESTORE_COUNTRY_CURRENCIES,
  });
};

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/CreateFullUserAccount',
      data: {
        FirstName: data.firstName,
        LastName: data.lastName,
        PhoneNumber: `${data.countryCode}${data.phoneNumber}`,
        PIN: data.pin,
        Password: data.password,
        PID: data.personalId,
        EMail: data.email || '',
        CountryCode:
          countryCodes
            .find(({ value }) => value === data.countryCode)
            .key.toUpperCase() || '',
        ContactPID: data.ContactPID || '',
      },
      onStart: () => dispatch =>
        dispatch({
          type: REGISTER_USER_START,
        }),
      onSuccess: data => dispatch => {
        const result = data?.[0] || {};
        if (result.Result === 'Success') {
          // restoreRegisterUser()(dispatch);
          return dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: {
              success: result.Result === 'Success',
              message: result.Description,
              username: result.UserName,
              Wallets: result.Wallets,
            },
          });
        }
        toast.error(result.Description);
        return dispatch({
          type: REGISTER_USER_ERROR,
          payload: {
            error: result,
          },
        });
      },
      onFailure: error => dispatch => {
        if (error.Description || error.message) {
          toast.error(
            global.translate(error.Description || error.message),
          );
        }
        return dispatch({
          type: REGISTER_USER_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
