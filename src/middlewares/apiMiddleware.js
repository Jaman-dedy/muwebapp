import axiosHelper from 'helpers/axiosHelper';
import { API_REQUEST } from 'constants/apiActions';
import handleAxiosError from 'helpers/handleAxiosError';

export default ({ dispatch, getState }) => next => async ({
  type = '',
  payload = {},
}) => {
  if (type !== API_REQUEST) {
    return next({ type, payload });
  }
  try {
    await payload.onStart()(dispatch);

    const { data } = await axiosHelper(payload.httpOptions).request({
      method: payload.method.toLowerCase(),
      url: payload.url,
      data: payload.data,
      params: payload.queries,
    });

    await payload.onSuccess(data)(dispatch);
  } catch (e) {
    const error = handleAxiosError(e);
    await payload.onFailure(error)(dispatch);
  }
  await payload.onEnd()(dispatch);
  return getState();
};
