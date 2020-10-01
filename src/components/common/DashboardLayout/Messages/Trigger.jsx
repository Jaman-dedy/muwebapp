import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Image, Label } from 'semantic-ui-react';
import MessageIcon from 'assets/images/h-chat.svg';
import './style.scss';

const Trigger = ({ onClick }) => {
  const { messages } = useSelector(state => state.chat);
  const totalNewMessages = messages.chatThreads?.data?.data
    .map(item => {
      if (item.unreadMessagesCount?.length > 0) {
        return item.unreadMessagesCount[0].count;
      }
      return 0;
    })
    .reduce((acc, item) => acc + Number(item), 0);
  return (
    <>
      <div
        className="messages-wrapper"
        title={global.translate('Open Chat')}
      >
        {!!(totalNewMessages && Number(totalNewMessages) !== 0) && (
          <span className="floating-message-count" onClick={onClick}>
            {totalNewMessages > 99 ? '99+' : totalNewMessages}
          </span>
        )}
        <Image src={MessageIcon} onClick={onClick} />
      </div>
    </>
  );
};
Trigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Trigger;
