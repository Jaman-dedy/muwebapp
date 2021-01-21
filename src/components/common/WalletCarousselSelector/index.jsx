/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Loader, Button } from 'semantic-ui-react';
import './WalletCarouselSelector.scss';
import formatNumber from 'utils/formatNumber';
import AddWalletModal from 'components/Wallets/AddWalletModal';

import getCurrenciesList from 'redux/actions/users/getCurrenciesList';
import getUserCurrencies from 'redux/actions/users/getUserCurrencies';
import clearWalletForm from 'redux/actions/users/clearWalletForm';
import addWallets from 'redux/actions/users/addWallet';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import endWalletAction from 'redux/actions/wallets/endWalletAction';
import plusWalletImg from 'assets/images/plus-wallet.svg';
import LoadWallets from './LoadWallets';

const WalletCarousel = ({
  myWallets,
  selectWallet,
  selectedWalletNumber,
  defaultSelectAll,
  walletTitle,
  onAddClick,
  preSelectedWallet,
}) => {
  const dispatch = useDispatch();
  const myWalletsRef = useRef(null);
  const location = useLocation();

  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  const { userData, currenciesList, createWallet } = useSelector(
    state => state.user,
  );

  const [selectedWallet, setSelectedWallet] = useState({
    AccountNumber: '',
    CurrencyCode: '',
    AccountName: '',
    Balance: '',
    Flag: '',
    Default: '',
  });

  const [openAddWalletModal, setOpenAddWalletModal] = useState(false);
  const [
    hasOpenedAddWalletModal,
    setHasOpenedAddWalletModal,
  ] = useState(false);

  useEffect(() => {
    if (!currenciesList.data) {
      getCurrenciesList()(dispatch);
    }
  }, []);

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
    }
  }, [myWallets, selectWallet, selectedWalletNumber]);

  useEffect(() => {
    const selectedWallet = myWallets.walletList.find(
      ({ AccountNumber }) =>
        AccountNumber === createWallet?.NewWallet?.number,
    );

    if (selectedWallet && !preSelectedWallet) {
      setSelectedWallet(selectedWallet);
      selectWallet({
        AccountNumber: selectedWallet.AccountNumber,
        CurrencyCode: selectedWallet.CurrencyCode,
      });
    }
  }, [myWallets, createWallet]);
  useEffect(() => {
    if (preSelectedWallet) {
      setSelectedWallet(preSelectedWallet);
      selectWallet({
        AccountNumber: preSelectedWallet.AccountNumber,
        CurrencyCode: preSelectedWallet.CurrencyCode,
      });
    }
  }, [preSelectedWallet]);

  useEffect(() => {
    if (selectedWallet.AccountNumber) {
      const { AccountNumber, CurrencyCode } = selectedWallet;
      selectWallet({ AccountNumber, CurrencyCode });
    }
  }, [selectedWallet]);

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
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const getMyCurrencies = () => {
    if (userData.data) {
      getUserCurrencies({
        CountryCode: userData.data.Country,
      })(dispatch);
    }
  };

  const addWalletFX = Wallets => {
    addWallets({ Wallets })(dispatch);
  };

  const getMyWalletsFX = () => {
    endWalletAction()(dispatch);
    getMyWalletsAction()(dispatch);
  };

  useEffect(() => {
    if (myWallets?.walletList?.length === 0) {
      getMyWalletsFX();
    }
  }, [myWallets?.walletList.length]);

  const reorderList = data => {
    if (!Array.isArray(data) || data.length === 0) return data;
    data.sort((x, y) => {
      return x.Default === 'YES' ? -1 : y.Default === 'YES' ? 1 : 0;
    });
    if (location.state?.wallet) {
      data.sort((x, y) => {
        return x.AccountNumber === selectedWalletNumber
          ? -1
          : y.AccountNumber === selectedWalletNumber
          ? 1
          : 0;
      });
    }
    if (createWallet?.NewWallet?.number) {
      data.sort((x, y) => {
        return x.AccountNumber === createWallet?.NewWallet?.number
          ? -1
          : y.AccountNumber === createWallet?.NewWallet?.number
          ? 1
          : 0;
      });
    }
    return data;
  };

  return (
    <>
      <AddWalletModal
        open={openAddWalletModal}
        setOpenAddWalletModel={setOpenAddWalletModal}
        userData={userData}
        onSubmit={addWalletFX}
        currencies={currenciesList.data}
        addWallet={createWallet}
        getMyWalletsFX={getMyWalletsFX}
        myWallets={myWallets}
        getMyCurrencies={getMyCurrencies}
      />
      <div className="my-wallet">
        <div className="upper-title-btn">
          {!myWallets.loading && (
            <h3>
              {!walletTitle
                ? !myWallets?.walletList?.length
                  ? global.translate(
                      'All wallets are associated with cards',
                    )
                  : global.translate('Select wallet')
                : walletTitle}
            </h3>
          )}
          {!myWallets.loading && (
            <Button
              className="add-wallet"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              onClick={
                onAddClick ||
                (() => {
                  setHasOpenedAddWalletModal(true);
                  setOpenAddWalletModal(true);
                })
              }
            >
              <Image
                src={plusWalletImg}
                style={{ marginRight: '7px', marginTop: '2px' }}
              />
              {global.translate('Add a wallet')}
            </Button>
          )}
        </div>

        {myWallets?.walletList?.length > 0 && (
          <div className="wallet-list">
            <div className="wrap__slider" ref={myWalletsRef}>
              {myWallets.loading && !hasOpenedAddWalletModal ? (
                <div>
                  <LoadWallets />
                </div>
              ) : (
                <>
                  <Slider {...carouselConfig}>
                    {myWallets.loading && hasOpenedAddWalletModal && (
                      <div className="wallet-box">
                        <Loader
                          active
                          inline="centered"
                          // style={{ marginTop: '25%' }}
                        />
                      </div>
                    )}

                    {reorderList(myWallets.walletList)
                      .filter(item => item.AccountNumber !== '')
                      .map(
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
                              defaultSelectAll ? 'wallet' : 'wallet'
                            }`}
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
                            <div
                              className={`wallet-box ${
                                AccountNumber ===
                                  selectedWallet.AccountNumber ||
                                defaultSelectAll
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              <div className="account-number">
                                <div
                                  style={{
                                    fontSize: '15px',
                                    fontWeight: '500',
                                  }}
                                >
                                  {AccountName}
                                </div>
                                <div style={{ fontSize: '13px' }}>
                                  {AccountNumber}
                                </div>
                              </div>
                              <span className="balance">
                                <Image src={Flag} />
                                {formatNumber(Balance, {
                                  locales: preferred,
                                })}
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                  </Slider>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
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
  preSelectedWallet: PropTypes.objectOf(PropTypes.any),
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
  preSelectedWallet: {},
};
export default WalletCarousel;
