import {
  GET_REFERREES_LIST_START,
  GET_REFERREES_LIST_SUCCESS,
  GET_REFERREES_LIST_ERROR,
} from 'constants/action-types/contacts/getReferreesList';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetRefereesList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_REFERREES_LIST_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].ContactsFound === 'NO') {
          return dispatch({
            type: GET_REFERREES_LIST_SUCCESS,
            payload: [],
          });
        }
        return dispatch({
          type: GET_REFERREES_LIST_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_REFERREES_LIST_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
