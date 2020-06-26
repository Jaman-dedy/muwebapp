import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Image } from 'semantic-ui-react';

import moment from 'moment';
import SelectLanguage from 'components/common/SelectLanguage';
import Logo from 'assets/images/logo.svg';
import bgCoverDefaultImage from 'assets/images/africaLadyWithPhone.jpg';
import './style.scss';

const setCoverImage = {
  backgroundImage: `url("${bgCoverDefaultImage}")`
};

const AuthWrapper = ({ children, rightHeadlineText, authHeader }) => {
  return (
    <div className="wrapper">
      <div className="wrapperSidebar" style= {setCoverImage}>
        <div className="header">
          <div className="headerDate">
            <span> {moment(new Date()).format('MMMM DD')}</span>
          </div>
          <div className="headerTitle">Save &amp; Receive</div>
          <div className="headerSubtitle">money worldwide</div>
          <div className="headerContent">Within 45 seconds</div>
          <div className="headerUrl">
            <a href="/">Learn more</a>
          </div>
        </div>
      </div>
      <Grid.Column className="right-column">
        <div className="logo">
          <Image src={Logo} centered />
        </div>

        <Header className="rightHeaderText">
          {authHeader ? (
            <Header.Content>
              {global.translate(authHeader)}
            </Header.Content>
          ) : (
            <Header.Content>
              {global.translate('Welcome', 1237)}
            </Header.Content>
          )}
        </Header>
        <p className="right-sub-header">{rightHeadlineText}</p>
        <div className="right">{children}</div>
        <SelectLanguage />
      </Grid.Column>
    </div>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rightHeadlineText: PropTypes.string.isRequired,
  authHeader: PropTypes.string,
};

AuthWrapper.defaultProps = {
  authHeader: '',
};

export default AuthWrapper;
