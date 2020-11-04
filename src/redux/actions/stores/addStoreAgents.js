import { toast } from 'react-toastify';
import {
  ADD_STORE_AGENTS_ERROR,
  ADD_STORE_AGENTS_START,
  ADD_STORE_AGENTS_SUCCESS,
} from 'constants/action-types/stores/addStoreAgents';

import apiAction from 'helpers/apiAction';

export default data => dispatch => callback => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/AddStoreAgent',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_STORE_AGENTS_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(
          global.translate('Your agent is added successfully.'),
        );

        callback();
        return dispatch({
          type: ADD_STORE_AGENTS_SUCCESS,
          payload: { data: data[0] },
        });
      },
      onFailure: error => dispatch => {
        toast.error(
          error?.[0]
            ? global.translate(error?.[0].Description)
            : global.translate(error?.error),
        );
        return dispatch({
          type: ADD_STORE_AGENTS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
