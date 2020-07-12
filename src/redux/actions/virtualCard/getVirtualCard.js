import {
  GET_MY_VIRTUAL_CARD_START,
  GET_MY_VIRTUAL_CARD_SUCCESS,
  GET_MY_VIRTUAL_CARD_ERROR,
} from 'constants/action-types/virtual-card/getVirtualCards';

import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetVirtualCardList',
      onStart: () => dispatch =>
        dispatch({
          type: GET_MY_VIRTUAL_CARD_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_MY_VIRTUAL_CARD_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_MY_VIRTUAL_CARD_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
