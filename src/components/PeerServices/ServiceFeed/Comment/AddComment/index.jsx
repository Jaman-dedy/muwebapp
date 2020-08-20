import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import { useSelector } from 'react-redux';
import { LOGIN_RETURN_URL } from 'constants/general';
import Img from 'components/PeerServices/Image';

const AddCommentForm = ({
  commentForm: { form, onChange, handleKeyDown },
}) => {
  const { data: user } = useSelector(state => state.user.userData);
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      localStorage.removeItem('toComment');
      if (localStorage.lastUserScroll) {
        // window.scrollTo({
        //   top: localStorage.lastUserScroll,
        //   behavior: 'smooth',
        // });
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
          <Img
            height={31}
            width={31}
            compress
            noPlaceholder
            circular
            name={user?.FirstName}
            secondName={user?.LastName}
            id="comment-author-image"
            src={user?.PictureURL}
          />
        )}
      </div>
      <div className="contents">
        <Input
          placeholder={
            user
              ? global.translate('Write a comment here…', 1837)
              : global.translate('Please login to comment...', 1838)
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
