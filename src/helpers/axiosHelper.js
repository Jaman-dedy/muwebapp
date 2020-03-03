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
          axiosInstance
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

// import axios from 'axios';

// const { REACT_APP_API_URL } = process.env;

// export default (httpOptions = {}) => {
//   const { token, url, headers } = httpOptions;
//   const userToken = token || localStorage.token;
//   const baseURL = url || REACT_APP_API_URL;
//   const axiosInstance = axios.create({
//     baseURL,
//     headers: {
//       ...headers,
//       From: userToken || undefined,
//     },
//   });

//   axiosInstance.interceptors.response.use(
//     response => {
//       return response;
//     },
//     error => {
//       if (!error.response) {
//         return Promise.reject(error);
//       }
//       if (error.response.status !== 401) {
//         return new Promise((resolve, reject) => {
//           reject(error);
//         });
//       }
//       if (error.config.url === '/RefreshToken') {
//         localStorage.removeItem('token');
//         localStorage.removeItem('refresh_token');
//         return new Promise((resolve, reject) => {
//           reject(error);
//         });
//       }
//       return axiosInstance
//         .post(
//           `${baseURL}/RefreshToken`,
//           {},
//           { headers: { From: userToken } },
//         )
//         .then(token => {
//           const { config } = error;
//           const { LiveToken, RefreshToken } = token.data[0];
//           localStorage.setItem('token', LiveToken);
//           localStorage.setItem('refresh_token', RefreshToken);
//           error.config.headers.From = LiveToken;
//           return new Promise((resolve, reject) => {
//             axiosInstance
//               .request(config)
//               .then(response => {
//                 resolve(response);
//               })
//               .catch(error => {
//                 reject(error);
//               });
//           });
//         })
//         .catch(error => {
//           Promise.reject(error);
//         });
//     },
//   );
//   return axiosInstance;
// };

// import axios from 'axios';

// const { REACT_APP_API_URL } = process.env;
// export default (httpOptions = {}) => {
//   const { token, url, headers } = httpOptions;
//   const userToken = token || localStorage.token;
//   const RefreshToken = localStorage.refresh_token;
//   const baseURL = url || REACT_APP_API_URL;
//   const axiosInstance = axios.create({
//     baseURL,
//     headers: {
//       ...headers,
//       From: userToken || null,
//     },
//   });
//   axiosInstance.interceptors.response.use(
//     response => {
//       return response;
//     },
//     error => {
//       if (!error.response) {
//         return Promise.reject(error);
//       }
//       if (
//         error.response.status !== 401 ||
//         error.config.url.endsWith('/CheckUserCredential') ||
//         error.config.url.endsWith('/LocateUser')
//       ) {
//         return new Promise((resolve, reject) => {
//           reject(error);
//         });
//       }
//       if (error.config.url.endsWith('/RefreshToken')) {
//         return new Promise((resolve, reject) => {
//           reject(error);
//         });
//       }
//       // if (
//       //   error &&
//       //   error.response &&
//       //   error.response.data[0].Description.includes(
//       //     'The Token has expired',
//       //   )
//       // ) {
//       return axiosInstance
//         .post(
//           `${baseURL}/RefreshToken`,
//           { RefreshToken },
//           { headers: { From: userToken } },
//         )
//         .then(token => {
//           const { config } = error;
//           const { LiveToken, RefreshToken } = token.data[0];
//           localStorage.setItem('token', LiveToken);
//           localStorage.setItem('refresh_token', RefreshToken);
//           error.config.headers.From = LiveToken;
//           return new Promise((resolve, reject) => {
//             axiosInstance
//               .request(config)
//               .then(response => {
//                 resolve(response);
//               })
//               .catch(error => {
//                 reject(error);
//               });
//           });
//         })
//         .catch(error => {
//           Promise.reject(error);
//         });
//     },
//   );
//   return axiosInstance;
// };
