/* eslint-disable camelcase */
import {
  UPDATE_CAMPAIGN_vIEWS_COUNT_ERROR,
  UPDATE_CAMPAIGN_vIEWS_COUNT_START,
  UPDATE_CAMPAIGN_vIEWS_COUNT_SUCCESS,
} from 'constants/action-types/publicity';

import apiAction from 'helpers/apiAction';

export default data => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/UpdateCampaignViewsCount',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: UPDATE_CAMPAIGN_vIEWS_COUNT_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: UPDATE_CAMPAIGN_vIEWS_COUNT_SUCCESS,
          payload: data,
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UPDATE_CAMPAIGN_vIEWS_COUNT_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
