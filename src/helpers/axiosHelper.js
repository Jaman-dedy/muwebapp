import axios from 'axios';

const {
  REACT_APP_API_URL,
  REACT_APP_LOGIN_NAME,
  REACT_APP_API_KEY,
  REACT_APP_ID,
} = process.env;

export default (httpOptions = {}) => {
  const { token, url, headers } = httpOptions;
  const userToken = token || localStorage.token;

  return axios.create({
    baseURL: url || REACT_APP_API_URL,
    headers: {
      ...headers,
      From: userToken || undefined,
      LoginName: REACT_APP_LOGIN_NAME,
      APIKey: REACT_APP_API_KEY,
      AppID: REACT_APP_ID,
    },
  });
};
