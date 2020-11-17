/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Icon,
  Button,
  Label,
  Placeholder,
  Image,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeChatList,
  setGlobalChat,
} from 'redux/actions/chat/globalchat';
import './style.scss';
import Thumbnail from 'components/common/Thumbnail';
import formatTime from 'utils/formatTime';
import Message from 'components/common/Message';
import { setActiveChatThread } from 'redux/actions/chat/chatThreads';
import useWindowSize from 'utils/useWindowSize';
import {
  ONE_TO_ONE,
  SEEN,
  SENT,
  SENDING,
  ONLINE,
  AWAY,
  DO_NOT_DISTURB,
  INVISIBLE,
  OFFLINE,
} from 'constants/general';
import removeDuplicatesBy from 'utils/removeDuplicatesBy';
import MessageIcon from 'assets/images/message.png';

import onlineIcon from 'assets/images/presence/online.svg';
import offlineIcon from 'assets/images/presence/offline.svg';
import dndIcon from 'assets/images/presence/dnd.svg';
import awayIcon from 'assets/images/presence/away.svg';
import ListItem from './ListItem/List';
import SearchInput from './SearchInput';
import ItemsPlaceholder from './ItemsLoading';

const ChartListComponent = ({
  userFavorite,
  currentAuthUser,
  onNewChatClick,
  setIsOnMobileDetail,
}) => {
  const dispatch = useDispatch();
  const {
    chatThreads: { loading, data },
  } = useSelector(state => state.chat.messages);
  const [hasError, setHasError] = useState(false);
  const {
    allContacts: { data: contacts },
  } = useSelector(state => state.contacts);

  const { width } = useWindowSize();

  const [recentChatsData, setRecentChatData] = useState([]);
  const [recentUserData, setRecentUserData] = useState([]);

  const setInitialFormattedData = () => {
    const formattedData =
      data?.data &&
      data.data
        .sort((a, b) => b.updatedAt?.localeCompare(a.updatedAt))
        .map(({ receiver, sender, ...rest }) => {
          const contactDetails = {
            ...contacts?.find(
              item =>
                item.ContactPID === receiver ||
                item.ContactPID === sender,
            ),
          };
          return {
            sender,
            receiver: contactDetails?.ContactType
              ? contactDetails
              : {
                  FirstName:
                    currentAuthUser?.PID === receiver
                      ? sender
                      : receiver,
                  LastName: '',
                  IsContact: 'NO',
                  ContactPID:
                    currentAuthUser?.PID === receiver
                      ? sender
                      : receiver,
                },
            ...rest,
          };
        });

    setRecentChatData(
      removeDuplicatesBy(x => x.receiver.ContactPID, formattedData) ||
        [],
    );
  };
  useEffect(() => {
    setInitialFormattedData();
  }, [data, contacts]);

  useEffect(() => {
    setRecentUserData(userFavorite.data);
  }, [userFavorite]);

  const handleItemsSearch = e => {
    e.persist();
    const search = e.target.value;
    if (search.trim().length > 0) {
      const foundChats = recentChatsData.filter(
        item =>
          (item.receiver.FirstName &&
            item.receiver.FirstName.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.receiver.LastName &&
            item.receiver.LastName.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.directMessages[0].body &&
            item.directMessages[0].body
              .toLowerCase()
              .startsWith(search.toLowerCase())) ||
          (item.receiver.ContactPID &&
            item.receiver.ContactPID.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.updatedAt &&
            item.updatedAt
              .toLowerCase()
              .startsWith(search.toLowerCase())),
      );
      const foundFavorites = recentUserData.filter(
        item =>
          (item.FirstName &&
            item.FirstName.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.LastName &&
            item.LastName.toLowerCase().startsWith(
              search.toLowerCase(),
            )),
      );

      setRecentChatData(foundChats);
      setRecentUserData(foundFavorites);
    } else {
      setInitialFormattedData();
      setRecentUserData(userFavorite.data);
    }
  };

  const MAX_TEXT_LENGTH = 32;
  const formatLastMessage = (text = '') => {
    if (text === '') {
      return '';
    }

    if (text.length <= MAX_TEXT_LENGTH) {
      return text;
    }

    return `${text.substr(0, MAX_TEXT_LENGTH)}...`;
  };
  const getItemTitle = (firstName, lastName) => {
    if (!firstName) return global.translate('Loading...', 194);
    return `${firstName} ${lastName}`;
  };

  const showStatusContent = (item = {}) => {
    if (item.status === SEEN && item.shouldDeliver) {
      return <Icon name="check" color="green" />;
    }
    if (item.status === SENDING) {
      return <Icon name="clock" />;
    }
    if (item.status === SENT) {
      return <Icon name="check" />;
    }
    if (!item.shouldDeliver) {
      return <Icon name="check" size="large" />;
    }
  };
  const hasUnreadMessages = (item = {}) =>
    item.sender !== currentAuthUser?.PID &&
    item.unreadMessagesCount?.length > 0 &&
    item.unreadMessagesCount[0].count > 0;

  const showBottomRightContent = (item = {}) => {
    if (item.sender === currentAuthUser?.PID) {
      return showStatusContent(item.directMessages[0]);
    }
    if (hasUnreadMessages(item)) {
      return (
        <Label
          className="unread-count"
          circular
          color="teal"
          key="teal"
          size="mini"
        >
          {item.unreadMessagesCount[0].count}
        </Label>
      );
    }
  };
  const showScrollIcons = () =>
    !userFavorite.loading && recentUserData.length > 3;

  const listContainerRef = useRef(null);

  const onArrowRightClick = () => {
    listContainerRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth',
    });
  };

  const onArrowLeftClick = () => {
    listContainerRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth',
    });
  };

  const showPresenceIcon = (user = {}) => {
    if (user.PresenceStatus === ONLINE) {
      return <Image src={onlineIcon} />;
    }
    if (user.PresenceStatus === AWAY) {
      return <Image src={awayIcon} />;
    }
    if (user.PresenceStatus === DO_NOT_DISTURB) {
      return <Image src={dndIcon} />;
    }

    if (user.PresenceStatus === INVISIBLE) {
      return <Image src={offlineIcon} />;
    }

    if (user.PresenceStatus === OFFLINE) {
      return <Image src={offlineIcon} />;
    }
  };

  return (
    <aside className="recent-chats">
      <Header className="chart_list_header">
        {global.translate('Chat', 577)}{' '}
        <div className="icons">
          <Image
            src={MessageIcon}
            className="cursor-pointer"
            onClick={onNewChatClick}
            height="29"
          />

          {width < 700 && (
            <Button
              icon
              basic
              color="red"
              className="chat-close"
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
          )}
        </div>
      </Header>
      <div className="top1">
        <div className="top">
          <div className="main-upper-nav-lower">
            <SearchInput
              placeholder={global.translate(
                'Search messages and favorites',
                1670,
              )}
              onKeyUp={handleItemsSearch}
              onChange={handleItemsSearch}
            />
            <p>{global.translate('Favorites', 1959)}</p>
            {recentUserData.length === 0 && !userFavorite.loading && (
              <Message
                fluid
                message={global.translate('No Favorites found', 1253)}
                error={false}
              />
            )}
            <div className="recents-container">
              <>
                {showScrollIcons() && (
                  <Icon
                    disabled={userFavorite.data.length < 3}
                    className="prevNextIcon"
                    name="caret left"
                    size="big"
                    onClick={onArrowLeftClick}
                  />
                )}
                {userFavorite.loading && <ItemsPlaceholder />}
                {!!recentUserData.length && (
                  <div className="container" ref={listContainerRef}>
                    {userFavorite.loading ? (
                      <ItemsPlaceholder />
                    ) : (
                      recentUserData.map(user => (
                        <div
                          className="contact-container"
                          key={user.PictureURL}
                          onClick={() => {
                            setGlobalChat({
                              currentChatType: ONE_TO_ONE,
                              currentChatTarget: user,
                              isChattingWithSingleUser: false,
                            })(dispatch);

                            if (width < 700) {
                              setIsOnMobileDetail(true);
                            }
                          }}
                        >
                          <div className="avatar-image">
                            <Thumbnail
                              style={{
                                width: '50px',
                                height: '50px',
                              }}
                              circular
                              className="user-avatar-image"
                              avatar={user.PictureURL || ''}
                              name={user.FirstName}
                              secondName={user.LastName}
                              alt={user.LastName}
                              hasError={hasError}
                              setHasError={setHasError}
                            />

                            <div className="icon-input">
                              {showPresenceIcon(user)}
                            </div>
                          </div>
                          <p className="single-line">
                            {user.FirstName} {user.LastName}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {showScrollIcons() && (
                  <Icon
                    disabled={userFavorite.data.length < 3}
                    className="prevNextIcon"
                    name="caret right"
                    onClick={onArrowRightClick}
                    size="big"
                  />
                )}
              </>
            </div>
          </div>
        </div>
        <div className="bottom-recents-list">
          <p>{global.translate('Recent', 1661)}</p>

          {recentChatsData.length === 0 && !loading && (
            <Message
              fluid
              message={global.translate('No recent activity', 1253)}
              error={false}
            />
          )}

          {recentChatsData.map(item => {
            return (
              <ListItem
                recentChat={item}
                key={item.PictureURL}
                currentAuthUser={currentAuthUser}
                onItemClick={() => {
                  setActiveChatThread(item)(dispatch);
                  setGlobalChat({
                    currentChatType: ONE_TO_ONE,
                    currentChatTarget: item.receiver,
                    isChattingWithSingleUser: false,
                  })(dispatch);
                  if (width < 700) {
                    setIsOnMobileDetail(true);
                  }
                }}
                itemTitle={getItemTitle(
                  item.receiver.FirstName,
                  item.receiver.LastName,
                )}
                itemDescription={formatLastMessage(
                  (Array.isArray(item.directMessages) &&
                    item.directMessages[0]?.body) ||
                    '',
                )}
                topRightText={formatTime(item.updatedAt)}
                imageURL={item.receiver.PictureURL}
                bottomRightContext={showBottomRightContent(item)}
                thumbnail
                darkStyle={hasUnreadMessages(item)}
              />
            );
          })}

          {loading && !recentChatsData?.length > 0 && (
            <Placeholder>
              {Array(4)
                .fill(1)
                .map(() => (
                  <Placeholder.Header
                    image
                    key={`Loadingthread-${Math.random() *
                      new Date()}`}
                  >
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                ))}
            </Placeholder>
          )}
        </div>
      </div>
    </aside>
  );
};
ChartListComponent.propTypes = {
  userFavorite: PropTypes.objectOf(PropTypes.any).isRequired,
  currentAuthUser: PropTypes.objectOf(PropTypes.any).isRequired,
  onNewChatClick: PropTypes.func.isRequired,
  setIsOnMobileDetail: PropTypes.func.isRequired,
};
export default ChartListComponent;
