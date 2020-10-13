import {
  LOCATE_WALLET_START,
  LOCATE_WALLET_SUCCESS,
  LOCATE_WALLET_ERROR,
  CLEAR_FOUND_WALLET,
} from 'constants/action-types/users/locateWallet';

import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/LocateWallet',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: LOCATE_WALLET_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: LOCATE_WALLET_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: LOCATE_WALLET_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
};
export const clearFoundUser = () => dispatch => {
  return dispatch({
    type: CLEAR_FOUND_WALLET,
  });
};
