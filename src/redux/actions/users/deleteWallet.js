import { toast } from 'react-toastify';
import getUserCurrencies from 'redux/actions/users/getUserCurrencies';

import {
  DELETE_WALLET_START,
  DELETE_WALLET_ERROR,
  DELETE_WALLET_SUCCESS,
} from 'constants/action-types/users/deleteWallet';

import apiAction from 'helpers/apiAction';

export default (walletData, userData) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/DeleteWallet',
      data: walletData,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: DELETE_WALLET_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(
          global.translate('Wallet marked as deleted'),
        );

        if (userData.data) {
          getUserCurrencies({
            CountryCode: userData.data.Country,
          })(dispatch);
        }

        return dispatch({
          type: DELETE_WALLET_SUCCESS,
          payload: {
            deletedWallet: walletData,
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: DELETE_WALLET_ERROR,
          payload: error,
        });
      },
    }),
  );
};
