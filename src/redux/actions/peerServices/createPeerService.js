import {
  CREATE_SERVICE_ERROR,
  CREATE_SERVICE_START,
  CREATE_SERVICE_SUCCESS,
} from 'constants/action-types/peerServices';
import { CONTENT_REVIEW } from 'constants/events/backOffice';
import { REPORT_SERVICE } from 'constants/general';
import apiAction from 'helpers/apiAction';
import createNotification from '../users/createNotification';

export default requestData => dispatch => {
  return dispatch(
    apiAction({
      method: 'post',
      url: '/PSAddUpdateService',
      data: requestData,
      onStart: () => dispatch =>
        dispatch({
          type: CREATE_SERVICE_START,
        }),
      onSuccess: data => dispatch => {
        const payload = {
          PID: process.env.REACT_APP_BACK_OFFICE_USER_PID,
          type: CONTENT_REVIEW,
          country: data[0].CountryCode,
          description: 'Service created',
          url: '',
          data: {
            ID: data[0].ServiceID,
            ItemNumber: '0',
            type: REPORT_SERVICE,
          },
          save: true,
        };

        createNotification(payload)(dispatch);

        return dispatch({
          type: CREATE_SERVICE_SUCCESS,
          payload: { data, requestData },
        });
      },
      onFailure: error => dispatch => {
        return dispatch({
          type: CREATE_SERVICE_ERROR,
          payload: {
            ...error,
          },
        });
      },
    }),
  );
};
export const uploadPeerServicesMediaStart = () => dispatch => {
  dispatch({
    type: CREATE_SERVICE_START,
  });
};
