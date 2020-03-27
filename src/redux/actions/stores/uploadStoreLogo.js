import { toast } from 'react-toastify';

import {
  UPLOAD_STORE_LOGO_START,
  UPLOAD_STORE_LOGO_SUCCESS,
  UPLOAD_STORE_LOGO_ERROR,
} from 'constants/action-types/stores/uploadStoreLogo';

import apiAction from 'helpers/apiAction';

export default MediaSourceURL => dispatch =>
  dispatch(
    apiAction({
      method: 'post',
      url: '/UploadBusinessPicture',
      data: {
        MediaSourceURL,
      },
      onStart: () => dispatch =>
        dispatch({
          type: UPLOAD_STORE_LOGO_START,
        }),
      onSuccess: data => dispatch => {
        return dispatch({
          type: UPLOAD_STORE_LOGO_SUCCESS,
          payload: {
            ...data[0],
            success: data[0].Result === 'Success',
          },
        });
      },
      onFailure: error => dispatch => {
        toast.error(error[0].Description);
        return dispatch({
          type: UPLOAD_STORE_LOGO_ERROR,
          payload: {
            ...error[0],
          },
        });
      },
    }),
  );
