import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Responsive,
  Sidebar,
  Menu,
  Segment,
  Image,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import getWidth from 'utils/getWidth';
import handleSidebarHideAction from 'redux/actions/peerServices/handleSidebarHide';
import Logo from 'assets/images/marketplace/2UMoneyLogo.png';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import PostCategories from '../Categories';
import PostsNavbar from '../Navbar';
import HomepageHeading from '../Heading';
import './style.scss';

const MobileContainer = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { sidebarOpened } = useSelector(
    state => state.peerServices.mobileLayout,
  );

  const handleSidebarHide = useCallback(() => {
    handleSidebarHideAction({ toggle: false, sidebarOpened: false })(
      dispatch,
    );
  }, []);

  const handleToggle = useCallback(() => {
    handleSidebarHideAction({ toggle: true, sidebarOpened: true })(
      dispatch,
    );
  }, []);

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation="push"
        onHide={handleSidebarHide}
        vertical
        visible={sidebarOpened}
      >
        <Image
          src={Logo}
          onClick={() => {
            if (isAppDisplayedInWebView()) {
              history.push('/marketplace');
            } else {
              history.push('/');
            }
          }}
          className="market-place-logo-mobile  cursor-pointer"
          height={30}
        />
        <PostCategories onItemClick={handleToggle} />
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          textAlign="center"
          id="show-case-area"
          style={{ minHeight: 245, padding: '1em 0em' }}
          vertical
        >
          <PostsNavbar mobile handleToggle={handleToggle} />
          <HomepageHeading mobile />
        </Segment>

        {children}
      </Sidebar.Pusher>
    </Responsive>
  );
};

MobileContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MobileContainer;
