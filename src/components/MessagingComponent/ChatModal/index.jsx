import React from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './chatlist.scss';
import useWindowSize from 'utils/useWindowSize';
import Messaging from 'containers/Messaging';
import {
  closeChatList,
  setGlobalChat,
} from 'redux/actions/chat/globalchat';

const ChatModal = ({ open, routeRef }) => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { isChattingWithSingleUser } = useSelector(
    state => state.chat.appChat,
  );

  return (
    <Modal
      open={open}
      closeIcon={isChattingWithSingleUser || width > 700}
      className="app-chat-modal chat-modal-wrapper"
      size={
        width < 700 || isChattingWithSingleUser ? 'mini' : 'large'
      }
      onClose={() => {
        closeChatList()(dispatch);
        setGlobalChat({
          currentChatType: null,
          currentChatTarget: null,
          isChattingWithSingleUser: false,
        })(dispatch);
      }}
    >
      <div className="chat-modal-container">
        <Modal.Content>
          <Messaging routeRef={routeRef} />
        </Modal.Content>
      </div>
    </Modal>
  );
};

ChatModal.propTypes = {
  open: PropTypes.bool,
  routeRef: PropTypes.objectOf(PropTypes.any),
};

ChatModal.defaultProps = {
  open: false,
  routeRef: {},
};

export default ChatModal;
