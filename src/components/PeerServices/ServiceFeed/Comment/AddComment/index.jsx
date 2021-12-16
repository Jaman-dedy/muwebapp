import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import { useSelector } from 'react-redux';
import { LOGIN_RETURN_URL } from 'constants/general';
import Thumbnail from 'components/common/Thumbnail';

const AddCommentForm = ({
  commentForm: { form, onChange, handleKeyDown },
}) => {
  const { data: user } = useSelector(state => state.user.userData);
  const { pathname } = useLocation();
  const history = useHistory();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.removeItem('toComment');
      if (localStorage.lastUserScroll) {
        localStorage.removeItem('lastUserScroll');
      }
    }
  }, [user]);

  const anonymousUserClick = () => {
    localStorage.toComment = '1';
    localStorage.lastUserScroll = window.pageYOffset;
    history.push({
      pathname: `/login`,
      search: `${LOGIN_RETURN_URL}=${pathname}`,
      state: {
        [LOGIN_RETURN_URL]: pathname,
      },
    });
  };

  return (
    <div
      className="add-comment-item"
      onClick={() => {
        if (!user) {
          anonymousUserClick();
        }
      }}
    >
      <div className="image-thumb">
        {user && (
          <Thumbnail
            avatar={user?.PictureURL}
            size="small"
            name={user?.FirstName}
            secondName={user?.LastName}
            circular
            compress
            id="comment-author-image"
            style={{
              height: '36px',
              width: '36px',
              objectFit: 'cover',
              marginRight: '0px',
            }}
            setHasError={setHasError}
          />
        )}
      </div>
      <div className="contents">
        <Input
          placeholder={
            user
              ? global.translate('Write a comment here…')
              : global.translate('Please login to comment...')
          }
          onChange={onChange}
          name="comment"
          onKeyDown={handleKeyDown}
          value={form.comment || ''}
          fluid
        />
      </div>
    </div>
  );
};
AddCommentForm.propTypes = {
  commentForm: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default AddCommentForm;
