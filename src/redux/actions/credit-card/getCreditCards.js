import {
  GET_CREDIT_CARD_LIST_START,
  GET_CREDIT_CARD_LIST_SUCCESS,
  GET_CREDIT_CARD_LIST_ERROR,
} from 'constants/action-types/credit-card/getCreditCards';

import apiAction from 'helpers/apiAction';

export default () => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetCreditCardList',
      onStart: () => dispatch =>
        dispatch({
          type: GET_CREDIT_CARD_LIST_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_CREDIT_CARD_LIST_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_CREDIT_CARD_LIST_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
