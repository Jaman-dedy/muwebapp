import {
  GET_SEARCHSTORE_START,
  GET_SEARCHSTORE_SUCCESS,
  GET_SEARCHSTORE_ERROR,
} from 'constants/action-types/vouchers/searchStore';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/SearchStore',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_SEARCHSTORE_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_SEARCHSTORE_SUCCESS,
          payload: {
            data,
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_SEARCHSTORE_ERROR,
          payload: error,
        });
      },
    }),
  );
