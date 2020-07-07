import {
  RECENT_STORES_ERROR,
  RECENT_STORES_START,
  RECENT_STORES_SUCCESS,
} from 'constants/action-types/transactions/recentStores';

import apiAction from 'helpers/apiAction';

export default requestData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetRecentStoreList',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: RECENT_STORES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: RECENT_STORES_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: RECENT_STORES_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
