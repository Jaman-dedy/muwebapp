import { toast } from 'react-toastify';
import {
  ADD_PUBLICITY_START,
  ADD_PUBLICITY_SUCCESS,
  ADD_PUBLICITY_ERROR,
  CLEAR_ADD_PUBLICITY_STORE,
} from 'constants/action-types/publicity';

import apiAction from 'helpers/apiAction';

export default (requestData, isEditing) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/CreateUpdateADCampaign',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_PUBLICITY_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: ADD_PUBLICITY_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
            isEditing,
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(global.translate(error[0].Description));
        return dispatch({
          type: ADD_PUBLICITY_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
};

export const restoreAddPublicity = () => dispatch => {
  dispatch({
    type: CLEAR_ADD_PUBLICITY_STORE,
  });
};
