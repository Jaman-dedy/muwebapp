import io from 'socket.io-client';

const { REACT_APP_REAL_TIME_SERVICES_URL: apiUrl } = process.env;

const socketIOClient = io(apiUrl, {
  reconnection: true,
  forceNew: true,
});

export const chatSocketIOClient = io(`${apiUrl}/chat`, {
  forceNew: true,
});

export default socketIOClient;
