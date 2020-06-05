/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import TimeAgo from 'components/common/TimeAgo';
import Thumbnail from 'components/common/Thumbnail';
import './NotificationDropdown.scss';
import notifRequest from 'assets/images/notif-type-request.png';
import notifTransac from 'assets/images/notif-type-transaction.png';
import notifLink from 'assets/images/notif-type-advert.png';
import chatIcon from 'assets/images/chat-icon.png';
import logo from 'assets/images/logo.png';
import notificationIcon from 'assets/images/bell.png';
import getNotifications from 'redux/actions/users/notifications';
import makeNotificationsSeen from 'redux/actions/users/makeNotificationsSeen';

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

  const renderAction = actions => {
    const { action, PID, linkData } = actions;
    switch (action) {
      case 'TR': {
        const contact =
          allContacts.data &&
          allContacts.data.find(
            ({ ContactPID }) => ContactPID === PID,
          );
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
            <div className="action">
              <Link to="#">
                <Image src={chatIcon} size="mini" alt="icon" />
              </Link>
            </div>
          </>
        );
      }
      case 'CR':
        return (
          <>
            <div className="action">
              <Link to={`/contacts?ref=send-money&PID=${PID}`}>
                <Image src={notifRequest} size="mini" alt="icon" />
              </Link>
            </div>
            <div className="action">
              <Link to="#">
                <Image src={chatIcon} size="mini" alt="icon" />
              </Link>
            </div>
          </>
        );

      case 'LK':
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

      case 'NA':
        return null;

      default:
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
      className="notifications-dropdown"
      trigger={
        <>
          <Image src={notificationIcon} />
          {meta && meta.totalUnseen !== 0 && (
            <Label color="red" className="u_bell_badge" size="small">
              {meta.totalUnseen > 15 ? '15+' : meta.totalUnseen}
            </Label>
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
      <Dropdown.Menu direction="left">
        {data
          .slice(0, 5)
          .map(({ message, createdAt, data }, index) => (
            <Dropdown.Item
              key={Number(index)}
              className="notifications-item"
            >
              <div className="flex justify-content-space-between align-items-center">
                <div className="notification-user flex align-items-center">
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
                      height: '32px',
                      width: '32px',
                      marginRight: '5px',
                    }}
                  />
                  <div className="notif-info flex flex-column">
                    <span className="name">{`${data.FirstName ||
                      ''} ${data.LastName || ''}`}</span>
                    <span className="time">
                      <TimeAgo time={createdAt} />
                    </span>
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

              {data.Action === 'LK' ? (
                <>
                  <div className="publicity-title small-v-margin small-text">
                    {data.Title || ''}
                  </div>
                  <div className="notif-message small-v-margin small-text">
                    {data.SubTitle || ''}
                  </div>
                </>
              ) : (
                <div className="notif-message small-v-margin small-text">
                  {global.translate(message)}
                </div>
              )}
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
