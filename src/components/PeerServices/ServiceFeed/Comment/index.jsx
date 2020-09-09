import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import Img from 'components/PeerServices/Image';

import TimeAgo from 'components/common/TimeAgo';
import InlineActionItem from '../ActionItem';

const CommentItem = ({
  comment: {
    CommentOwnerPID,
    PictureURL,
    FullName,
    CommentNumber,
    Comment,
    Date: CommentedAt,
    updating,
  },
  onReportClick,
  user,
  onDeleteComment,
}) => {
  const history = useHistory();
  return (
    <div
      key={CommentNumber}
      className={`comment-item ${
        updating ? 'deleting' : 'stopped-updating'
      }`}
    >
      <div className="image-thumb">
        <Img
          compress
          circular
          width={31}
          id="comment-author-image"
          src={PictureURL}
        />
      </div>
      <div className="contents">
        <div className="header">
          <div
            className="author"
            onClick={() => {
              history.push(
                `/marketplace/user/${CommentOwnerPID.toLowerCase()}`,
              );
            }}
          >
            <span className="fullName">{FullName}</span>{' '}
            <span className="username">
              @{CommentOwnerPID.toLowerCase()}
            </span>
          </div>

          <div className="report-flag">
            {user?.PID === CommentOwnerPID ? (
              <Dropdown
                icon={{ name: 'ellipsis vertical', size: 'large' }}
              >
                <Dropdown.Menu direction="left">
                  <Dropdown.Item
                    icon="trash"
                    text={global.translate('Remove comment', 1840)}
                    onClick={onDeleteComment}
                  />
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <InlineActionItem
                onClick={onReportClick}
                icon="flag"
                text={global.translate('Report Comment', 1839)}
              />
            )}
          </div>
        </div>

        <div className="body">
          <div className="description">
            <p>{Comment}</p>
          </div>
          <p className="date">
            <TimeAgo time={CommentedAt} />
          </p>
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  onReportClick: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentItem;
