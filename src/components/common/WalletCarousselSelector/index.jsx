/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Loader } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import rightIcon from 'assets/images/right-icon.png';
import leftIcon from 'assets/images/left-icon.png';
import AddBig from 'assets/images/addBig.png';
import './WalletCarousselSelector.scss';

const WalletCarousel = ({
  myWallets,
  selectWallet,
  selectedWalletNumber,
  enableAdd,
  defaultSelectAll,
  walletTitle,
  addTitle,
  onAddClick,
  showControls,
}) => {
  const myWalletsRef = useRef(null);
  const history = useHistory();

  const [selectedWallet, setSelectedWallet] = useState({
    AccountNumber: '',
    CurrencyCode: '',
    AccountName: '',
    Balance: '',
    Flag: '',
    Default: '',
  });

  useEffect(() => {
    let defaultSelectedWallet = myWallets.walletList.find(
      ({ Default }) => Default === 'YES',
    );

    if (selectedWalletNumber) {
      defaultSelectedWallet = myWallets.walletList.find(
        ({ AccountNumber }) => AccountNumber === selectedWalletNumber,
      );
    }

    if (defaultSelectedWallet) {
      setSelectedWallet(defaultSelectedWallet);
      selectWallet({
        AccountNumber: defaultSelectedWallet.AccountNumber,
        CurrencyCode: defaultSelectedWallet.CurrencyCode,
      });
    }
  }, [myWallets, selectedWalletNumber]);

  useEffect(() => {
    if (selectedWallet.AccountNumber) {
      const { AccountNumber, CurrencyCode } = selectedWallet;
      selectWallet({ AccountNumber, CurrencyCode });
    }
  }, [selectedWallet]);

  const onArrowRightClick = () => {
    myWalletsRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth',
    });
  };

  const onArrowLeftClick = () => {
    myWalletsRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth',
    });
  };

  const reorderList = data => {
    if (!Array.isArray(data) || data.length === 0) return data;
    data.sort((x, y) => {
      return x.Default === 'YES' ? -1 : y.Default === 'YES' ? 1 : 0;
    });
    return data;
  };

  return (
    <div className="my-wallet">
      <h3>
        {!defaultSelectAll
          ? global.translate('Select wallet')
          : walletTitle}
      </h3>
      <div className="wallet-list">
        {showControls && !myWallets.loading && (
          <Image
            className="icon left"
            src={leftIcon}
            role="button"
            onClick={() => onArrowLeftClick()}
          />
        )}

        {showControls && !myWallets.loading && (
          <Image
            className="icon right"
            src={rightIcon}
            role="button"
            onClick={() => onArrowRightClick()}
          />
        )}
        <div className="wrap__slider" ref={myWalletsRef}>
          {myWallets.loading ? (
            <Loader active inline="centered" />
          ) : (
            <>
              {enableAdd && (
                <div
                  className="wallet"
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => null}
                  onClick={() => {
                    if (onAddClick) {
                      onAddClick();
                    } else {
                      history.push('/wallets');
                    }
                  }}
                >
                  <Image src={AddBig} className="add-plus-image" />
                  <span>
                    {addTitle || global.translate('Add wallets', 111)}
                  </span>
                </div>
              )}
              {reorderList(myWallets.walletList).map(
                ({
                  AccountNumber,
                  CurrencyCode,
                  AccountName,
                  Balance,
                  Flag,
                  Default,
                }) => (
                  <div
                    className={`${
                      AccountNumber ===
                        selectedWallet.AccountNumber ||
                      defaultSelectAll
                        ? 'selected'
                        : ''
                    } ${defaultSelectAll ? 'wallet' : 'wallet'}`}
                    key={AccountNumber}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => null}
                    onClick={() =>
                      setSelectedWallet({
                        AccountNumber,
                        CurrencyCode,
                        AccountName,
                        Balance,
                        Flag,
                        Default,
                      })
                    }
                  >
                    <Image src={Flag} />
                    <div className="account-number">
                      <div>{AccountNumber}</div>
                      <div>{AccountName}</div>
                    </div>
                    <span className="balance">{Balance}</span>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

WalletCarousel.propTypes = {
  myWallets: PropTypes.instanceOf(Object).isRequired,
  selectWallet: PropTypes.func,
  selectedWalletNumber: PropTypes.string,
  enableAdd: PropTypes.bool,
  defaultSelectAll: PropTypes.bool,
  walletTitle: PropTypes.string,
  addTitle: PropTypes.string,
  onAddClick: PropTypes.func,
  showOptions: PropTypes.bool,
  showControls: PropTypes.bool,
};
WalletCarousel.defaultProps = {
  selectedWalletNumber: '',
  selectWallet: () => {},
  enableAdd: true,
  onAddClick: null,
  defaultSelectAll: false,
  walletTitle: null,
  addTitle: null,
  showOptions: true,
  showControls: true,
};

export default WalletCarousel;
