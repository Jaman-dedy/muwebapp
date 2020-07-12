import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './message.scss';
import { toast } from 'react-toastify';
import {
  Button,
  Icon,
  Modal,
  Placeholder,
  Segment,
} from 'semantic-ui-react';
import PDFViewer from 'mgr-pdf-viewer-react';
import Axios from 'axios';
import copyToClipboard from 'helpers/copyToClipboard';
import formatTime from 'utils/formatTime';
import openInNewTab from 'helpers/openInNewTab';
import unPreviewableFileTypes from 'utils/unPreviewableFileTypes';
import getFileTypeIcon from 'utils/getFileTypeIcon';
import {
  DELETE_FOR_ALL,
  DELETE_FOR_ME,
  SEEN,
  SENT,
  SENDING,
} from 'constants/general';
import Img from './Img';
import ChatMessageOptions from '../OptionsDropDown';

const ChatMessage = React.memo(
  ({ message, handleDeleteMessage, isOwner }) => {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [availableURL, setAvailableURL] = useState(null);

    const chatMessageOptions = [
      {
        icon: 'trash',
        name: global.translate('Delete'),
        itemStyle: { background: '#db2828', color: 'white' },
        onClick: () => {
          setConfirmDeleteOpen(true);
        },
      },
      {
        icon: 'copy',
        name: global.translate('Copy to clipboard', 1666),
        onClick: (e, el2) => {
          copyToClipboard(el2.body);
          toast.success(global.translate('Text copied', 1667));
        },
      },
    ];
    const getAvailableURL = message => {
      if (!message) {
        return null;
      }
      Axios.get(message.tmpFile)
        .then(() => {
          setAvailableURL(message.tmpFile);
        })
        .catch(() => {
          setAvailableURL(null);
        });
    };

    useEffect(() => {
      if (message?.fileType?.startsWith('application')) {
        getAvailableURL(message);
      }
    }, [message]);

    const showStatusContent = item => {
      if (item.status === SEEN && item.shouldDeliver) {
        return <Icon name="check" size="large" color="green" />;
      }
      if (item.status === SENDING) {
        return <Icon name="clock" size="large" />;
      }
      if (item.status === SENT) {
        return <Icon name="check" size="large" />;
      }

      if (!item.shouldDeliver) {
        return <Icon name="check" size="large" />;
      }
    };
    return (
      <div
        className={
          isOwner
            ? `receiver-message  ${
                message.status === 'sending' ? 'sending' : 'sent'
              }`
            : `sender-message ${
                message.status === 'sending' ? 'sending' : 'sent'
              }`
        }
      >
        <Modal open={confirmDeleteOpen} size="tiny" centered>
          <Modal.Header className="modal-title">
            {global.translate(
              'Would you like to delete this message?',
              1662,
            )}
          </Modal.Header>
          <Modal.Content
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button
              content={global.translate('Cancel')}
              basic
              color="red"
              onClick={() => {
                setConfirmDeleteOpen(false);
              }}
            />
            <Button
              content={global.translate('Delete for all', 1664)}
              positive
              onClick={() => {
                setConfirmDeleteOpen(false);
                handleDeleteMessage({
                  ...message,
                  ...{ deleteFor: DELETE_FOR_ALL },
                });
              }}
            />
            <Button
              content={global.translate('Delete for me', 1663)}
              positive
              onClick={() => {
                setConfirmDeleteOpen(false);
                handleDeleteMessage({
                  ...message,
                  ...{ deleteFor: DELETE_FOR_ME },
                });
              }}
            />
          </Modal.Content>
        </Modal>

        <div
          className={
            isOwner ? 'chat-bubble right' : 'chat-bubble left'
          }
        >
          <div
            className={
              isOwner
                ? 'message tri-right round border right-top'
                : 'message talk-bubble tri-right left-top'
            }
          >
            <div className="text talktext">
              {message?.fileType?.startsWith('image/') && (
                <Img
                  className="cursor-pointer"
                  src={message.tmpFile}
                  onClick={() => {
                    openInNewTab(message.tmpFile);
                  }}
                  style={{ width: 200 }}
                  alt={
                    <Img
                      src={message.file}
                      style={{ width: 200 }}
                      alt={
                        <Placeholder
                          style={{ height: 200, width: 200 }}
                        >
                          <Placeholder.Image />
                        </Placeholder>
                      }
                    />
                  }
                />
              )}

              {unPreviewableFileTypes.includes(message?.fileType) && (
                <div>
                  <Icon
                    size="huge"
                    onClick={() => {
                      openInNewTab(availableURL);
                    }}
                    name={getFileTypeIcon({
                      name: '',
                      type: message?.fileType,
                    })}
                  />
                </div>
              )}
              {message?.fileType?.startsWith('application/pdf') && (
                <Segment
                  className="cursor-pointer"
                  onClick={() => {
                    openInNewTab(availableURL);
                  }}
                >
                  {availableURL && (
                    <PDFViewer
                      css="customViewer"
                      hideNavbar
                      loader={
                        <Placeholder
                          style={{ height: 200, width: 200 }}
                        >
                          <Placeholder.Image />
                        </Placeholder>
                      }
                      navigation={{
                        css: {
                          wrapper: 'customMinPdfWrapper',
                        },
                      }}
                      document={{
                        url: availableURL,
                      }}
                    />
                  )}
                </Segment>
              )}
              {message.body}
              <ChatMessageOptions
                className="message-dropdown-options"
                currentItem={message}
                options={
                  isOwner
                    ? chatMessageOptions.filter(
                        item => item.icon !== 'flag',
                      )
                    : chatMessageOptions.filter(
                        item =>
                          item.icon !== 'flag' &&
                          item.icon !== 'trash',
                      )
                }
              />
            </div>
            <div className="time">
              <span className="message.date">
                {formatTime(message.createdAt)}
              </span>

              {isOwner && (
                <span className="status">
                  {showStatusContent(message)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prev, next) => {
    if (prev.message.status !== next.message.status) {
      return false;
    }
    return true;
  },
);

ChatMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDeleteMessage: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default ChatMessage;
