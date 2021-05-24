import {
  GET_LOAN_LIST_START,
  GET_LOAN_LIST_SUCCESS,
  GET_LOAN_LIST_ERROR,
} from 'constants/action-types/microloan/getLoanList';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetLoanList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_LOAN_LIST_START,
        }),
      onSuccess: data => dispatch => {
        const result = Array.isArray(data)
          ? data[0] || {}
          : data || {};
        return dispatch({
          type: GET_LOAN_LIST_SUCCESS,
          payload: result?.Data ? result : [],
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_LOAN_LIST_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
