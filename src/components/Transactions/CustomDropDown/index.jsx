import React from 'react';
import { Dropdown, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AlltrnsIcon from 'assets/images/transactions/alltrns.svg';
import './style.scss';

const CustomDropDown = ({
  walletList,
  fetchAllTransaction,
  setCurrentOption,
  currentOption,
  setShouldUpdateTransaction,
}) => {
  return (
    <div>
      <Dropdown
        text={
          !Object.keys(currentOption).length
            ? global.translate('All transactions')
            : currentOption.AccountName
        }
        pointing
        className="custom-dropdown-box"
      >
        <Dropdown.Menu className="wallets-dropdown">
          <Dropdown.Item onClick={fetchAllTransaction}>
            <Image src={AlltrnsIcon} />
            {global.translate('All transactions')}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {!Object.keys(currentOption).length && (
              <Icon name="checkmark" color="green" />
            )}
          </Dropdown.Item>
          <Dropdown.Divider />
          {walletList?.length &&
            walletList.map(wallet => (
              <>
                <Dropdown.Item
                  onClick={() => {
                    setShouldUpdateTransaction(true);
                    setCurrentOption({
                      AccountNumber: wallet.AccountNumber,
                    });
                  }}
                >
                  <div className="display-a-wallet">
                    <div className="flag-box">
                      <Image src={wallet.Flag} />
                    </div>
                    <div className="wallet-initials">
                      <div>{wallet.AccountName}</div>
                      <span>{wallet.AccountNumber}</span>
                    </div>
                    {wallet.AccountNumber ===
                      currentOption.AccountNumber && (
                      <Icon name="checkmark" color="green" />
                    )}
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

CustomDropDown.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.any),
  fetchAllTransaction: PropTypes.func,
  setCurrentOption: PropTypes.func,
  currentOption: PropTypes.objectOf(PropTypes.any),
};
CustomDropDown.defaultProps = {
  walletList: [],
  fetchAllTransaction: () => {},
  setCurrentOption: () => {},
  currentOption: {},
};

export default CustomDropDown;
