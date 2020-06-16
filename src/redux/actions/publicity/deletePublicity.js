import {
  DELETE_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN_START,
  DELETE_CAMPAIGN_SUCCESS,
  CLEAR_DELETE_CAMPAIGN,
} from 'constants/action-types/publicity';

import apiAction from 'helpers/apiAction';

export default campaign => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/DeleteADCampaign',
      data: campaign,
      onStart: () => dispatch =>
        dispatch({
          type: DELETE_CAMPAIGN_START,
          payload: campaign,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: DELETE_CAMPAIGN_SUCCESS,
          payload: { data, campaign },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: DELETE_CAMPAIGN_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const clearDeletePublicity = () => dispatch => {
  dispatch({ type: CLEAR_DELETE_CAMPAIGN });
};
