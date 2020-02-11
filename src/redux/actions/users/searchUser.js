import { toast } from 'react-toastify';

import {
  SEARCH_USER_START,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from 'constants/action-types/users/searchUser';

import apiAction from 'helpers/apiAction';

export default userId => dispatch =>
  dispatch(
    apiAction({
      url: `/users/${userId || 0}`,
      onStart: () => dispatch =>
        dispatch({
          type: SEARCH_USER_START,
        }),
      onSuccess: data => dispatch =>
        dispatch({
          type: SEARCH_USER_SUCCESS,
          payload: data,
        }),
      onFailure: () => dispatch => {
        toast.error(`User with ID "${userId}" does not exist`);
        return dispatch({
          type: SEARCH_USER_FAILURE,
          payload: {
            error: `User with ID "${userId}" does not exist`,
          },
        });
      },
    }),
  );
