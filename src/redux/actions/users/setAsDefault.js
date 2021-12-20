import { toast } from 'react-toastify';
import {
  SET_DEFAULT_WALLET_START,
  SET_DEFAULT_WALLET_SUCCESS,
  SET_DEFAULT_WALLET_ERROR,
  SET_DEFAULT_WALLET_CLEAR,
} from 'constants/action-types/users/setAsDefault';

import apiAction from 'helpers/apiAction';

export default (data, walletDetails) => dispatch => {
  dispatch(
    apiAction({
      method: 'post',
      url: '/SetAsDefault',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: SET_DEFAULT_WALLET_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(
          `${data[0].NewDefaultWallet} ${global.translate(
            'is set as your default wallet.',
            165,
          )}`,
        );
        return dispatch({
          type: SET_DEFAULT_WALLET_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
            defaultWallet: data[0].NewDefaultWallet,
            walletDetails,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error && error[0] && error[0].Description);
        return dispatch({
          type: SET_DEFAULT_WALLET_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
};
export const clearSetDefaultWallet = () => dispatch =>
  dispatch({
    type: SET_DEFAULT_WALLET_CLEAR,
  });
