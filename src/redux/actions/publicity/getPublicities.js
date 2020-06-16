import {
  GET_PUBLICITIES_START,
  GET_PUBLICITIES_SUCCESS,
  GET_PUBLICITIES_ERROR,
} from 'constants/action-types/publicity';
import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/GetCampaignList',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: GET_PUBLICITIES_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: GET_PUBLICITIES_SUCCESS,
          payload: {
            data,
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: GET_PUBLICITIES_ERROR,
          payload: {
            error,
          },
        });
      },
    }),
  );
