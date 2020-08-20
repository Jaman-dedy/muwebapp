import React from 'react';
import PropTypes from 'prop-types';
import {
  Responsive,
  Sidebar,
  Menu,
  Segment,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import getWidth from 'utils/getWidth';
import handleSidebarHideAction from 'redux/actions/peerServices/handleSidebarHide';
import PostCategories from '../Categories';
import PostsNavbar from '../Navbar';
import HomepageHeading from '../Heading';

const MobileContainer = ({ children }) => {
  const { sidebarOpened } = useSelector(
    state => state.peerServices.mobileLayout,
  );
  const dispatch = useDispatch();

  const handleSidebarHide = () => {
    handleSidebarHideAction({ toggle: false, sidebarOpened: false })(
      dispatch,
    );
  };

  const handleToggle = () => {
    handleSidebarHideAction({ toggle: true, sidebarOpened: true })(
      dispatch,
    );
  };

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
