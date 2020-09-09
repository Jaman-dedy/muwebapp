import { toast } from 'react-toastify';
import {
  UN_BOOKMARK_SERVICE_ERROR,
  UN_BOOKMARK_SERVICE_START,
  UN_BOOKMARK_SERVICE_SUCCESS,
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
          type: UN_BOOKMARK_SERVICE_START,
          payload: { ...requestData, ...options },
        }),
      onSuccess: data => dispatch => {
        toast.success(
          global.translate('Removed from your saved items', 2117),
        );

        return dispatch({
          type: UN_BOOKMARK_SERVICE_SUCCESS,
          payload: { data: data[0], requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: UN_BOOKMARK_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
