import initialState from 'redux/initial-states/chat';
import directMessage from './directMessage';
import globalChat from './globalChat';
import chatThreads from './chatThreads';
import deleteMessages from './deleteMessages';
import readStatus from './readStatus';
import readCount from './readCount';

export default (state = initialState, action = {}) => ({
  ...state,
  ...globalChat(state, action),
  ...directMessage(state, action),
  ...chatThreads(state, action),
  ...deleteMessages(state, action),
  ...readStatus(state, action),
  ...readCount(state, action),
});
