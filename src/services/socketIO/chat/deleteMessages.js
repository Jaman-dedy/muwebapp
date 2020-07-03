/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  DELETE_CHAT_DIRECT_MESSAGES_SUCCESS,
  DELETE_CHAT_DIRECT_MESSAGES_ERROR,
} from 'constants/events/chat/deleteMessages';
import { deleteDirectMessages } from 'redux/actions/chat/deleteMessages';
import {
  DELETE_CHAT_THREAD_SUCCESS,
  DELETE_CHAT_THREAD_ERROR,
} from 'constants/events/chat/chatThreads';
import { DELETE_FOR_ALL } from 'constants/general';
import socketIOClient, { chatSocketIOClient } from '..';

const ioEvents = [
  DELETE_CHAT_DIRECT_MESSAGES_SUCCESS,
  DELETE_CHAT_DIRECT_MESSAGES_ERROR,
];
const chatEvents = [
  DELETE_CHAT_THREAD_SUCCESS,
  DELETE_CHAT_DIRECT_MESSAGES_ERROR,
];

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socketIOClient.on(DELETE_CHAT_DIRECT_MESSAGES_SUCCESS, data => {
      if (data.deleteFor === DELETE_FOR_ALL) {
        deleteDirectMessages(data.id)(dispatch);
      }
    });
    socketIOClient.on(DELETE_CHAT_DIRECT_MESSAGES_ERROR, () => {});

    chatSocketIOClient.on(DELETE_CHAT_THREAD_ERROR, () => {});

    return () => {
      ioEvents.forEach(event => socketIOClient.off(event));
      chatEvents.forEach(event => chatSocketIOClient.off(event));
    };
  }, []);
};
