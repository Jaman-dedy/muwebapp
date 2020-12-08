import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const ShowStep = ({ title, subTitle, levelNumber, visited }) => {
  return (
    <div
      className="step-container"
      style={
        visited
          ? {
              background: '#ffffff',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              color: '#6B7280',
            }
          : { background: '#eeeeee', color: '#a8aeb9' }
      }
    >
      <div className="level-number">
        <Image src={levelNumber} />
      </div>
      <div className="text-description">
        <span className="title">{title}</span>
        <span>{subTitle}</span>
      </div>
    </div>
  );
};

ShowStep.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  levelNumber: PropTypes.string,
  visited: PropTypes.bool,
};
ShowStep.defaultProps = {
  title: '',
  subTitle: '',
  levelNumber: '',
  visited: false,
};

export default ShowStep;
