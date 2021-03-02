import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';

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
        currentOption ? (
          <div className="text-content">
            <div className="flag-img">
              <Image src={currentOption?.Flag} />
            </div>

            <div className="wallet-content">
              <div>
                <strong>
                  {`${currentOption?.AccountName} (${currentOption?.AccountNumber})`}
                </strong>{' '}
              </div>
              {currentOption?.Balance}&nbsp;
              {currentOption?.CurrencyCode}
            </div>
            <Image src={caretImg} />
          </div>
        ) : (
          <span>{global.translate('Select a wallet')}</span>
        )
      }
      className="select-pay-wallet"
    >
      <Dropdown.Menu>
        <Dropdown.Menu scrolling>
          {walletList.length !== 0 &&
            walletList.map(wallet => (
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
                    <div>{`${wallet?.AccountName} (${wallet?.AccountNumber})`}</div>
                    {wallet?.Balance}&nbsp;{wallet?.CurrencyCode}
                  </div>
                </div>
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default WalletDropDown;
