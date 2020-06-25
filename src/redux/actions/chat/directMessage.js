import {
  ADD_DIRECT_MESSAGE,
  DELETE_DIRECT_MESSAGE,
  CLEAR_CHAT_DIRECT_MESSAGES,
} from 'constants/action-types/chat/directMessage';
import {
  GET_CHAT_DIRECT_MESSAGES_SUCCESS,
  GET_CHAT_DIRECT_MESSAGES,
} from 'constants/events/chat/directMessages';

export const clearPrevUserMessages = () => dispatch => {
  return dispatch({
    type: CLEAR_CHAT_DIRECT_MESSAGES,
  });
};

export const loadDirectMessages = () => dispatch => {
  return dispatch({
    type: GET_CHAT_DIRECT_MESSAGES,
  });
};

export const getChatThreadDirectMessages = data => dispatch => {
  return dispatch({
    type: GET_CHAT_DIRECT_MESSAGES_SUCCESS,
    payload: data,
  });
};

export const addNewDirectMessage = data => dispatch => {
  return dispatch({
    type: ADD_DIRECT_MESSAGE,
    payload: data,
  });
};

export const deleteDirectMessage = data => dispatch => {
  return dispatch({
    type: DELETE_DIRECT_MESSAGE,
    payload: data,
  });
};
