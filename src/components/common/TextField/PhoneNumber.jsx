import './style.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'semantic-ui-react';

import SelectCountryCode from '../SelectCountryCode';

const PhoneNumberInput = ({
  country,
  disableSelect,
  disabled,
  setCountry,
  ...props
}) => {
  return (
    <div className="common-tel-area">
      <Input
        {...props}
        // disabled={disabled}
        type="tel"
        label={
          <SelectCountryCode
            country={country}
            disableSelect
            disabled={disabled}
            setCountry={setCountry}
            iconClass="inline-block small-h-margin dropdown-flag"
          >
            <span className="country-code">
              {country && country.value}
            </span>
          </SelectCountryCode>
        }
        labelPosition="left"
      />
    </div>
  );
};
PhoneNumberInput.propTypes = {
  country: PropTypes.instanceOf(PropTypes.object).isRequired,
  setCountry: PropTypes.func.isRequired,
};
export default PhoneNumberInput;
