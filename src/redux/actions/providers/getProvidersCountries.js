import {
    GET_COUNTRY_LIST_START,
    GET_COUNTRY_LIST_SUCCESS,
    GET_COUNTRY_LIST_ERROR,
  } from 'constants/action-types/providers/countries/countriesList.js';
  import apiAction from 'helpers/apiAction';
  
  export default () => dispatch =>
    dispatch(
      apiAction({
        method: 'post',
        url: '/MNOCountryList',
        
        onStart: () => dispatch =>
          dispatch({
            type: GET_COUNTRY_LIST_START,
          }),
        onSuccess: data => dispatch => {
          return dispatch({
            type: GET_COUNTRY_LIST_SUCCESS,
            payload:  data,
            
          });
        },
        onFailure: error => dispatch => {
          return dispatch({
            type: GET_COUNTRY_LIST_ERROR,
            payload: error[0],
            
          });
        },
      }),
    );