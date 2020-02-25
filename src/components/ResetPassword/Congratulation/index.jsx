/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import back from 'assets/images/back_icon.png';

import './Congratulation.scss';

const Congratulation = ({ resetPasswordData, screenSix }) => {
  return (
    <div className="congratulation-reset">
      <div className="back">
        <Image src={back} size="mini" href="/login" />
      </div>

      <div className="content">
        <Icon name="check" className="check text-success" />
        <div className="headline">
          <span>Congratulations</span>
        </div>
        <div className="congratulate">
          <span>{resetPasswordData.personalId}, you made it</span>
        </div>
        <div className="text">
          <span>
            Your Password and PIN number have been reset with
            immediate effect.
          </span>
        </div>

        <div className="login">
          <Link to="/login"> Back to Login?</Link>
        </div>
      </div>
    </div>
  );
};

Congratulation.propTypes = {
  screenSix: PropTypes.instanceOf(Object).isRequired,
};

export default Congratulation;
