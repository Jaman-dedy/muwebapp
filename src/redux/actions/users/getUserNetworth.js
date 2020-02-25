import {
  GET_USER_NETWORTH_ERROR,
  GET_USER_NETWORTH_START,
  GET_USER_NETWORTH_SUCCESS,
} from 'constants/action-types/users/getUserNetworth';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserNetWorth',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_USER_NETWORTH_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_USER_NETWORTH_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_USER_NETWORTH_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
};
