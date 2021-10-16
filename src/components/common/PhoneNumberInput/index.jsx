import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import './PhoneNumber.scss';
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
      PhoneNumberCode === defaultCountry?.value
    ) {
      setCountry(defaultCountry);
    } else if (PhoneNumberCode) {
      const foundCountry = countries.find(
        country => country.value === PhoneNumberCode,
      );
      if (foundCountry) setCountry(foundCountry);
    }
  }, [PhoneNumberCode, defaultCountry]);

  useEffect(() => {
    if (defaultCountryCode && !country?.value) {
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

  useEffect(() => {
    setCountry(
      countries.find(country => country.value === defaultCountryCode),
    );
  }, [defaultCountryCode]);

  return (
    <>
      <div>{global.translate(label)}</div>
      <Form>
        <div className="user-phone-number">
          <SelectCountryCode
            country={country}
            setCountry={setCountry}
            iconClass="dropdown-flag"
            className="dropdown-container"
          />
          <div className="phone-country-code">
            <span>{country && country.value}</span>
          </div>
          <input
            type="number"
            name="PhoneNumber"
            error={!!error || false}
            value={value}
            onChange={e => {
              onChange(e);
            }}
            className="phone-number-input"
            placeholder="78-000-0000"
            required
          />
        </div>
      </Form>
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
  style: PropTypes.instanceOf(Object),
};

PhoneNUmberForm.defaultProps = {
  defaultCountryCode: '',
  PhoneNumberCode: '',
  value: '',
  error: false,
  label: global.translate('Phone Number'),
  style: {},
};

export default PhoneNUmberForm;
