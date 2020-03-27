import React, { useState, useEffect } from 'react';
import { Image, Dropdown, Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

const CustomDropdown = ({
  options,
  currentOption,
  onChange,
  search,
}) => {
  const wrapperId = `input-${Math.ceil(Math.random() * 10000)}`;
  const [filteredOptions, setFilteredOptions] = useState(options);
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
      <Dropdown
        id={wrapperId}
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
            <div className="dropdown-wallet">
              <Image src={currentOption.Flag} className="inline" />
              <div>
                <div>{currentOption.CountryName}</div>
              </div>
            </div>
            <Icon name="caret down" className="inline" />
          </span>
        }
        icon={null}
      >
        <Dropdown.Menu>
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
            {filteredOptions.map(
              ({ CountryName, Flag, CountryCode }) => (
                <Dropdown.Item
                  key={CountryName}
                  onClick={() => {
                    setOpen(false);
                    onChange({
                      target: {
                        name: 'CountryCode',
                        value: CountryCode,
                      },
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
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  currentOption: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
  search: PropTypes.bool,
};

export default CustomDropdown;
