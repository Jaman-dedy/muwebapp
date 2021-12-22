import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  Flag as SementicFlag,
  Icon,
  Image,
  Input,
} from 'semantic-ui-react';
import getCountryFlag from 'helpers/getCountryFlag';
import './Dropdown.scss';

const CustomDropdown = ({
  options,
  currentOption,
  onChange,
  search,
  setCurrentOption,
  disabled,
  keyName,
  className,
}) => {
  const wrapperId = `input-${Math.ceil(Math.random() * 10000)}`;
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [open, setOpen] = useState(false);

  const [flag, setFlag] = useState('');

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const checkClickInput = event => {
    const { target = {} } = event || {};
    if (target.classList && target.id === wrapperId) {
      return setOpen(false);
    }
    return null;
  };

  useEffect(() => {
    if (currentOption?.Flag) {
      setFlag(currentOption.Flag);
    }
  }, [currentOption]);

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

      <Dropdown
        id={wrapperId}
        disabled={disabled}
        className="custom-dropdown"
        open={open}
        trigger={
          <span
            className="dropdown-trigger"
            onClick={() => setOpen(!open)}
            tabIndex={-1}
            onKeyDown={() => setOpen(!open)}
            role="button"
          >
            <div
              className="dropdown-wallet"
              style={{
                width: '100%',
              }}
            >
              {(() => {
                if (currentOption?.Flag && flag) {
                  return (
                    <Image
                      src={
                        flag ||
                        getCountryFlag(currentOption?.CountryCode)
                      }
                      className="inline"
                      onError={() => setFlag('')}
                    />
                  );
                }
                if (currentOption?.Flag) {
                  return (
                    <SementicFlag name={currentOption?.CountryCode} />
                  );
                }
                return (
                  <Icon name="phone" className="flag-placeholder" />
                );
              })()}
              <div>
                <div>
                  {currentOption && currentOption.CountryName}
                </div>
              </div>
            </div>
            {!disabled && (
              <Icon name="caret down" className="inline" />
            )}
          </span>
        }
        icon={null}
      >
        <Dropdown.Menu className={className}>
          {search && (
            <Input
              tabIndex={0}
              icon="search"
              autoFocus
              iconPosition="left"
              onChange={({ target: { value } }) => {
                setFilteredOptions(
                  options.filter(({ CountryName }) =>
                    CountryName.toLowerCase().includes(
                      value.toLowerCase(),
                    ),
                  ),
                );
              }}
            />
          )}
          <Dropdown.Menu scrolling search={search}>
            {filteredOptions &&
              filteredOptions.map(
                ({
                  CountryName,
                  Flag,
                  CountryCode,
                  Currency,
                  Currencies,
                  MainCurrency,
                }) => (
                  <Dropdown.Item
                    search
                    key={CountryName}
                    onClick={() => {
                      setOpen(false);
                      onChange({
                        target: {
                          name: keyName,
                          value: CountryCode,
                        },
                      });
                      setCurrentOption({
                        CountryName,
                        Flag,
                        CountryCode,
                        Currency,
                        Currencies,
                        MainCurrency,
                      });
                    }}
                  >
                    <span className="dropdown-trigger">
                      <div className="dropdown-wallet">
                        <Image src={Flag} className="inline" />
                        <div>
                          <div>{CountryName}</div>
                        </div>
                      </div>
                    </span>
                  </Dropdown.Item>
                ),
              )}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

CustomDropdown.defaultProps = {
  options: [{}],
  currentOption: {},
  onChange: () => null,
  search: false,
  setCurrentOption: () => {},
  disabled: false,
  keyName: 'CountryCode',
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  currentOption: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
  search: PropTypes.bool,
  setCurrentOption: PropTypes.func,
  disabled: PropTypes.bool,
  keyName: PropTypes.string,
  className: PropTypes.string.isRequired,
};

export default CustomDropdown;
