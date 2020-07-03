import {
  UPDATE_CARD_STATUS_START,
  UPDATE_CARD_STATUS_SUCCESS,
  UPDATE_CARD_STATUS_ERROR,
  CLEAR_UPDATE_CARD_STATUS_STORE,
} from 'constants/action-types/virtual-card/updateCardStatus';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateVirtualCardStatus',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_CARD_STATUS_START,
        }),
      onSuccess: data => dispatch => {
        if (data[0].Result === 'Success') {
          return dispatch({
            type: UPDATE_CARD_STATUS_SUCCESS,
            payload: {
              ...data[0],
              success: data[0].Result === 'Success',
            },
          });
        }
        return dispatch({
          type: UPDATE_CARD_STATUS_ERROR,
          payload: {
            ...data[0],
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_CARD_STATUS_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );

export const clearUpdateCardStatus = () => dispatch => {
  return dispatch({
    type: CLEAR_UPDATE_CARD_STATUS_STORE,
  });
};
