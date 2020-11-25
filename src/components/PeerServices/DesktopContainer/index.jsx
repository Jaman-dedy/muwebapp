import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Responsive, Visibility, Segment } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import handleSetNavbarFixed from 'redux/actions/peerServices/handleSetNavbarFixed';
import getWidth from 'utils/getWidth';
import PostsNavbar from '../Navbar';
import HomepageHeading from '../Heading';

const DesktopContainer = ({ children, title }) => {
  const { navbarFixed: fixed } = useSelector(
    state => state.peerServices.desktopLayout,
  );
  const dispatch = useDispatch();

  const { pathname: path } = useLocation();

  const hideFixedMenu = () => handleSetNavbarFixed(false)(dispatch);
  const showFixedMenu = () => handleSetNavbarFixed(true)(dispatch);

  return (
    <Responsive
      getWidth={getWidth}
      minWidth={Responsive.onlyTablet.minWidth}
    >
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment
          textAlign="center"
          style={{
            minHeight: !path.includes('/marketplace/user')
              ? 500
              : 250,
          }}
          id="show-case-area"
          vertical
        >
          <PostsNavbar fixed={fixed} />{' '}
          <HomepageHeading disableSearch={!!title} title={title} />
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  );
};

DesktopContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

DesktopContainer.defaultProps = {
  title: null,
};
export default DesktopContainer;
