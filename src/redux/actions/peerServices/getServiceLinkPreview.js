import Axios from 'axios';
import {
  GET_SERVICE_LINK_PREVIEW_SUCCESS,
  GET_SERVICE_LINK_PREVIEW_ERROR,
  GET_SERVICE_LINK_PREVIEW_START,
} from 'constants/action-types/peerServices';

export default (url, serviceId) => async dispatch => {
  const { REACT_APP_PREVIEW_SERVICES_URL } = process.env;

  dispatch({
    type: GET_SERVICE_LINK_PREVIEW_START,
    payload: serviceId,
  });

  try {
    const {
      data,
    } = await Axios.post(
      `${REACT_APP_PREVIEW_SERVICES_URL}/api/metatags`,
      { urls: [url] },
    );
    dispatch({
      type: GET_SERVICE_LINK_PREVIEW_SUCCESS,
      payload: { serviceId, ...data.data[0], url },
    });
  } catch (err) {
    dispatch({
      type: GET_SERVICE_LINK_PREVIEW_ERROR,
      payload: { url, serviceId, err },
    });
  }
};
