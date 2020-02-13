import React, { useState, useEffect } from 'react';
import { Dropdown, Image, Input, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './SelectCountryCode.scss';
import countries from 'utils/countryCodes';

const SelectCountryCode = ({
  iconClass,
  pointing,
  country,
  setCountry,
}) => {
  const wrapperId = `input-${Math.ceil(Math.random() * 10000)}`;
  const [filteredCountries, setFilteredCountries] = useState(
    countries,
  );
  const [open, setOpen] = useState(false);

  const checkClickInput = event => {
    const { target = {} } = event || {};
    if (target.classList && target.id === wrapperId) {
      return setOpen(false);
    }
    return null;
  };

  useEffect(() => {
    document.addEventListener('mousedown', checkClickInput);
    return () => {
      document.removeEventListener('mousedown', checkClickInput);
    };
  });

  return (
    <>
      <div
        id={wrapperId}
        style={{
          display: open ? 'block' : 'none',
          background: 'transparent',
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
        }}
      />
      <span className="SelectCountryCode">
        <Dropdown
          trigger={
            <span className={iconClass}>
              <Image
                onClick={() => {
                  setOpen(!open);
                }}
                src={`https://www.countryflags.io/${country.flag}/flat/32.png`}
                className="inline"
              />
              <Icon
                onClick={() => {
                  setOpen(!open);
                }}
                name="caret down"
                className="inline"
              />
            </span>
          }
          icon={null}
          open={open}
          pointing={pointing}
        >
          <Dropdown.Menu>
            <Input
              icon="search"
              focus
              iconPosition="left"
              onChange={({ target: { value } }) => {
                setFilteredCountries(
                  countries.filter(({ text }) =>
                    text.toLowerCase().includes(value.toLowerCase()),
                  ),
                );
              }}
            />
            <Dropdown.Menu scrolling>
              {filteredCountries.map(({ key, value, text, flag }) => (
                <Dropdown.Item
                  key={key}
                  value={value}
                  flag={flag}
                  text={text}
                  onClick={() => {
                    setOpen(false);
                    setCountry({ key, value, text, flag });
                  }}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </span>
    </>
  );
};

SelectCountryCode.propTypes = {
  iconClass: PropTypes.string,
  pointing: PropTypes.string,
  country: PropTypes.instanceOf(Object),
  setCountry: PropTypes.func,
};

SelectCountryCode.defaultProps = {
  iconClass: 'trigger',
  pointing: 'top right',
  country: countries.find(country => country.flag === 'rw'),
  setCountry: () => true,
};

export default SelectCountryCode;
