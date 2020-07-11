import axios from 'axios';
import logout from './logout';

const { REACT_APP_API_URL } = process.env;

export default (httpOptions = {}) => {
  const { token, url, headers } = httpOptions;
  const userToken = token || localStorage.token;
  const baseURL = url || REACT_APP_API_URL;

  const headerss = {
    ...headers,
  };

  if (userToken) {
    headerss.From = userToken;
  }

  const axiosInstance = axios.create({
    baseURL,
    headers: headerss,
  });
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401) {
        if (error.response.data?.[0]?.UserMustBeLoggedOut === 'Yes') {
          localStorage.removeItem('token');
          window.location = '/login';
        }
      }

      if (
        error.response.status !== 401 ||
        (error.response.data &&
          !error.response.data[0].Description.includes('The Token'))
      ) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.config.url.endsWith('/RefreshToken')) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      const token = localStorage.getItem('refresh_token');
      if (token) {
        return axiosInstance
          .post(
            `${baseURL}/RefreshToken`,
            { RefreshToken: token },
            { From: userToken },
          )
          .then(token => {
            const { config } = error;
            if (token) {
              const { LiveToken, RefreshToken } = token.data[0];
              localStorage.setItem('token', LiveToken);
              localStorage.setItem('refresh_token', RefreshToken);
              error.config.headers.From = LiveToken;
            }
            return new Promise((resolve, reject) => {
              axiosInstance
                .request(config)
                .then(response => {
                  resolve(response);
                })
                .catch(error => {
                  reject(error);
                });
            });
          })
          .catch(error => {
            if (!error.response) {
              return new Promise((resolve, reject) => {
                reject(error);
              });
            }
            const { data } = error.response;
            if (
              data &&
              data[0].Description.includes(
                'The Token not found or has been deleted',
              )
            ) {
              logout();
            }
            return Promise.reject(error);
          });
      }
      return null;
    },
  );
  return axiosInstance;
};
