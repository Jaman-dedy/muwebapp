import {
  GET_CREDIT_CARD_OPTION_START,
  GET_CREDIT_CARD_OPTION_SUCCESS,
  GET_CREDIT_CARD_OPTION_ERROR,
} from 'constants/action-types/credit-card/getOptions';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetCreditCardOptions',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_CREDIT_CARD_OPTION_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_CREDIT_CARD_OPTION_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_CREDIT_CARD_OPTION_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
