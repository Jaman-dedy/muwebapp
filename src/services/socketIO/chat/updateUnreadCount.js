/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GET_CHAT_THREADS } from 'constants/events/chat/chatThreads';
import {
  UPDATE_CHAT_UNREAD_MESSAGES_COUNT_SUCCESS,
  UPDATE_CHAT_UNREAD_MESSAGES_COUNT_ERROR,
} from 'constants/events/chat/unReadCount';
import { updateUnReadMessagesCount } from 'redux/actions/chat/readStatus';
import { chatSocketIOClient } from '..';

const chatEvents = [
  UPDATE_CHAT_UNREAD_MESSAGES_COUNT_SUCCESS,
  UPDATE_CHAT_UNREAD_MESSAGES_COUNT_ERROR,
];
export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    chatSocketIOClient.on(
      UPDATE_CHAT_UNREAD_MESSAGES_COUNT_SUCCESS,
      response => {
        updateUnReadMessagesCount(response)(dispatch);
        chatSocketIOClient.emit(
          GET_CHAT_THREADS,
          {},
          localStorage.rtsToken,
        );
      },
    );
    chatSocketIOClient.on(
      UPDATE_CHAT_UNREAD_MESSAGES_COUNT_ERROR,
      () => {},
    );

    return () => {
      chatEvents.forEach(event => chatSocketIOClient.off(event));
    };
  }, []);
};
