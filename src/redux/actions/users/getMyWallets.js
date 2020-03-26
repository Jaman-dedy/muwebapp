import { toast } from 'react-toastify';

import {
  GET_MY_WALLETS_START,
  GET_MY_WALLETS_SUCCESS,
  GET_MY_WALLETS_ERROR,
} from 'constants/action-types/users/getMyWallets';

import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserWalletList',
      onStart: () => dispatch =>
        dispatch({
          type: GET_MY_WALLETS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_MY_WALLETS_SUCCESS,
          payload: {
            walletList: data,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(
          'A problem occurred, please try again !',
          JSON.stringify(error[0]),
        );
        return dispatch({
          type: GET_MY_WALLETS_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
