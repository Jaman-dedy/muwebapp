import {
  GET_DEFAULT_WALLET_START,
  GET_DEFAULT_WALLET_SUCCESS,
  GET_DEFAULT_WALLET_ERROR,
} from 'constants/action-types/wallet/getDefaultWallet';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'get',
      url: '/GetUserData',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_DEFAULT_WALLET_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_DEFAULT_WALLET_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_DEFAULT_WALLET_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
