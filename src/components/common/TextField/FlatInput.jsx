import React from 'react';
import { Input } from 'semantic-ui-react';
import './style.scss';

const FlatInput = ({ ...props }) => {
  return (
    <div className="flat-input">
      <Input {...props} />
    </div>
  );
};

export default FlatInput;
