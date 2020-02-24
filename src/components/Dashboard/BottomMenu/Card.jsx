import React from 'react';
import { Image } from 'semantic-ui-react';
import './Card.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const CardComponent = ({ title, to, image, subtitle }) => {
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
          : () => {}
      }
    >
      <span className="large-v-margin title">
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
};

CardComponent.defaultProps = {
  to: null,
};

export default CardComponent;
