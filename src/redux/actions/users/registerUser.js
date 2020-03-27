import { toast } from 'react-toastify';
import {
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from 'constants/action-types/users/registerUser';

import apiAction from 'helpers/apiAction';
import countryCodes from 'utils/countryCodes';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/CreateFullUserAccount',
      data: {
        FirstName: data.firstName,
        LastName: data.lastName,
        PhoneNumber: data.phoneNumber,
        PIN: data.pin,
        Password: data.password,
        PID: data.personalId,
        EMail: data.email || '',
        CountryCode:
          countryCodes
            .find(({ value }) => value === data.countryCode)
            .key.toUpperCase() || '',
      },
      onStart: () => dispatch =>
        dispatch({
          type: REGISTER_USER_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
            username: data[0].UserName,
            Wallets: data[0].Wallets,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: REGISTER_USER_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
