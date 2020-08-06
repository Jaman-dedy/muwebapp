/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, Loader } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import AddMoneyToWallet from 'assets/images/AddWalletIcon.svg';
import './WalletCarouselSelector.scss';
import Slider from 'react-slick';
import formatNumber from 'utils/formatNumber';

const WalletCarousel = ({
  myWallets,
  selectWallet,
  selectedWalletNumber,
  defaultSelectAll,
  walletTitle,
  addTitle,
}) => {
  const myWalletsRef = useRef(null);
  const history = useHistory();
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
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

 
  const reorderList = data => {
    if (!Array.isArray(data) || data.length === 0) return data;
    data.sort((x, y) => {
      return x.Default === 'YES' ? -1 : y.Default === 'YES' ? 1 : 0;
    });
    return data;
  };
  const carouselConfig = {
    infinite: false,
    speed: 500,
    variableWidth: false,
    draggable: true,
    accessibility: true,
    dots: false,
    initialSlide: 0,
    centerPadding: '20px',
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };
  
  return (
    <div className="my-wallet">
      <h3>
        {!defaultSelectAll
          ? global.translate('Select wallet')
          : walletTitle}
      </h3>
      <div className="wallet-list">
        <div className="wrap__slider" ref={myWalletsRef}>
          {myWallets.loading ? (
            <Loader active inline="centered" />
          ) : (
            <>
              <Slider {...carouselConfig}>
                <div
                  className="add-wallet"
                  key={1}
                  role="button"
                  tabIndex={0}
                >
                  <div className="wallet-box">
                    <Image src={AddMoneyToWallet} />
                    <div className="account-number">
                      <div>
                        {addTitle ||
                          global.translate('Add wallets', 111)}
                      </div>
                    </div>
                  </div>
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
                      <div className="wallet-box">
                        <Image src={Flag} />
                        <div className="account-number">
                          <div>{AccountNumber}</div>
                          <div>{AccountName}</div>
                        </div>
                        <span className="balance">{formatNumber(Balance, {locales: preferred,})}</span>
                      </div>
                    </div>
                  ),
                )}
              </Slider>
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
