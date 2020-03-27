import {
  GET_APP_COUNTRIES_START,
  GET_APP_COUNTRIES_SUCCESS,
  GET_APP_COUNTRIES_ERROR,
} from 'constants/action-types/countries';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/OssixCountries',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_APP_COUNTRIES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_APP_COUNTRIES_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_APP_COUNTRIES_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
