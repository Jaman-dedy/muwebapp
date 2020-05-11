import {
  DELETE_STORE_ERROR,
  DELETE_STORE_START,
  DELETE_STORE_SUCCESS,
  CLEAR_DELETE_STORE,
} from 'constants/action-types/stores/deleteStore';

import apiAction from 'helpers/apiAction';

export default store => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/DeleteStore',
      data: store,
      onStart: () => dispatch =>
        dispatch({
          type: DELETE_STORE_START,
          payload: store,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: DELETE_STORE_SUCCESS,
          payload: { data, store },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: DELETE_STORE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearDeleteStore = () => dispatch => {
  dispatch({ type: CLEAR_DELETE_STORE });
};
