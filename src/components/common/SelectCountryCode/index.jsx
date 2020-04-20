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
  disabled,
  children,
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
        disabled={disabled}
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
          disabled={disabled}
          trigger={
            <span className={iconClass}>
              {country.flag ? (
                <Image
                  style={disabled ? { marginTop: 7 } : {}}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  src={`https://www.countryflags.io/${country.flag}/flat/32.png`}
                  className="inline"
                />
              ) : (
                <Icon name="phone" className="flag-placeholder" />
              )}

              <Icon
                onClick={() => {
                  setOpen(!open);
                }}
                name={!disabled && 'caret down'}
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
              autoFocus
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

        {children}
      </span>
    </>
  );
};

SelectCountryCode.propTypes = {
  iconClass: PropTypes.string,
  pointing: PropTypes.string,
  country: PropTypes.instanceOf(Object),
  setCountry: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  disableSelect: PropTypes.bool,
};

SelectCountryCode.defaultProps = {
  iconClass: 'trigger',
  pointing: 'top left',
  country: {},
  setCountry: () => true,
  disabled: false,
  children: <div />,
  disableSelect: false,
};

export default SelectCountryCode;
