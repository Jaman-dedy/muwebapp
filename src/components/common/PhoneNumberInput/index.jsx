/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import './PhoneNumberInput.scss';
import countries from 'utils/countryCodes';
import SelectCountryCode from 'components/common/SelectCountryCode';

const PhoneNUmberForm = ({
  onChange,
  defaultCountryCode,
  PhoneNumberCode,
  value,
  error,
  label,
}) => {
  let defaultCountry =
    defaultCountryCode &&
    countries.find(country => country.key === defaultCountryCode);

  defaultCountry =
    defaultCountry ||
    (defaultCountryCode &&
      countries.find(
        country => country.value === defaultCountryCode,
      ));

  const [country, setCountry] = useState(
    defaultCountry || { value: '', key: '', text: '', flag: '' },
  );

  useEffect(() => {
    onChange({
      target: {
        name: 'PhoneNumberCode',
        value: country ? country.value : '',
      },
    });
  }, [country]);

  useEffect(() => {
    if (
      PhoneNumberCode &&
      PhoneNumberCode === defaultCountry &&
      defaultCountry.value
    ) {
      setCountry(defaultCountry);
    }
  }, [PhoneNumberCode]);

  useEffect(() => {
    if (defaultCountryCode && !country.value) {
      let defaultCountry = countries.find(
        country => country.key === defaultCountryCode,
      );
      defaultCountry =
        defaultCountry ||
        countries.find(
          country => country.value === defaultCountryCode,
        );
      setCountry(defaultCountry);
    }
  }, [defaultCountryCode]);

  return (
    <>
      <span>{global.translate(label)}</span>
      <Form.Field className="phone-number">
        <span className="country-code">
          {country && country.value}
        </span>
        <Input
          type="number"
          name="PhoneNumber"
          error={!!error || false}
          value={value}
          onChange={e => {
            onChange(e);
          }}
          className="phone-number-input"
          placeholder="555555555"
          required
          label={
            <SelectCountryCode
              country={country}
              setCountry={setCountry}
              iconClass="inline-block small-h-margin dropdown-flag"
            />
          }
          labelPosition="left"
        />
      </Form.Field>
    </>
  );
};

PhoneNUmberForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultCountryCode: PropTypes.string,
  PhoneNumberCode: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
};

PhoneNUmberForm.defaultProps = {
  defaultCountryCode: '',
  PhoneNumberCode: '',
  value: '',
  error: false,
  label: 'Phone Number',
};

export default PhoneNUmberForm;
