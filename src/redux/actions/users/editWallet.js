import {
  EDIT_WALLET_START,
  EDIT_WALLET_SUCCESS,
  EDIT_WALLET_ERROR,
} from 'constants/action-types/users/editWallet';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/RenameWallet',
      data: JSON.stringify(data, null, 4),
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: EDIT_WALLET_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: EDIT_WALLET_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: EDIT_WALLET_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
