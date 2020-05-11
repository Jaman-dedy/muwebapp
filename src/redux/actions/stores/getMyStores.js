import {
  GET_MY_STORES_START,
  GET_MY_STORES_SUCCESS,
  GET_MY_STORES_ERROR,
} from 'constants/action-types/stores/getMyStores';
import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserStoreList',
      onStart: () => dispatch =>
        dispatch({
          type: GET_MY_STORES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_MY_STORES_SUCCESS,
          payload: {
            storeList: data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_MY_STORES_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
