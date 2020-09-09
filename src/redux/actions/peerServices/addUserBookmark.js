import { toast } from 'react-toastify';
import {
  BOOKMARK_SERVICE_ERROR,
  BOOKMARK_SERVICE_START,
  BOOKMARK_SERVICE_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';

export default (requestData, options) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSAddRemoveBookMark',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: BOOKMARK_SERVICE_START,
          payload: { ...requestData, ...options },
        }),
      onSuccess: data => dispatch => {
        toast.success(global.translate('Added to saved items'));

        return dispatch({
          type: BOOKMARK_SERVICE_SUCCESS,
          payload: { data: data[0], requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: BOOKMARK_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
