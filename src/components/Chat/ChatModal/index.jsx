import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './chatlist.scss';
import { useLocation } from 'react-router-dom';
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

  const [currentPath, setPath] = React.useState(null);

  const path = routeRef.current?.props?.history?.location?.pathname;

  React.useEffect(() => {
    if (path) {
      setPath(path);
    }
  }, [path]);

  React.useEffect(() => {
    if (open) {
      if (currentPath === '/') {
        window.Tawk_API.hideWidget();
      }
    }

    return () => {
      if (currentPath === '/') {
        window.Tawk_API.showWidget();
      }
    };
  }, [open]);

  return (
    <Modal
      centered={false}
      open={open}
      onOpen={() => {}}
      closeIcon={
        width > 700 && (
          <Button
            icon
            negative
            inverted
            className="close-chat-btn"
            onClick={() => {
              closeChatList()(dispatch);
              setGlobalChat({
                currentChatType: null,
                currentChatTarget: null,
                isChattingWithSingleUser: false,
              })(dispatch);
            }}
          >
            <Icon name="close" />
          </Button>
        )
      }
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
