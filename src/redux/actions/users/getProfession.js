import {
  GET_PROFESSION_START,
  GET_PROFESSION_SUCCESS,
  GET_PROFESSION_ERROR,
} from 'constants/action-types/users/getProfession';

import apiAction from 'helpers/apiAction';

export default language => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetProfessionList',
      language,
      onStart: () => dispatch =>
        dispatch({
          type: GET_PROFESSION_START,
        }),

      onSuccess: data => dispatch => {
        const res = Array.isArray(data) ? data || {} : data || {};
        return dispatch({
          type: GET_PROFESSION_SUCCESS,
          payload: res,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_PROFESSION_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
