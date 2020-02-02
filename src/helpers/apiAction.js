import * as apiActionTypes from 'constants/apiActions';

export default ({
  url = '',
  method = 'GET',
  data = null,
  queries = null,
  resType = 'json',
  onStart = () => dispatch =>
    dispatch({
      type: apiActionTypes.API_REQUEST_START,
      payload: { loading: true },
    }),
  onSuccess = () => dispatch =>
    dispatch({
      type: apiActionTypes.API_REQUEST_SUCCESS,
      payload: { loading: false },
    }),
  onFailure = () => dispatch =>
    dispatch({
      type: apiActionTypes.API_REQUEST_FAILURE,
      payload: { loading: false },
    }),
  onEnd = () => dispatch =>
    dispatch({
      type: apiActionTypes.API_REQUEST_END,
      payload: { loading: false },
    }),
}) => {
  if (queries) {
    Object.keys(queries).forEach(key => {
      queries[key] =
        typeof queries[key] === 'string'
          ? queries[key].trim()
          : queries[key];
      return queries[key] || delete queries[key];
    });
  }

  return {
    type: apiActionTypes.API_REQUEST,
    payload: {
      url,
      method,
      resType,
      data,
      queries,
      onStart,
      onSuccess,
      onFailure,
      onEnd,
    },
  };
};
