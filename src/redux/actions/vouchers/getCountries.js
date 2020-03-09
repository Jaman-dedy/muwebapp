import {
  GET_COUNTRIES_START,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
} from 'constants/action-types/vouchers/countries';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/MNOCountryList',
      data,
      requireAppId: false,
      onStart: () => dispatch =>
        dispatch({
          type: GET_COUNTRIES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_COUNTRIES_SUCCESS,
          payload: {
            success: data[0].Result === 'Success',
            message: data[0].Description,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_COUNTRIES_ERROR,
          payload: error,
        });
      },
    }),
  );
