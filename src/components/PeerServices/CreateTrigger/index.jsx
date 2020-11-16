/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOGIN_RETURN_URL } from 'constants/general';
import openCreateModal from 'redux/actions/peerServices/openCreateModal';
import Img from 'components/common/Img';

import './index.scss';

const CreateServiceTrigger = () => {
  const {
    userData: { data },
  } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const { data: user } = useSelector(
    ({ user: { userData } }) => userData,
  );
  const history = useHistory();
  const location = useLocation();

  const handleOpenCreateForm = () => {
    if (!user?.PID) {
      localStorage.toOpenCreateForm = '1';
      localStorage.toOpenChat = '0';
      history.push({
        pathname: `/login`,
        search: `${LOGIN_RETURN_URL}=${location.pathname}`,
        state: {
          [LOGIN_RETURN_URL]: location.pathname,
          toOpenChat: true,
        },
      });
    } else {
      openCreateModal({ open: true })(dispatch);
    }
  };

  return (
    <div className="create-service-btn-trigger feed-item">
      <div className="image-thumb">
        <Img
          circular
          width={49}
          height={49}
          compress
          id="comment-author-image"
          src={data?.PictureURL}
        />
      </div>
      <div onClick={handleOpenCreateForm} className="contents">
        <div disabled className="teaser" fluid>
          <span>
            {' '}
            {global.translate(
              'What product or service are you offering?',
              1852,
            )}
          </span>
        </div>
        <Button
          style={{ color: 'white' }}
          disabled
          className="bg-orange  teaser-btn"
        >
          {global.translate('Publish', 1853)}
        </Button>
      </div>
    </div>
  );
};

CreateServiceTrigger.propTypes = {};

export default CreateServiceTrigger;
