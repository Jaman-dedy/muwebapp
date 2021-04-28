import {
  GET_BUSINESS_TYPE_FAILURE,
  GET_BUSINESS_TYPE_SUCCESS,
  GET_BUSINESS_TYPE_START,
} from 'constants/action-types/userAccountManagement/switchToBusinessAccount';

import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetProfessionTypeList',
      onStart: () => dispatch =>
        dispatch({
          type: GET_BUSINESS_TYPE_START,
        }),
      onSuccess: data => dispatch => {
        dispatch({
          type: GET_BUSINESS_TYPE_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_BUSINESS_TYPE_FAILURE,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
