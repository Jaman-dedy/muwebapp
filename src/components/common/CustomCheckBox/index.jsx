import React from 'react';
import './CustomCheckBox.scss';

const CustomCheckBox = ({ onOptionsChange }) => {
  return (
    <label class="container">
      <input
        onChange={e => {
          // e.persist();
          onOptionsChange(e, {
            name: 'providerCheck',
            value: e.target.checked,
          });
        }}
        name="providerCheck"
        type="checkbox"
      />
      <span class="checkmark"></span>
    </label>
  );
};

export default CustomCheckBox;
