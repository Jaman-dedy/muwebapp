/* eslint-disable */
import React from 'react';
import { Image, Label } from 'semantic-ui-react';
import './Card.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const CardComponent = ({
  title,
  to,
  onClick,
  image,
  subtitle,
  isComingSoon,
}) => {
  const history = useHistory();
  return (
    <div
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
      className="cards"
      onClick={
        to
          ? () => {
              history.push(to);
            }
          : onClick
      }
    >
      {isComingSoon ? (
        <Label
          as="a"
          color="red"
          ribbon
        >
          {global.translate(`Coming soon`, 1747)}
        </Label>
      ) : (
        ''
      )}
        <Image src={image} height={70} className="image" />
      <h3
        style={{ marginTop: isComingSoon ? '-1px' : null }}
        className="small-v-margin title"
      >
        {global.translate(title)}
      </h3>
      <span className="center-align">
        {global.translate(subtitle)}
      </span>
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
