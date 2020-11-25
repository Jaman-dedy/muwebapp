import React from 'react';
import PropTypes from 'prop-types';
import NewServiceContainer from 'containers/PeerServices/NewService';
import DesktopContainer from '../DesktopContainer';
import MobileContainer from '../MobileContainer';
import ReportModal from '../ServiceFeed/ReportModal';
import ImageGallery from '../ServiceFeed/MediaViewer';
import DeleteServiceModal from '../DeleteServiceModal';

const ResponsiveContainer = ({ children, title = null }) => (
  <div>
    <ReportModal />
    <ImageGallery />
    <DeleteServiceModal />
    <NewServiceContainer />

    <DesktopContainer title={title}>{children}</DesktopContainer>
    <MobileContainer title={title}>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
export default ResponsiveContainer;
