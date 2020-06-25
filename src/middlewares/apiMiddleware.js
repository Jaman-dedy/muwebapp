import { API_REQUEST } from 'constants/apiActions';
import checkExpiredTokenError from 'helpers/checkExpiredTokenError';
import refreshToken from 'redux/actions/users/refreshToken';
import handleAxiosError from 'helpers/handleAxiosError';
import axiosHelper from 'helpers/axiosHelper';

export default ({ dispatch, getState }) => next => async ({
  type = '',
  payload = {},
}) => {
  if (type !== API_REQUEST) {
    return next({ type, payload });
  }
  try {
    if (typeof payload.onStart === 'function') {
      await payload.onStart()(dispatch);
    }
    const { data } = await axiosHelper(payload.httpOptions).request({
      method: payload.method.toLowerCase(),
      url: payload.url,
      data: payload.data,
      params: payload.queries,
    });

    if (typeof payload.onSuccess === 'function') {
      await payload.onSuccess(data)(dispatch);
    }
  } catch (e) {
    const error = handleAxiosError(e);
    if (checkExpiredTokenError(error)) {
      refreshToken({ type, payload })(dispatch);
    } else if (typeof payload.onFailure === 'function') {
      await payload.onFailure(error)(dispatch);
    }
  }
  if (typeof payload.onEnd === 'function') {
    await payload.onEnd()(dispatch);
  }
  return getState();
};
