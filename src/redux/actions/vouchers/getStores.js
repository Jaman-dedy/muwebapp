import {
  GET_STORE_START,
  GET_STORE_SUCCESS,
  GET_STORE_ERROR,
} from 'constants/action-types/vouchers/stores';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddWallet',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_STORE_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_STORE_SUCCESS,
          payload: {
            data,
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_STORE_ERROR,
          payload: error,
        });
      },
    }),
  );
