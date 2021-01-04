/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import clearCardOperationFeesAction from 'redux/actions/addMoney/clearCardOperationFees';
import './style.scss';

const ShowStep = ({
  title,
  subTitle,
  levelNumber,
  visited,
  onClick,
  number,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        if (visited) {
          onClick(number);
          clearCardOperationFeesAction()(dispatch);
        }
      }}
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
  onClick: PropTypes.func,
  number: PropTypes.number,
};
ShowStep.defaultProps = {
  title: '',
  subTitle: '',
  levelNumber: '',
  visited: false,
  onClick: () => {},
  number: null,
};

export default ShowStep;
