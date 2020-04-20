import React from 'react';
import { Image } from 'semantic-ui-react';
import './style.scss';

const ActionOption = ({ image, text, ...props }) => {
  return (
    <div {...props} className="circle-wrapper">
      <div className="image-holder">
        <Image src={image} className="image" width={30} height={30} />
      </div>
      <p className="card-description">{text}</p>
    </div>
  );
};

export default ActionOption;
