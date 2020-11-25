import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import ImageGallery from 'components/PeerServices/ServiceFeed/MediaViewer';
import openImageGallery from 'redux/actions/imageGallery/openImageGallery';
import ChatMessage from './ChatMessage/ChatMessage';

const MessagesArea = React.forwardRef(
  ({
    loadUserChatThread,
    deleteMessage,
    availableImages,
    setAvailableImages,
  }) => {
    const { threadLoading } = useSelector(
      state => state.chat.messages,
    );
    const {
      userData: { data },
    } = useSelector(state => state.user);
    const threadMessages = loadUserChatThread();
    const dispatch = useDispatch();
    const onImageClicked = React.useCallback(
      url => {
        const index = availableImages
          .map((item, index) => {
            if (item.includes(url)) {
              return index;
            }
          })
          .filter(item => item)?.[0];

        openImageGallery({
          open: true,
          activePhotoIndex: index || 0,
          photos: availableImages,
        })(dispatch);
      },
      [threadMessages],
    );

    const onImageUnavailable = (fileUrl = '') => {
      const originSource = fileUrl.substring(
        fileUrl.indexOf('source=') + 7,
        fileUrl.indexOf('&'),
      );
      setAvailableImages([...availableImages, originSource]);
    };

    return (
      <>
        <ImageGallery />
        {threadLoading && (
          <div className="loader-segment">
            {Array(2)
              .fill(1)
              .map(item => (
                <Placeholder
                  key={item}
                  className="loader-segment-left"
                  inverted
                >
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              ))}
          </div>
        )}
        {threadMessages.map(message => {
          return (
            <ChatMessage
              key={message.id}
              handleDeleteMessage={deleteMessage}
              message={message}
              onImageUnavailable={onImageUnavailable}
              onImageClicked={onImageClicked}
              isOwner={data?.PID === message.sender}
            />
          );
        })}
      </>
    );
  },
);
MessagesArea.propTypes = {
  loadUserChatThread: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  availableImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  setAvailableImages: PropTypes.func.isRequired,
};

export default MessagesArea;
