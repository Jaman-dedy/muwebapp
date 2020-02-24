import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export default (httpOptions = {}) => {
  const { token, url, headers } = httpOptions;
  const userToken = token || localStorage.token;
  const baseURL = url || REACT_APP_API_URL;

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      ...headers,
      From: userToken || undefined,
    },
  });

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (
        error.config &&
        error.response &&
        error.response.status === 401
      ) {
        if (
          error.response.data[0].Description.includes(
            'The Token has expired',
          )
        ) {
          axios
            .post(
              `${baseURL}/RefreshToken`,
              {},
              { headers: { From: userToken } },
            )
            .then(newInfo => {
              const { LiveToken, RefreshToken } = newInfo.data[0];
              localStorage.setItem('token', LiveToken);
              localStorage.setItem('refresh_token', RefreshToken);
              error.config.headers.From = LiveToken;
              return axios.request(error.config);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
