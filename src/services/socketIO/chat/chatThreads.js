/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatThreads } from 'redux/actions/chat/chatThreads';
import { chatSocketIOClient } from 'services/socketIO';
import {
  GET_CHAT_THREADS_SUCCESS,
  GET_CHAT_THREADS_ERROR,
  DELETE_CHAT_THREAD_SUCCESS,
  GET_CHAT_THREADS,
} from 'constants/events/chat/chatThreads';

export default () => {
  const dispatch = useDispatch();
  const { lastIncomingMessage } = useSelector(
    state => state.chat.messages,
  );

  useEffect(() => {
    chatSocketIOClient.emit(
      GET_CHAT_THREADS,
      {},
      localStorage.rtsToken,
    );
  }, [lastIncomingMessage]);

  useEffect(() => {
    chatSocketIOClient.on(GET_CHAT_THREADS_SUCCESS, response => {
      getChatThreads(response)(dispatch);
    });

    chatSocketIOClient.on(GET_CHAT_THREADS_ERROR, () => {});

    return () => {
      chatSocketIOClient.off(GET_CHAT_THREADS_SUCCESS);
      chatSocketIOClient.off(GET_CHAT_THREADS_ERROR);
      chatSocketIOClient.off(DELETE_CHAT_THREAD_SUCCESS);
    };
  }, []);
};
