/* eslint-disable */
import React from 'react';
import { Image, Label } from 'semantic-ui-react';
import './Card.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ArrowIcon from 'assets/images/services/arrow.svg';

const CardComponent = ({ title, to, onClick, image, subtitle }) => {
  const history = useHistory();
  return (
    <div
      role="button"
      tabIndex={0}
      className="service-card"
      onClick={
        to
          ? () => {
              history.push(to);
            }
          : onClick
      }
    >
      <div className="service-image">
        <Image src={image} />
      </div>

      <div className="card-details">
        <div className="card-title">{title}</div>
        <span>{subtitle}</span>
      </div>
      <div className="arrow-img">
        <Image src={ArrowIcon} />
      </div>
    </div>
  );
};
CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  isComingSoon: PropTypes.bool,
};

CardComponent.defaultProps = {
  to: null,
  onClick: () => null,
  isComingSoon: false,
};

export default CardComponent;
