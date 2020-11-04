import { toast } from 'react-toastify';
import {
  DELETE_STORE_AGENTS_ERROR,
  DELETE_STORE_AGENTS_START,
  DELETE_STORE_AGENTS_SUCCESS,
} from 'constants/action-types/stores/deleteStoreAgent';

import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/AddStoreAgent',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: DELETE_STORE_AGENTS_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(
          global.translate('The agent is removed successfully.'),
        );

        return dispatch({
          type: DELETE_STORE_AGENTS_SUCCESS,
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
          type: DELETE_STORE_AGENTS_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
