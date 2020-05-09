import socketIOClient from 'services/socketIO';
import { CONNECT_USER } from 'constants/events/common';

export const emit = data => socketIOClient.emit(CONNECT_USER, data);
