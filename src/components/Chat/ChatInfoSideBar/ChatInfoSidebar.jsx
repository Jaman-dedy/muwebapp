import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Icon,
  Menu,
  Sidebar,
  Segment,
  Image,
  Button,
  Item,
  Confirm,
} from 'semantic-ui-react';
import './Sidebar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Thumbnail from 'components/common/Thumbnail';
import ToggleSwitch from 'components/common/ToggleButton';
import {
  closeChatList,
  setGlobalChat,
} from 'redux/actions/chat/globalchat';
import addNewContact from 'redux/actions/contacts/addNewContact';
import { ONE_TO_ONE } from 'constants/general';
import { clearDeleteContact } from 'redux/actions/contacts/deleteContact';
import { setActiveChatThread } from 'redux/actions/chat/chatThreads';
import AppListItem from '../ListItem/List';

const ChatInfoSideBar = ({
  animation,
  direction,
  visible,
  onHide,
  chatUserList,
  setEditModalOpen,
  routeRef,
  clearChatThread,
  blockedContacts,
  setChatInfoOpen,
}) => {
  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  const { currentChatTarget, currentChatType } = useSelector(
    state => state.chat.appChat,
  );
  const { activeLastMessageThread } = useSelector(
    state => state.chat.messages,
  );
  const {
    userData: { data: userData },
  } = useSelector(state => state.user);
  const [deleteChatOpen, setDeleteChatOpen] = useState(false);
  const [blockUserConfirmOpen, setBlockUserConfirmOpen] = useState(
    false,
  );
  const dispatch = useDispatch();

  const {
    newContact: { loading, data },
  } = useSelector(state => state.contacts);

  useEffect(() => {
    if (data) {
      setGlobalChat({
        currentChatType: ONE_TO_ONE,
        currentChatTarget: data[0],
        isChattingWithSingleUser: false,
      })(dispatch);

      clearDeleteContact()(dispatch);
    }
  }, [data]);

  const {
    handleBlockContactStatusChange,
    isBlocked,
    blockUnblockState: { loading: blockUnblockContactsLoading },
  } = blockedContacts;

  useEffect(() => {
    if (blockUnblockContactsLoading) {
      setChatInfoOpen(true);
    }
  }, [blockUnblockContactsLoading]);
  return (
    <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      icon="labeled"
      onHide={onHide}
      vertical
      className="chat-info-sidebar"
      visible={visible}
      width="wide"
    >
      <Segment.Group style={{ padding: ' 10px' }}>
        <Segment className="segment-top-header">
          <div className="setting-item">
            <Icon
              name="arrow left"
              className="setting-item-icon"
              onClick={onHide}
            />
            <p className="sidebar-title">
              {global.translate('Chat Info')}
            </p>
          </div>
        </Segment>
        <Segment>
          <div className="info-setting-item">
            <div className="imgplusname">
              {currentChatType === 'GROUP' ? (
                <Image
                  height={43}
                  circular
                  src="https://s3.amazonaws.com/uifaces/faces/twitter/aka_james/128.jpg"
                />
              ) : (
                <Thumbnail
                  avatar={currentChatTarget?.PictureURLsmall}
                  circular
                  name={currentChatTarget?.FirstName}
                  secondName={currentChatTarget?.LastName}
                  style={{ height: 65, width: 65 }}
                  hasError={hasError}
                  setHasError={setHasError}
                />
              )}
              <p className="chat_name-text">
                {currentChatType === 'GROUP'
                  ? 'Group Name'
                  : `${currentChatTarget?.FirstName} ${currentChatTarget?.LastName}`}
              </p>
            </div>

            {currentChatType === 'GROUP' && (
              <Button
                basic
                color="orange"
                onClick={() => setEditModalOpen(true)}
                content={global.translate('Edit')}
              />
            )}
          </div>
        </Segment>
        {currentChatType === 'GROUP' && (
          <Segment>
            <h4 className="sidebar-subtitle">
              {global.translate('People')}
            </h4>
            <hr />
            <div className="bottom-recents-list">
              {chatUserList &&
                chatUserList.length &&
                chatUserList.map(item => (
                  <AppListItem
                    imageURL={item.PictureURL}
                    itemTitle={`${item.FirstName} ${item.LastName}`}
                    itemDescription={global.translate(
                      'From your Contacts',
                    )}
                    onItemClick={() => () => {}}
                  />
                ))}
              <Button
                content={global.translate('Add People')}
                basic
                color="orange"
              />
            </div>
          </Segment>
        )}

        <Confirm
          size="tiny"
          open={blockUserConfirmOpen}
          content={global.translate(
            'Are you sure, you want to block this Person?',
          )}
          cancelButton={
            <Button
              basic
              color="red"
              onClick={e => {
                e.preventDefault();
                setBlockUserConfirmOpen(false);
                setChatInfoOpen(true);
              }}
              content={global.translate('Cancel')}
            />
          }
          confirmButton={
            <Button
              content={global.translate('Yes')}
              positive
              onClick={e => {
                e.preventDefault();
                setBlockUserConfirmOpen(false);
                handleBlockContactStatusChange(currentChatTarget);
                setChatInfoOpen(true);
              }}
            />
          }
        />
        <Confirm
          size="tiny"
          open={deleteChatOpen}
          content={global.translate(
            'Are you sure, you want to delete this Chat?',
          )}
          cancelButton={
            <Button
              basic
              color="red"
              onClick={() => {
                setDeleteChatOpen(false);
              }}
              content={global.translate('Cancel')}
            />
          }
          confirmButton={
            <Button
              content={global.translate('Yes')}
              positive
              onClick={() => {
                setGlobalChat({
                  currentChatType: null,
                  currentChatTarget: null,
                  isChattingWithSingleUser: false,
                })(dispatch);
                clearChatThread({
                  id: activeLastMessageThread?.id,
                });
                toast.success(global.translate('Chat Deleted', 1641));
                setDeleteChatOpen(false);
                onHide();
              }}
            />
          }
        />
        <Segment className="notification-segment">
          <h4 className="sidebar-subtitle">
            {global.translate('Notifications')}
          </h4>
          <hr />
          <div className="mute">
            <div className="contained-header">
              <p>{global.translate('Mute Discussion')}</p>
              <ToggleSwitch
                id="notifications"
                name="notifications"
                toggle
                value="notifications"
                defaultChecked={false}
                onChange={() => {}}
              />
            </div>
            <small>
              {global.translate(
                'Disable Notifications in this Conversation',
              )}
            </small>
            <ToggleSwitch defaultChecked />
          </div>
        </Segment>
        <Segment
          loading={loading}
          className="cursor-pointer"
          onClick={() => {
            if (currentChatTarget?.IsContact === 'NO') {
              addNewContact(
                {
                  ContactData: currentChatTarget?.ContactPID,
                  Criteria: 'PID',
                  Wallet1: userData?.DefaultWallet,
                },
                '/AddToContact',
              )(dispatch);
            } else if (history) {
              setActiveChatThread(null)(dispatch);
              setGlobalChat({
                currentChatType: null,
                currentChatTarget: null,
                isChattingWithSingleUser: false,
              })(dispatch);
              closeChatList()(dispatch);
              history.push({
                pathname: '/contacts',
                state: {
                  contact: currentChatTarget,
                },
              });
            }
          }}
        >
          {currentChatTarget?.IsContact === 'NO'
            ? global.translate('Add to my contacts')
            : global.translate('Manage Contact')}
        </Segment>
        <Segment
          className="cursor-pointer"
          onClick={() => {
            if (navigator.onLine) {
              setDeleteChatOpen(true);
            } else {
              toast.error(
                global.translate('You are in offline mode.'),
              );
            }
          }}
        >
          {global.translate('Delete Chat')}
        </Segment>
        {currentChatType === 'GROUP' && (
          <Segment>
            <Item.Content color="red">
              {' '}
              {global.translate('Leave Conversation')}
            </Item.Content>
          </Segment>
        )}
        {currentChatType !== 'GROUP' && (
          <Segment
            className="cursor-pointer"
            loading={blockUnblockContactsLoading}
            onClick={() => {
              if (!isBlocked(currentChatTarget)) {
                setBlockUserConfirmOpen(true);
              } else {
                handleBlockContactStatusChange(currentChatTarget);
              }
            }}
          >
            <Item.Content color="red">
              {' '}
              {isBlocked(currentChatTarget)
                ? global.translate('Unlock this person')
                : global.translate('Block this person')}
            </Item.Content>
          </Segment>
        )}
      </Segment.Group>
    </Sidebar>
  );
};

ChatInfoSideBar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  chatUserList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setEditModalOpen: PropTypes.func.isRequired,
  routeRef: PropTypes.objectOf(PropTypes.any).isRequired,
  clearChatThread: PropTypes.func.isRequired,
  blockedContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  setChatInfoOpen: PropTypes.func.isRequired,
};

ChatInfoSideBar.defaultProps = {
  animation: 'push',
  direction: 'right',
  visible: false,
};
export default ChatInfoSideBar;
