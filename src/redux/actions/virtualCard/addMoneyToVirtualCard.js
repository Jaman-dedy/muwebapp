import {
  ADD_MONEY_TO_VIRTUAL_CARD_START,
  ADD_MONEY_TO_VIRTUAL_CARD_SUCCESS,
  ADD_MONEY_TO_VIRTUAL_CARD_ERROR,
  CLEAR_ADD_MONEY_TO_VIRTUAL_CARD_STORE,
} from 'constants/action-types/virtual-card/addMoneyToVirtualCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddMoneyToVirtualCard',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_MONEY_TO_VIRTUAL_CARD_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: ADD_MONEY_TO_VIRTUAL_CARD_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: ADD_MONEY_TO_VIRTUAL_CARD_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_MONEY_TO_VIRTUAL_CARD_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const clearAddMoneyToVirtuaCard = () => dispatch => {
  return dispatch({
    type: CLEAR_ADD_MONEY_TO_VIRTUAL_CARD_STORE,
  });
};
