import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Image } from 'semantic-ui-react';
import './groupChat.scss';
import { useSelector } from 'react-redux';
import Thumbnail from 'components/common/Thumbnail';
import setUserPresenceText from 'utils/setUserPresenceText';
import GroupPhoto from 'assets/images/group_photo.jpeg';

import onlineIcon from 'assets/images/presence/online.png';
import offlineIcon from 'assets/images/presence/offline.png';
import dndIcon from 'assets/images/presence/dnd.png';
import awayIcon from 'assets/images/presence/away.png';
import {
  AWAY,
  DO_NOT_DISTURB,
  INVISIBLE,
  ONLINE,
  OFFLINE,
} from 'constants/general';

const ChatSectionTopBar = ({
  width,
  MOBILE_BREAK_POINT,
  handleBackArrowClicked,
  setChatInfoOpen,
  setSearchMessagesOpen,
  blockedContacts: { userBlockedMe },
  isReceiverTyping,
}) => {
  const [hasError, setHasError] = useState(false);
  const { currentChatTarget: currentChatUser } = useSelector(
    state => state.chat.appChat,
  );
  const chatType = currentChatUser.type;
  const getGroupTitle = () => {
    const { item } = currentChatUser;

    if (item.length === 1) {
      return `${item[0].FirstName} and You`;
    }
    if (item.length > 1) {
      const firstUser = item[0].FirstName;
      return `${firstUser} and ${item.length - 1} Others`;
    }
  };

  const getGroupInfo = () => {
    const { item } = currentChatUser;
    if (item.length === 1) {
      return `${`${item[0].FirstName} ${item[0].LastName}`} and You`;
    }
    if (item.length > 1) {
      const firstNames = item.map(item => item.FirstName);

      return firstNames.join(',');
    }
  };

  const setUserPresenceIcon = (status = '') => {
    if (status === ONLINE) {
      return <Image inline width={10} src={onlineIcon} />;
    }
    if (status === AWAY) {
      return <Image inline width={10} src={awayIcon} />;
    }
    if (status === DO_NOT_DISTURB) {
      return <Image inline width={10} src={dndIcon} />;
    }

    if (status === INVISIBLE) {
      return <Image inline width={10} src={offlineIcon} />;
    }

    if (status === OFFLINE) {
      return <Image inline width={10} src={offlineIcon} />;
    }
  };

  return (
    <div className="top-section">
      <div className="left-items">
        <Icon
          style={{
            display: width > MOBILE_BREAK_POINT ? 'none' : 'block',
          }}
          name="arrow left"
          onClick={handleBackArrowClicked}
        />
        <div className="chat-user-image">
          {chatType === 'group' ? (
            <Image circular src={GroupPhoto} height={43} />
          ) : (
            <Thumbnail
              avatar={currentChatUser.PictureURL}
              circular
              name={currentChatUser.FirstName}
              secondName={currentChatUser.LastName}
              style={{ height: 43, width: 43 }}
              hasError={hasError}
              setHasError={setHasError}
            />
          )}
        </div>
        <div className="chart-user-info">
          {chatType === 'group' ? (
            <div className="group-chat">
              <h5 className="title">{getGroupTitle()}</h5>
              <small className="group-info-tetx">
                {getGroupInfo()}
              </small>
            </div>
          ) : (
            <>
              <div className="name">
                {currentChatUser.FirstName} {currentChatUser.LastName}
              </div>
              {!userBlockedMe(currentChatUser.ContactPID) && (
                <div className="presence-status">
                  {setUserPresenceIcon(
                    currentChatUser.PresenceStatus,
                  )}
                  <span className="presence_status_text">
                    {isReceiverTyping
                      ? `${global.translate('typing')}...`
                      : setUserPresenceText(
                          currentChatUser.PresenceStatus,
                          false,
                        )}
                    {}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="right-items">
        <Icon
          name="search"
          className="right-option-icons"
          onClick={() => {
            setSearchMessagesOpen(true);
          }}
        />{' '}
        &nbsp; &nbsp;
        <Icon
          className="right-option-icons"
          name="ellipsis vertical"
          onClick={() => {
            setChatInfoOpen(true);
          }}
        />
      </div>
    </div>
  );
};

ChatSectionTopBar.propTypes = {
  width: PropTypes.number.isRequired,
  MOBILE_BREAK_POINT: PropTypes.number.isRequired,
  handleBackArrowClicked: PropTypes.func.isRequired,
  setChatInfoOpen: PropTypes.func.isRequired,
  setSearchMessagesOpen: PropTypes.func.isRequired,
  blockedContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  isReceiverTyping: PropTypes.bool.isRequired,
};
export default ChatSectionTopBar;
