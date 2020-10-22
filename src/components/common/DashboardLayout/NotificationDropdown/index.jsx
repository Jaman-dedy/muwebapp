/* eslint-disable  */
import './NotificationDropdown.scss';

import notificationIcon from 'assets/images/h-notification.svg';
import chatIcon from 'assets/images/chat-icon.png';
import logo from 'assets/images/logo.png';
import notifLink from 'assets/images/notif-type-advert.png';
import notifRequest from 'assets/images/notif-type-request.png';
import notifTransac from 'assets/images/notif-type-transaction.png';
import Thumbnail from 'components/common/Thumbnail';
import TimeAgo from 'components/common/TimeAgo';
import { ONE_TO_ONE } from 'constants/general';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  openChatList,
  setGlobalChat,
} from 'redux/actions/chat/globalchat';
import makeNotificationsSeen from 'redux/actions/users/makeNotificationsSeen';
import getNotifications from 'redux/actions/users/notifications';
import { Dropdown, Icon, Image } from 'semantic-ui-react';

const NotificationDropdown = ({
  notifications,
  openStorePublicity,
}) => {
  const dispatch = useDispatch();
  let IDs = [];

  const { meta, data } = notifications;
  const {
    userData: { data: userData },
  } = useSelector(({ user }) => user);
  const { allContacts } = useSelector(state => state.contacts);
  const [hasError, setHasError] = useState(false);

  const openChat = contact => {
    setGlobalChat({
      currentChatType: ONE_TO_ONE,
      currentChatTarget: contact,
      isChattingWithSingleUser: true,
    })(dispatch);
    openChatList()(dispatch);
  };
  const renderAction = actions => {
    const { action, PID, linkData } = actions;

    if (action === 'TR') {
      const contact =
        allContacts.data &&
        allContacts.data.find(({ ContactPID }) => ContactPID === PID);
      return (
        <>
          <div className="action">
            <Link
              to={{
                pathname: '/transactions',
                search: '?ref=contact',
                state: {
                  contact: contact || null,
                  isSendingCash: false,
                },
              }}
            >
              <Image src={notifTransac} size="mini" alt="icon" />
            </Link>
          </div>
          <div
            className="action"
            onClick={() => {
              if (contact) {
                setGlobalChat({
                  currentChatType: ONE_TO_ONE,
                  currentChatTarget: contact,
                  isChattingWithSingleUser: true,
                })(dispatch);
                openChatList()(dispatch);
              }
            }}
          >
            <div>
              <Image src={chatIcon} size="mini" alt="icon" />
            </div>
          </div>
        </>
      );
    }
    if (action === 'CR' && PID) {
      return (
        <>
          <div className="action">
            <Link to={`/contacts?ref=send-money&PID=${PID}`}>
              <Image src={notifRequest} size="mini" alt="icon" />
            </Link>
          </div>
          <div
            onClick={() => {
              if (contact) {
                setGlobalChat({
                  currentChatType: ONE_TO_ONE,
                  currentChatTarget: contact,
                  isChattingWithSingleUser: true,
                })(dispatch);
                openChatList()(dispatch);
              }
            }}
          >
            <div>
              <Image src={chatIcon} size="mini" alt="icon" />
            </div>
          </div>
        </>
      );
    }

    if (action === 'LK') {
      return (
        <div
          className="action"
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
          onClick={() =>
            linkData && openStorePublicity(true, linkData)
          }
        >
          <Image src={notifLink} size="mini" alt="icon" />
        </div>
      );
    }
    if (action === 'NA') {
      return null;
    }
  };

  if (Array.isArray(data) && data.length !== 0) {
    data.sort((x, y) => {
      return x.status === 'unseen'
        ? -1
        : y.status === 'unseen'
        ? 1
        : 0;
    });
  }
  if (Array.isArray(data) && data.length !== 0) {
    IDs = data
      .slice(0, 5)
      .filter(({ status }) => status === 'unseen')
      .map(({ id }) => id);
  }

  return (
    <Dropdown
      title={global.translate('Notifications')}
      className="notifications-dropdown"
      trigger={
        <>
          <Image className="h-icon" src={notificationIcon} />
          {meta && meta.totalUnseen !== 0 && (
            <span className="u_bell_badge">
              {meta.totalUnseen > 15 ? '15+' : meta.totalUnseen}
            </span>
          )}
        </>
      }
      icon={null}
      disabled={!Array.isArray(data) || data.length === 0}
      onClose={() =>
        // remove the seen in the list by loading them again
        IDs.length !== 0 &&
        getNotifications({ PID: userData.PID })(dispatch)
      }
      onOpen={() =>
        // make the notifications seen and reduce the number in the meta
        IDs.length !== 0 &&
        makeNotificationsSeen({
          IDs,
          PID: userData.PID,
          status: 'seen',
        })(dispatch)
      }
    >
      <Dropdown.Menu
        direction="left"
        id="notifications-dropdown-inner"
      >
        {data
          .slice(0, 5)
          .map(({ message, createdAt, data }, index) => (
            <Dropdown.Item
              key={Number(index)}
              className="notifications-item"
            >
              <div className="flex justify-content-space-between align-items-center">
                <div className="notification-user flex flex-row align-items-center">
                  <Thumbnail
                    avatar={
                      Object.keys(data).length
                        ? data.PictureURL
                        : logo
                    }
                    size="small"
                    name={data.FirstName || ''}
                    secondName={data.LastName || ''}
                    circular
                    className="header_2u_avatar"
                    style={{
                      height: '45px',
                      width: '45px',
                      marginRight: '15px',
                      marginLeft: '15px',
                    }}
                    hasError={hasError}
                    setHasError={setHasError}
                  />
                  <div className="notif-info">
                    <div>
                      <div className="name">{`${data.FirstName ||
                        ''} ${data.LastName || ''}`}</div>
                    </div>
                    {data.Action === 'LK' ? (
                      <>
                        <div className="publicity-title">
                          {data.Title || ''}
                        </div>
                        <div className="notif-message">
                          {data.SubTitle || ''}
                        </div>
                      </>
                    ) : (
                      <div className="notif-message">
                        {global.translate(message)}
                      </div>
                    )}
                    <div className="time">
                      <Icon name="clock" />
                      <TimeAgo time={createdAt} />
                    </div>
                  </div>
                  <div className="icon-actions flex">
                    {renderAction({
                      action: data.Action,
                      PID: data.PID,
                      linkData: data || null,
                    })}
                  </div>
                </div>
              </div>
            </Dropdown.Item>
          ))}
        <Dropdown.Item className="dropdown-footer center-align">
          <Link to="/notifications">
            <div className="center-align">
              <span>{global.translate('See more...')}</span>
            </div>
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

NotificationDropdown.defaultProps = {
  notifications: {},
  openStorePublicity: () => null,
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.instanceOf(Object),
  openStorePublicity: PropTypes.func,
};

export default NotificationDropdown;
