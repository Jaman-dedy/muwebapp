import {
  GET_PROVIDERS_START,
  GET_PROVIDERS_SUCCESS,
  GET_PROVIDERS_ERROR,
} from 'constants/action-types/providers/countries/countriesList.js';
import apiAction from 'helpers/apiAction';

export default requestData => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/MNOList',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: GET_PROVIDERS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_PROVIDERS_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_PROVIDERS_ERROR,
          payload: error[0],
        });
      },
    }),
  );
