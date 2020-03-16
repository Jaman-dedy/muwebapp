import React from 'react';
import { Image, Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

const CustomDropdown = ({ options, currentOption, onChange }) => {
  return (
    <Dropdown
      className="custom-dropdown"
      trigger={
        <span className="dropdown-trigger">
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
        <Dropdown.Menu scrolling>
          {options.map(({ CountryName, Flag, CountryCode }) => (
            <Dropdown.Item
              key={CountryName}
              onClick={() => {
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
          ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};

CustomDropdown.defaultProps = {
  options: [{}],
  currentOption: {},
  onChange: () => null,
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  currentOption: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
};

export default CustomDropdown;
