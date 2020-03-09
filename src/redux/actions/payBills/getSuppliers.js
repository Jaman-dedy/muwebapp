import {
  GET_SUPPLIERS_START,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_ERROR,
} from 'constants/action-types/payBills/getSuppliers';
import apiAction from 'helpers/apiAction';

export default CountryCode => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetSuppliers',
      data: {
        CountryCode,
      },
      onStart: () => dispatch =>
        dispatch({
          type: GET_SUPPLIERS_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_SUPPLIERS_SUCCESS,
          payload: {
            suppliers: data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_SUPPLIERS_ERROR,
          payload: {
            error: error[0],
          },
        });
      },
    }),
  );
