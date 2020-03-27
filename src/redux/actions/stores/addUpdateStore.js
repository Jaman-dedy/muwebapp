import { toast } from 'react-toastify';

import {
  ADD_UPDATE_STORE_START,
  ADD_UPDATE_STORE_SUCCESS,
  ADD_UPDATE_STORE_ERROR,
} from 'constants/action-types/stores/addUpdateStore';

import apiAction from 'helpers/apiAction';

export default data => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/AddUpdateStore',
      data,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_UPDATE_STORE_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(data[0].Description);
        return dispatch({
          type: ADD_UPDATE_STORE_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_UPDATE_STORE_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
