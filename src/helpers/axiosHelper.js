import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export default (httpOptions = {}) => {
  const { token, url, headers } = httpOptions;
  const userToken = token || localStorage.token;

  return axios.create({
    baseURL: url || REACT_APP_API_URL,
    headers: {
      ...headers,
      From: userToken || undefined,
    },
  });
};
