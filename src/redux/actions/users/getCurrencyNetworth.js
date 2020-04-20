import {
  GET_CURRENCY_NETWORTH_ERROR,
  GET_CURRENCY_NETWORTH_START,
  GET_CURRENCY_NETWORTH_SUCCESS,
} from 'constants/action-types/users/getUserNetworth';
import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  const requestData = data.item && data.item;
  return dispatch(
    apiAction({
      method: 'post',
      url: '/GetUserNetWorth',
      data,
      onStart: () => dispatch =>
        dispatch({
          payload: requestData,
          type: GET_CURRENCY_NETWORTH_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_CURRENCY_NETWORTH_SUCCESS,
          payload: {
            data,
            requestData,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_CURRENCY_NETWORTH_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
};
