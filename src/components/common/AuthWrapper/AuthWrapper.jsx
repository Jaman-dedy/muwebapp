import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Image } from 'semantic-ui-react';
import Logo from 'assets/images/logo.png';
import './style.scss';
import GirlImage from './GirlImage';

const AuthWrapper = ({ children, rightHeadlineText }) => {
  return (
    <div className="wrapper">
      <div className="left-column">
        <Header className="header">
          <Header.Content>
            Send and receive money worldwide within 45 seconds
          </Header.Content>
        </Header>
        <div className="imageWrapper">
          <GirlImage />
        </div>
      </div>
      <Grid.Column className="right-column">
        <Image src={Logo} centered className="logo" />
        <Header className="rightHeaderText">
          <Header.Content>{rightHeadlineText}</Header.Content>
        </Header>
        <div className="right">{children}</div>
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
};

export default AuthWrapper;
