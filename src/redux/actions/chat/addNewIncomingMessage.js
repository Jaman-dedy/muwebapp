import { NEW_INCOMING_MESSAGE_ADDED } from 'constants/action-types/chat/directMessage';

export const addNewIncomingMessage = data => dispatch => {
  dispatch({
    type: NEW_INCOMING_MESSAGE_ADDED,
    payload: data,
  });
};
