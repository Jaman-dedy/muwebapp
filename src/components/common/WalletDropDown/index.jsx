import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import caretImg from 'assets/images/microloan/wallet-carret.svg';
import './style.scss';

const WalletDropDown = ({
  walletList,
  setCurrentOption,
  currentOption,
}) => {
  return (
    <Dropdown
      text={
        <div className="text-content">
          <div className="flag-img">
            <Image src={currentOption?.Flag} />
          </div>
          <div className="wallet-content">
            <div>
              <strong>
                {currentOption?.AccountName}
                {`(${currentOption?.AccountNumber})`}
              </strong>{' '}
            </div>
            {currentOption?.Balance}&nbsp;{' '}
            {currentOption?.CurrencyCode}
          </div>
          <Image src={caretImg} />
        </div>
      }
      className="select-pay-wallet"
    >
      <Dropdown.Menu>
        <Dropdown.Menu scrolling>
          {walletList?.length !== 0 &&
            walletList?.map(wallet => (
              <>
                {' '}
                <Dropdown.Item
                  onClick={() => {
                    setCurrentOption(wallet);
                  }}
                >
                  <div className="text-content">
                    <div className="flag-img">
                      <Image src={wallet?.Flag} />
                    </div>
                    <div className="wallet-content">
                      <div>
                        {wallet?.AccountName}
                        {`(${wallet?.AccountNumber})`}{' '}
                      </div>
                      {wallet?.Balance}&nbsp; {wallet?.CurrencyCode}
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
              </>
            ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};

WalletDropDown.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.any),
  setCurrentOption: PropTypes.func,
  currentOption: PropTypes.objectOf(PropTypes.any),
};

WalletDropDown.defaultProps = {
  walletList: [],
  setCurrentOption: () => {},
  currentOption: {},
};
export default WalletDropDown;
