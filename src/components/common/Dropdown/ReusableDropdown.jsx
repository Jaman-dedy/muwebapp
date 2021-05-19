/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Image, Dropdown, Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './Dropdown.scss';
import Wrapper from 'hoc/Wrapper';

const ReusableDrowdown = ({
  options,
  currentOption,
  onChange,
  search,
  setCurrentOption,
  disabled,
  placeholder,
  customstyle,
  customStyleSelector,
  value,
}) => {
  let name;

  const newOptions =
    options &&
    options?.map(option => {
      // select country
      if (option.Flag && option.CountryName && option.Currency) {
        name = 'CountryCode';
        return {
          Img: option.Flag,
          Title: option.CountryName,
          Currency: option.Currency,
          CountryCode: option.CountryCode,
          PhoneAreaCode: option.PhoneAreaCode,
        };
      }
      // select phone provider
      if (
        option.OperatorName &&
        option.Logo &&
        option.OperatorID &&
        option.Category
      ) {
        name = 'OperatorName';
        return {
          Title: option.OperatorName,
          Img: option.Logo,
          OperatorID: option.OperatorID,
          Category: option.Category,
        };
      }
      // select phoneNumber
      if (
        option.PhonePrefix &&
        option.PhoneFlag &&
        option.PhoneNumber
      ) {
        name = 'OperatorName';
        return {
          Title: `+${option.PhonePrefix} ${option.PhoneNumber}`,
          Img: option.PhoneFlag,
        };
      }
      // select wallet
      if (
        option.AccountNumber &&
        option.AccountName &&
        option.CurrencyCode &&
        option.WalletQRCode
      ) {
        return {
          Title: `${option.AccountNumber} (${option.AccountName})`,
          Img: option.Flag,
          CurrencyCode: option.CurrencyCode,
          AccountNumber: option.AccountNumber,
          WalletQRCode: option.WalletQRCode,
          Balance: option.Balance,
        };
      }
      if (option.Img && option.Title) {
        return option;
      }

      // select bank account

      if (option.BankCode && option.BankLogo) {
        return {
          Title: option.AccountNumber ?? option.BankName,
          Img: option.BankLogo,
          CurrencyCode: option.Currency,
          OperatorName: option.BankName,
        };
      }

      // select bank name

      if (
        option.BankCode &&
        option.Logo &&
        option.BankName &&
        !option.AccountNumber
      ) {
        return {
          Title: option.BankName,
          Img: option.Logo,
          ...option,
        };
      }
    });
  let newCurrentOption;
  if (currentOption && currentOption.OperatorID) {
    newCurrentOption = {
      Title: currentOption.OperatorName || currentOption.Title,
      Img: currentOption.Logo || currentOption.Img,
      OperatorID: currentOption.OperatorID,
      Category: currentOption.Category,
    };
  } else if (currentOption && currentOption.CountryName) {
    newCurrentOption = {
      Title: currentOption.CountryName,
      Img: currentOption.Flag,
      Currency: currentOption.Currency,
      CountryCode: currentOption.CountryCode,
      PhoneAreaCode: currentOption.PhoneAreaCode,
    };
  } else if (
    currentOption?.AccountName &&
    currentOption?.Default &&
    currentOption?.AccountNumber &&
    currentOption?.WalletQRCode
  ) {
    newCurrentOption = {
      Title: currentOption.AccountNumber,
      Img: currentOption.Flag,
      CurrencyCode: currentOption.CurrencyCode,
    };
  } else {
    newCurrentOption = currentOption;
  }

  const wrapperId = `input-${Math.ceil(Math.random() * 10000)}`;
  const [filteredOptions, setFilteredOptions] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (newOptions) {
      setFilteredOptions(newOptions);
    }
  }, [options]);
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
        placeholder="Select"
        id={wrapperId}
        disabled={disabled}
        style={{ maxWidth: customStyleSelector ? '100%' : 'auto' }}
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
              {!newCurrentOption ? (
                <span>{placeholder}</span>
              ) : (
                <Wrapper>
                  <Image
                    src={newCurrentOption && newCurrentOption.Img}
                    className="inline"
                  />
                  <div>
                    <div>
                      {newCurrentOption && newCurrentOption.Title}
                    </div>
                  </div>
                </Wrapper>
              )}
            </div>
            {!disabled && (
              <Icon name="caret down" className="inline" />
            )}
          </span>
        }
        icon={null}
      >
        <Dropdown.Menu
          style={{
            width: customstyle ? '100%' : 'auto',
            maxWidth: customstyle ? '100%' : 'auto',
          }}
        >
          {search && (
            <Input
              tabIndex={0}
              icon="search"
              autoFocus
              iconPosition="left"
              onChange={({ target: { value } }) => {
                setFilteredOptions(
                  newOptions?.filter(option =>
                    option?.Title.toLowerCase().includes(
                      value.toLowerCase(),
                    ),
                  ),
                );
              }}
            />
          )}
          <Dropdown.Menu scrolling search={search}>
            {filteredOptions?.map(option => (
              <Dropdown.Item
                key={option?.Title}
                onClick={() => {
                  setOpen(false);
                  onChange({
                    target: {
                      name,
                      value: option?.BankCode ?? option?.Title,
                    },
                  });
                  setCurrentOption({
                    ...option,
                  });
                }}
              >
                <span className="dropdown-trigger">
                  <div className="dropdown-wallet">
                    <Image src={option?.Img} className="inline" />
                    <div>
                      <div>{option?.Title}</div>
                    </div>
                  </div>
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

ReusableDrowdown.defaultProps = {
  options: [{}],
  currentOption: undefined,
  onChange: () => null,
  search: false,
  setCurrentOption: () => {},
  disabled: false,
  placeholder: '',
  customstyle: false,
  customStyleSelector: false,
};

ReusableDrowdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  currentOption: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
  search: PropTypes.bool,
  setCurrentOption: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  customstyle: PropTypes.bool,
  customStyleSelector: PropTypes.bool,
};

export default ReusableDrowdown;
