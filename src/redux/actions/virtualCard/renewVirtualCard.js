import {
  RENEW_VIRTUAL_CARD_START,
  RENEW_VIRTUAL_CARD_SUCCESS,
  RENEW_VIRTUAL_CARD_ERROR,
  CLEAR_RENEW_VIRTUAL_CARD_STORE,
} from 'constants/action-types/virtual-card/renewVirtualCard';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/RenewVirtualCard',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: RENEW_VIRTUAL_CARD_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: RENEW_VIRTUAL_CARD_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: RENEW_VIRTUAL_CARD_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: RENEW_VIRTUAL_CARD_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const clearRenewCardStatus = () => dispatch => {
  return dispatch({
    type: CLEAR_RENEW_VIRTUAL_CARD_STORE,
  });
};
