import {
  GET_USER_LOCATION_DATA_START,
  GET_USER_LOCATION_DATA_SUCCESS,
  GET_USER_LOCATION_DATA_ERROR,
} from 'constants/action-types/users/userLocationData';

import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetLocationData',
      data: {},
      onStart: () => dispatch =>
        dispatch({
          type: GET_USER_LOCATION_DATA_START,
        }),
      onSuccess: data => dispatch => {
        localStorage.countryCode = data?.[0]?.CountryCode;
        localStorage.countryName = data?.[0]?.CountryName;
        return dispatch({
          type: GET_USER_LOCATION_DATA_SUCCESS,
          payload: {
            success: true,
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_USER_LOCATION_DATA_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
