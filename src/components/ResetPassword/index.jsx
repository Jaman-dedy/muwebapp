import React from 'react';

import { Grid, Header, Image } from 'semantic-ui-react';
import WelcomePic from '../../assets/images/WelcomePic-removebg-preview.png';
import Logo from '../../assets/images/logo.png';
/* import OTPForm from './OTPForm';
import PasswordForm from './PasswordForm';
import UserInfoForm from './UserInfoForm';
import PINForm from './PINForm'; */

import QuestionsForm from './QuestionsForm';

import './ResetPassword.scss';

const ResetPassword = ({
  credentials,
  onInputChange,
  handleSubmit,
  login,
}) => {
  return (
    <Grid columns="equal" className="reset-password">
      <Grid.Column className="left-column">
        <Header className="header">
          <Header.Content>
            Send and receive money worldwide within 45 seconds
          </Header.Content>
        </Header>
        <Image src={WelcomePic} centered className="image" />
      </Grid.Column>
      <Grid.Column className="right-column">
        <Image src={Logo} centered className="logo" />
        <Header className="label">
          <Header.Content centered>
            We trust you, we do care about the safety of your
            transactions
          </Header.Content>
        </Header>

        <div className="form-content">
          <QuestionsForm />
        </div>
        <div className="dots">
          {Array(5)
            .fill()
            .map((value, index) => (
              <div
                key={index}
                className={`dot ${index === 0 ? 'active' : null}`}
              ></div>
            ))}
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default ResetPassword;
