/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import './style.scss';

const FormCheckBox = ({ checkLabel, ...props }) => {
  return (
    <div className="checkbox_container">
      <Checkbox {...props} label={{ children: checkLabel }} />
    </div>
  );
};

export default FormCheckBox;
