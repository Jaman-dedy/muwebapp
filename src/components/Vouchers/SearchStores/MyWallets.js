/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Loader } from 'semantic-ui-react';

import rightIcon from 'assets/images/right-icon.png';
import leftIcon from 'assets/images/left-icon.png';

const MyWallets = ({ myWallets, selectWallet }) => {
  const myWalletsRef = useRef(null);

  const [selectedWallet, setSelectedWallet] = useState({
    AccountNumber: '',
    CurrencyCode: '',
    AccountName: '',
    Balance: '',
    Flag: '',
    Default: '',
  });

  useEffect(() => {
    const defaultWallet = myWallets.walletList.find(
      ({ Default }) => Default === 'YES',
    );
    if (defaultWallet) {
      setSelectedWallet(defaultWallet);
      selectWallet({
        AccountNumber: defaultWallet.AccountNumber,
        CurrencyCode: defaultWallet.CurrencyCode,
      });
    }
  }, [myWallets]);

  useEffect(() => {
    if (selectedWallet) {
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

  return (
    <div className="my-wallet">
      <span className="title">
        {global.translate('My wallets', 68)}
      </span>
      <div className="wallet-list">
        <Image
          className="icon left"
          src={leftIcon}
          role="button"
          onClick={() => onArrowLeftClick()}
        />
        <div className="wallet-list-container" ref={myWalletsRef}>
          {myWallets.loading ? (
            <Loader active inline="centered" />
          ) : (
            myWallets.walletList.map(
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
                    AccountNumber === selectedWallet.AccountNumber
                      ? 'selected'
                      : ''
                  } wallet`}
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
                  <Icon className="plus-square" name="plus square" />
                  <Image src={Flag} />
                  <div className="account-number">
                    <span className="">{AccountNumber}</span>
                    <span>({AccountName})</span>
                  </div>
                  <span className="balance">{Balance}</span>
                </div>
              ),
            )
          )}
        </div>
        <Image
          className="icon right"
          src={rightIcon}
          role="button"
          onClick={() => onArrowRightClick()}
        />
      </div>
    </div>
  );
};

MyWallets.propTypes = {
  myWallets: PropTypes.instanceOf(Object).isRequired,
  selectWallet: PropTypes.func.isRequired,
};

export default MyWallets;
