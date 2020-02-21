/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './Congratulation.scss';

const Congratulation = ({ screenSix }) => {
  const {
    registerUser: { username },
  } = screenSix;

  return (
    <div className="congratulation">
      <Icon name="check" className=" text-success" />
      <div className="headline">
        <span>Congratulations</span>
      </div>
      <div className="congratulate">
        <span className="name">{username}</span>
        <span>, you made it</span>
      </div>
      <div className="text">
        <span>
          Your Password and PIN number have been reset with immediate
          effect.
        </span>
      </div>

      <div className="login">
        <Link to="/login"> Back to Login?</Link>
      </div>
    </div>
  );
};

Congratulation.propTypes = {
  screenSix: PropTypes.instanceOf(Object).isRequired,
};

export default Congratulation;
