import {
  LIST_STORE_AGENTS_START,
  LIST_STORE_AGENTS_SUCCESS,
  LIST_STORE_AGENTS_ERROR,
} from 'constants/action-types/stores/listStoreAgents';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetStoreAgentsList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: LIST_STORE_AGENTS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: LIST_STORE_AGENTS_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: LIST_STORE_AGENTS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
