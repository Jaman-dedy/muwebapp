import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, Visibility, Segment } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getWidth from 'utils/getWidth';
import PostsNavbar from '../Navbar';
import HomepageHeading from '../Heading';
import './style.scss';

const DesktopContainer = ({ children, title }) => {
  const { navbarFixed: fixed } = useSelector(
    state => state.peerServices.desktopLayout,
  );

  const { pathname: path } = useLocation();

  const hideFixedMenu = () => {
    document
      .querySelector(
        '.ui.large.borderless.inverted.secondary.navbar.menu',
      )
      .classList.toggle('white');
    document
      .querySelector('#sidebar')
      .classList.remove('sidebar-add');
  };
  const showFixedMenu = () => {
    document
      .querySelector(
        '.ui.large.borderless.inverted.secondary.navbar.menu',
      )
      .classList.toggle('white');
    document.querySelector('#sidebar').classList.add('sidebar-add');
  };

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
