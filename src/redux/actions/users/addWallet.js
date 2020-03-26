import {
  ADD_WALLET_START,
  ADD_WALLET_SUCCESS,
  ADD_WALLET_ERROR,
} from 'constants/action-types/users/addWallet';

import apiAction from 'helpers/apiAction';

export default walletData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddWallet',
      data: JSON.stringify(walletData, null, 4),
      requireAppId: false,
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_WALLET_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_WALLET_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
            NewWallet: walletData,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_WALLET_ERROR,
          payload: error,
        });
      },
    }),
  );
