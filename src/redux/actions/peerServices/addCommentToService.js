import { toast } from 'react-toastify';
import {
  ADD_COMMENT_TO_SERVICE_ERROR,
  ADD_COMMENT_TO_SERVICE_START,
  ADD_COMMENT_TO_SERVICE_SUCCESS,
} from 'constants/action-types/peerServices';
import apiAction from 'helpers/apiAction';
import { REPORT_SERVICE_COMMENT } from 'constants/general';
import { CONTENT_REVIEW } from 'constants/events/backOffice';
import createNotification from '../users/createNotification';

export default (requestData, options) => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSAddComment',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: ADD_COMMENT_TO_SERVICE_START,
          payload: { ...requestData, ...options },
        }),
      onSuccess: data => dispatch => {
        toast.success(global.translate(data[0].Description));
        const payload = {
          PID: process.env.REACT_APP_BACK_OFFICE_USER_PID,
          type: CONTENT_REVIEW,
          description: 'New comment published',
          url: '',
          data: {
            ID: data?.[0]?.ServiceID,
            ItemNumber: '4',
            type: REPORT_SERVICE_COMMENT,
          },
          save: true,
        };

        createNotification(payload)(dispatch);

        return dispatch({
          type: ADD_COMMENT_TO_SERVICE_SUCCESS,
          payload: { data: data[0], requestData, ...options.comment },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: ADD_COMMENT_TO_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
