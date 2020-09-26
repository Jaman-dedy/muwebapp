/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const ActionOption = ({ image, iconProps, text, ...props }) => {
  return (
    <div {...props} className="circle-wrapper">
      <div className="image-holder">
        {iconProps ? (
          <Icon {...iconProps} />
        ) : (
          <Image
            src={image}
            className="image"
            width={30}
            height={30}
          />
        )}
      </div>
      <span className="card-description">{text}</span>
    </div>
  );
};

ActionOption.propTypes = {
  iconProps: PropTypes.objectOf(PropTypes.any),
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

ActionOption.defaultProps = {
  iconProps: null,
};

export default ActionOption;
