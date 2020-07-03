/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient, {
  chatSocketIOClient,
} from 'services/socketIO';
import {
  NEW_INCOMING_CHAT_DIRECT_MESSAGE,
  NEW_OUTGOING_CHAT_DIRECT_MESSAGE,
  SUCCESS_OUTGOING_CHAT_DIRECT_MESSAGE,
  ERROR_OUTGOING_CHAT_DIRECT_MESSAGE,
  GET_CHAT_DIRECT_MESSAGES_SUCCESS,
  GET_CHAT_DIRECT_MESSAGES_ERROR,
} from 'constants/events/chat/directMessages';
import {
  addNewDirectMessage,
  getChatThreadDirectMessages,
} from 'redux/actions/chat/directMessage';
import {
  GET_CHAT_THREADS_SUCCESS,
  GET_CHAT_THREADS_ERROR,
  GET_CHAT_THREADS,
} from 'constants/events/chat/chatThreads';
import {
  UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS,
  UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS,
} from 'constants/action-types/chat/directMessage';
import { updateDirectMessagesReadStatus } from 'redux/actions/chat/readStatus';
import { addNewIncomingMessage } from 'redux/actions/chat/addNewIncomingMessage';

export default () => {
  const dispatch = useDispatch();
  const chatEvents = [
    NEW_OUTGOING_CHAT_DIRECT_MESSAGE,
    SUCCESS_OUTGOING_CHAT_DIRECT_MESSAGE,
    ERROR_OUTGOING_CHAT_DIRECT_MESSAGE,
    GET_CHAT_THREADS_SUCCESS,
    GET_CHAT_THREADS_ERROR,
    UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS,
    UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS,
  ];

  const ioEvents = [
    NEW_INCOMING_CHAT_DIRECT_MESSAGE,
    UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS,
  ];

  const { currentChatTarget } = useSelector(
    state => state.chat.appChat,
  );

  const {
    userData: { data },
  } = useSelector(state => state.user);

  useEffect(() => {
    if (data?.PresenceStatus) {
      localStorage.presenceStatus = data?.PresenceStatus;
    } else {
      localStorage.presenceStatus = '';
    }
  }, [data]);

  useEffect(() => {
    if (currentChatTarget?.ContactPID) {
      localStorage.activeTarget = currentChatTarget?.ContactPID;
    } else {
      localStorage.activeTarget = '';
    }
  }, [currentChatTarget]);

  useEffect(() => {
    socketIOClient.on(NEW_INCOMING_CHAT_DIRECT_MESSAGE, response => {
      if (localStorage.activeTarget !== response.sender) {
        addNewIncomingMessage(response)(dispatch);
      } else if (localStorage.presenceStatus === '0') {
        chatSocketIOClient.emit(
          UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS,
          {
            threadId: response.threadId,
          },
          localStorage.rtsToken,
        );
      }

      addNewDirectMessage(response)(dispatch);
    });
    socketIOClient.on(
      UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS,
      response => {
        updateDirectMessagesReadStatus(response)(dispatch);
        chatSocketIOClient.emit(
          GET_CHAT_THREADS,
          {},
          localStorage.rtsToken,
        );
      },
    );

    chatSocketIOClient.on(
      UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS,
      response => {
        updateDirectMessagesReadStatus(response)(dispatch);
        chatSocketIOClient.emit(
          GET_CHAT_THREADS,
          {},
          localStorage.rtsToken,
        );
      },
    );

    chatSocketIOClient.on(
      GET_CHAT_DIRECT_MESSAGES_SUCCESS,
      response => {
        getChatThreadDirectMessages({
          ...response,
          data: response?.data?.reverse() || [],
        })(dispatch);
        const id = response?.data?.[0]?.threadId;

        if (localStorage.presenceStatus === '0') {
          chatSocketIOClient.emit(
            UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS,
            { threadId: id },
            localStorage.rtsToken,
          );
        }
      },
    );
    chatSocketIOClient.on(GET_CHAT_DIRECT_MESSAGES_ERROR, () => {});

    chatSocketIOClient.on(
      SUCCESS_OUTGOING_CHAT_DIRECT_MESSAGE,
      response => {
        addNewDirectMessage({
          ...response,
          ...{ currentAuthUser: true },
        })(dispatch);
      },
    );
    chatSocketIOClient.on(
      ERROR_OUTGOING_CHAT_DIRECT_MESSAGE,
      () => {},
    );

    return () => {
      socketIOClient.off(NEW_INCOMING_CHAT_DIRECT_MESSAGE);
      socketIOClient.off(
        UPDATE_CHAT_DIRECT_MESSAGES_READ_STATUS_SUCCESS,
      );
      ioEvents.forEach(event => socketIOClient.off(event));
      chatEvents.forEach(event => chatSocketIOClient.off(event));
    };
  }, []);
};
