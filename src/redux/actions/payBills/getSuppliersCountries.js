import {
  GET_SUPPLIERS_COUNTRIES_START,
  GET_SUPPLIERS_COUNTRIES_SUCCESS,
  GET_SUPPLIERS_COUNTRIES_ERROR,
} from 'constants/action-types/payBills/getSuppliersCountries';
import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetSuppliersCountryList',
      onStart: () => dispatch =>
        dispatch({
          type: GET_SUPPLIERS_COUNTRIES_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Error) {
          return dispatch({
            type: GET_SUPPLIERS_COUNTRIES_ERROR,
            payload: {
              error: data[0],
            },
          });
        }

        return dispatch({
          type: GET_SUPPLIERS_COUNTRIES_SUCCESS,
          payload: {
            countries: data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_SUPPLIERS_COUNTRIES_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
