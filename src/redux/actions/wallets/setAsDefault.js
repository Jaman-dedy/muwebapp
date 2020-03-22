import { toast } from 'react-toastify';
import {
  ADD_WALLET_START,
  ADD_WALLET_SUCCESS,
  ADD_WALLET_ERROR,
} from 'constants/action-types/wallet/addWallet';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SetAsDefault',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_WALLET_START,
        }),
      onSuccess: data => dispatch => {
        toast.success('Default wallet : ' + data[0].NewDefaultWallet);
        return dispatch({
          type: ADD_WALLET_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: ADD_WALLET_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
