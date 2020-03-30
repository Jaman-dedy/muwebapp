/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Loader } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import rightIcon from 'assets/images/right-icon.png';
import leftIcon from 'assets/images/left-icon.png';
import AddBig from 'assets/images/addBig.png';
import './WalletCarousselSelector.scss';

const MyWallets = ({
  myWallets,
  selectWallet,
  selectedWalletNumber,
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

  const reorderList = data => {
    if (!Array.isArray(data) || data.length === 0) return data;
    data.sort((x, y) => {
      return x.Default === 'YES' ? -1 : y.Default === 'YES' ? 1 : 0;
    });
    return data;
  };

  return (
    <div className="my-wallet">
      <span className="title">{global.translate('My wallets')}</span>
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
            <>
              <div
                className="wallet"
                role="button"
                tabIndex={0}
                onKeyDown={() => null}
                onClick={() => history.push('/wallets')}
              >
                <Image src={AddBig} className="add-plus-image" />
                <span>{global.translate('Add a new wallet')}</span>
              </div>
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
                    <Icon
                      className="ellipsis-vertical"
                      name="ellipsis vertical"
                    />
                    <Image src={Flag} />
                    <div className="account-number">
                      <span className="">{AccountNumber}</span>
                      <span>({AccountName})</span>
                    </div>
                    <span className="balance">{Balance}</span>
                  </div>
                ),
              )}
            </>
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
  selectedWalletNumber: PropTypes.string,
};
MyWallets.defaultProps = {
  selectedWalletNumber: '',
};

export default MyWallets;
