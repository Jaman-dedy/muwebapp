import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Responsive, Visibility, Segment } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import getWidth from 'utils/getWidth';
import PostsNavbar from '../Navbar';
import HomepageHeading from '../Heading';

const DesktopContainer = ({ children, title }) => {
  const [fixed, setFixed] = useState(false);
  const { pathname: path } = useLocation();
  const hideFixedMenu = () => setFixed(false);
  const showFixedMenu = () => setFixed(true);

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
            minHeight: !path.includes('/user-services') ? 500 : 250,
          }}
          id="show-case-area"
          vertical
        >
          <PostsNavbar fixed={fixed} />{' '}
          <HomepageHeading disableSearch={!!title} />
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
