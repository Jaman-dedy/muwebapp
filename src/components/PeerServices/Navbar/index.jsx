import React, { useState } from 'react';
import {
  Menu,
  Container,
  Image,
  Button,
  Icon,
} from 'semantic-ui-react';

import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import Logo from 'assets/images/peer-services/2UMoneyLogo.png';
import UserPlaceholder from 'assets/images/avatarplaceholder.png';
import './style.scss';
import openCreateModal from 'redux/actions/peerServices/openCreateModal';
import { LOGIN_RETURN_URL } from 'constants/general';
import Thumbnail from 'components/common/Thumbnail';
import Img from 'components/common/Img';
import SelectLanguage from 'components/common/SelectLanguage';
import ProfileDropdown from 'components/common/DashboardLayout/ProfileDropdwn';

import { closeProfileDropDown } from 'redux/actions/dashboard/dashboard';

const PostsNavbar = ({ fixed, mobile, handleToggle }) => {
  const [hasError, setHasError] = useState(false);
  const { data: user, loading } = useSelector(
    state => state.user.userData,
  );
  const trigger = (
    <div className="user-image">
      {user && (
        <Thumbnail
          name={user ? user.FirstName : ''}
          secondName={user ? user.LastName : ''}
          circular
          compress
          alt={
            <Img
              name={user ? user.FirstName : ''}
              secondName={user ? user.LastName : ''}
              compress
              circular
              avatar
              src={UserPlaceholder}
              width={30}
              height={30}
              
            />
          }
          avatar={user ? user.PictureURL : ''}
          width={30}
          height={30}
          setHasError={setHasError}
        />
      )}{' '}
      {global.translate('Menu', 1797)}
    </div>
  );
  const history = useHistory();

  const dispatch = useDispatch();
  const handleNewServiceClicked = () => {
    openCreateModal({ open: true })(dispatch);
  };

  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <Menu
        className="navbar"
        fixed={fixed || mobile ? 'top' : null}
        inverted={!fixed}
        pointing={fixed}
        borderless
        secondary={!fixed}
        size={mobile ? 'small' : 'large'}
      >
        <Container>
          {mobile && (
            <Menu.Item onClick={handleToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
          )}
          {!mobile && (
            <Image
              src={Logo}
              onClick={() => {
                history.push('/peer-services');
              }}
              className="market-place-logo  cursor-pointer"
              height={mobile ? 15 : 30}
            />
          )}
          {!user && !loading && (
            <Menu.Item position="right">
              <Button
                as={Link}
                to={{
                  pathname: `/login`,
                  search: `${LOGIN_RETURN_URL}=${history.location.pathname}`,
                  state: {
                    [LOGIN_RETURN_URL]: history.location.pathname,
                  },
                }}
              >
                {global.translate('Log in')}
              </Button>
              <Button
                style={{
                  marginLeft: ' 0.5em',
                  color: 'white',
                }}
                to="/register"
                as={Link}
                className="bg-orange"
              >
                {global.translate('Register')}
              </Button>
            </Menu.Item>
          )}

          {user && (
            <Menu.Item position="right">
              <Button
                className="bg-orange"
                onClick={handleNewServiceClicked}
                style={{
                  color: 'white',
                  marginLeft: mobile ? '0em' : '0.5em',
                }}
                content={global.translate('New Service')}
              />
            </Menu.Item>
          )}

          <Menu.Item>
            <SelectLanguage noColorStyle hasLabel position="static" />
          </Menu.Item>

          {!loading && (
            <Menu.Item>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setOpenProfile(false);
                }}
              >
                <span
                  className="avatar-profile flex navbar_item_icon  cursor-pointer"
                  onClick={() => {
                    closeProfileDropDown(dispatch);
                    setOpenProfile(true);
                  }}
                >
                  <ProfileDropdown
                    trigger={trigger}
                    setOpenProfile={setOpenProfile}
                    openProfile={openProfile}
                    profileData={user}
                    icon="dropdown"
                  />
                </span>
              </OutsideClickHandler>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    </>
  );
};

export default PostsNavbar;
