import { toast } from 'react-toastify';

import {
  ADD_UPDATE_STORE_START,
  ADD_UPDATE_STORE_SUCCESS,
  ADD_UPDATE_STORE_ERROR,
} from 'constants/action-types/stores/addUpdateStore';

import apiAction from 'helpers/apiAction';

export default (requestData, isEditing) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/AddUpdateStore',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_UPDATE_STORE_START,
        }),
      onSuccess: data => dispatch => {
        toast.success(
          global.translate('Your store data is saved.', 913),
        );
        return dispatch({
          type: ADD_UPDATE_STORE_SUCCESS,
          payload: {
            ...data[0],
            StoreBanner: requestData?.BannerURL,
            StoreLogo: requestData?.LogoURL,
            success: data[0].Result === 'Success',
            isEditing,
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
};
