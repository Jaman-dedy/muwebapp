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
      <p className="card-description">{text}</p>
    </div>
  );
};

ActionOption.propTypes = {
  iconProps: PropTypes.objectOf(PropTypes.any),
};

ActionOption.defaultProps = {
  iconProps: null,
};

export default ActionOption;
