import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Icon, Menu, Sidebar, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import './style.scss';
import Message from 'components/common/Message';
import SearchExampleStandard from '../SearchInput';
import SearchResultItem from './searchResultItem';

const SearchMessagesSidebar = ({
  animation,
  direction,
  visible,
  onHide,
}) => {
  const {
    messages: { directMessages },
  } = useSelector(state => state.chat);

  const {
    userData: { data },
  } = useSelector(state => state.user);

  const { currentChatTarget } = useSelector(
    state => state.chat.appChat,
  );

  const {
    allContacts: { data: contacts },
  } = useSelector(state => state.contacts);

  const [isSearching, setIsSearching] = useState(false);

  const userMessages = directMessages
    .filter(
      item =>
        item.sender === currentChatTarget?.ContactPID ||
        item.receiver === currentChatTarget?.ContactPID,
    )
    .sort((a, b) => b.updatedAt?.localeCompare(a.updatedAt))
    .map(({ sender, receiver, ...rest }) => {
      return {
        sender,
        receiver,
        ...rest,
        owner:
          sender === data?.PID
            ? global.translate('Me', 1658)
            : contacts?.find(
                item =>
                  item.ContactPID === currentChatTarget?.ContactPID ||
                  item.ContactPID === sender,
              ).FirstName,
      };
    });

  const [messagesToShow, setMessages] = useState([]);

  const filterItems = (e, { value }) => {
    if (value.length === 0) {
      setIsSearching(false);
      setMessages([]);
      return;
    }
    setIsSearching(true);
    const found = userMessages.filter(item => {
      try {
        return (
          item.body.toLowerCase().search(value.toLowerCase()) !== -1
        );
      } catch (error) {
        return [];
      }
    });

    setMessages(found);
  };

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
      <Segment.Group style={{ padding: '10px' }}>
        <Segment className="segment-top-header">
          <div className="setting-item">
            <Icon
              name="arrow left"
              className="setting-item-icon"
              onClick={onHide}
            />
            <p className="sidebar-title">
              {global.translate('Search Messages', 1660)}
            </p>
          </div>
        </Segment>
        <Segment>
          <SearchExampleStandard onChange={filterItems} />
        </Segment>
      </Segment.Group>
      <div className="search-results">
        {messagesToShow.map(message => (
          <SearchResultItem message={message} />
        ))}

        {messagesToShow.length === 0 && isSearching && (
          <Message
            fluid
            message={global.translate('No messages found', 1659)}
            error={false}
          />
        )}
      </div>
    </Sidebar>
  );
};

SearchMessagesSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
  onHide: PropTypes.func,
};

SearchMessagesSidebar.defaultProps = {
  animation: 'push',
  direction: 'right',
  visible: false,
  onHide: () => {},
};
export default SearchMessagesSidebar;
