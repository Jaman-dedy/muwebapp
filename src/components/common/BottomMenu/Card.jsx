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
      className="cards_bottom flex flex-column align-items-center"
      onClick={
        to
          ? () => {
              history.push(to);
            }
          : onClick
      }
    >
      {' '}
      {isComingSoon ? (
        <Label
          style={{ marginLeft: '-5.6rem' }}
          as="a"
          color="orange"
          ribbon
        >
          {global.translate(`Coming soon`, 1747)}
        </Label>
      ) : (
        ''
      )}
      <span
        style={{ marginTop: isComingSoon ? '-1px' : null }}
        className="large-v-margin title"
      >
        {global.translate(title)}
      </span>
      <Image src={image} height={70} className="image" />
      <span className="large-v-margin center-align sub-title">
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
