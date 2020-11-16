import React from 'react';
import { Image, Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

const CustomDropdown = ({
  options,
  currentOption,
  onChange,
  keyName,
  setCurrentOption,
  placeholder,
  style,
}) => {
  return (
    <Dropdown
      style={style}
      className="custom-dropdown"
      trigger={
        <span className="dropdown-trigger">
          {currentOption && currentOption.AccountNumber ? (
            <div className="dropdown-wallet">
              <Image src={currentOption.Flag} className="inline" />
              <div>
                <div className="account-number-div">
                  {currentOption.AccountNumber}
                </div>
                <span className="account-name-span">
                  {currentOption.AccountName &&
                    `(${currentOption.AccountName})`}
                </span>
              </div>
            </div>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
          <Icon name="caret down" className="inline" />
        </span>
      }
      icon={null}
    >
      <Dropdown.Menu>
        <Dropdown.Menu scrolling>
          {options &&
            options.map(
              (
                {
                  AccountNumber,
                  Flag,
                  AccountName,
                  Currency,
                  Balance,
                },
                index,
              ) => (
                <Dropdown.Item
                  key={AccountNumber + index.toString()}
                  onClick={e => {
                    onChange(
                      {
                        target: {
                          name: keyName,
                          value: AccountNumber,
                        },
                      },
                      {
                        name: keyName,
                        value: AccountNumber,
                      },
                    );
                    setCurrentOption({
                      AccountNumber,
                      Flag,
                      AccountName:
                        `${AccountName.substring(0, 13)}...` || '',
                      Currency,
                      Balance,
                    });
                  }}
                >
                  <span className="dropdown-trigger">
                    <div className="dropdown-wallet">
                      <Image src={Flag} className="inline" />
                      <div>
                        <div className="account-number-div">
                          {AccountNumber}
                        </div>
                        <span className="account-name-span">
                          {AccountName &&
                            `(${AccountName.substring(0, 18)} ${
                              AccountName.length > 18 ? '...' : ''
                            })`}
                        </span>
                      </div>
                    </div>
                  </span>
                </Dropdown.Item>
              ),
            )}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};

CustomDropdown.defaultProps = {
  options: [],
  currentOption: {},
  onChange: () => null,
  keyName: 'WalletNumber',
  setCurrentOption: () => {},
  placeholder: 'Select Wallet',
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  currentOption: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
  setCurrentOption: PropTypes.func,
  keyName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CustomDropdown;
