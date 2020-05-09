import socketIOClient from 'services/socketIO';
import { WELCOME } from 'constants/events/common';

export const listen = () => {
  socketIOClient.on(WELCOME, ({ message }) => message || WELCOME);
};
export const off = () => socketIOClient.off(WELCOME);
