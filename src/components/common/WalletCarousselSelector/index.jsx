import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Loader } from 'semantic-ui-react';
import AddMoneyToWallet from 'assets/images/AddWalletIcon.svg';
import './WalletCarouselSelector.scss';
import formatNumber from 'utils/formatNumber';
import AddWalletModal from 'components/Wallets/AddWalletModal';

import getCurrenciesList from 'redux/actions/users/getCurrenciesList';
import getUserCurrencies from 'redux/actions/users/getUserCurrencies';
import clearWalletForm from 'redux/actions/users/clearWalletForm';
import addWallets from 'redux/actions/users/addWallet';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import endWalletAction from 'redux/actions/wallets/endWalletAction';

const WalletCarousel = ({
  myWallets,
  selectWallet,
  selectedWalletNumber,
  defaultSelectAll,
  walletTitle,
  addTitle,
  onAddClick,
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

  const [form, setForm] = useState({});
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
      selectWallet({
        AccountNumber: defaultSelectedWallet.AccountNumber,
        CurrencyCode: defaultSelectedWallet.CurrencyCode,
      });
    }
  }, [myWallets, selectedWalletNumber]);

  useEffect(() => {
    const selectedWallet = myWallets.walletList.find(
      ({ AccountNumber }) =>
        AccountNumber === createWallet?.NewWallet?.number,
    );

    if (selectedWallet) {
      setSelectedWallet(selectedWallet);
      selectWallet({
        AccountNumber: selectedWallet.AccountNumber,
        CurrencyCode: selectedWallet.CurrencyCode,
      });
    }
  }, [myWallets, createWallet]);

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

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const getMyCurrencies = () => {
    if (userData.data) {
      getUserCurrencies({
        CountryCode: userData.data.Country,
      })(dispatch);
    }
  };
  const clearForm = () => {
    setForm({ Name: '', Currency: '' });
    clearWalletForm()(dispatch);
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
  }, [myWallets]);

  return (
    <>
      <AddWalletModal
        open={openAddWalletModal}
        setOpenAddWalletModel={setOpenAddWalletModal}
        onChange={onChange}
        form={form}
        userData={userData}
        onSubmit={addWalletFX}
        currencies={currenciesList.data}
        addWallet={createWallet}
        getMyWalletsFX={getMyWalletsFX}
        clearForm={clearForm}
        myWallets={myWallets}
        getMyCurrencies={getMyCurrencies}
      />
      <div className="my-wallet">
        <h3>
          {!walletTitle
            ? global.translate('Select wallet')
            : walletTitle}
        </h3>
        <div className="wallet-list">
          <div className="wrap__slider" ref={myWalletsRef}>
            {myWallets.loading && !hasOpenedAddWalletModal ? (
              <Loader active inline="centered" />
            ) : (
              <>
                <Slider {...carouselConfig}>
                  {myWallets.loading && hasOpenedAddWalletModal && (
                    <div className="wallet-box">
                      <Loader
                        active
                        inline="centered"
                        style={{ marginTop: '25%' }}
                      />
                    </div>
                  )}

                  <div
                    className="add-wallet"
                    key={1}
                    role="button"
                    tabIndex={0}
                    onClick={
                      onAddClick ||
                      (() => {
                        setHasOpenedAddWalletModal(true);
                        setOpenAddWalletModal(true);
                      })
                    }
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
                            <Image src={Flag} />
                            <div className="account-number">
                              <div>{AccountNumber}</div>
                              <div>{AccountName}</div>
                            </div>
                            <span className="balance">
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
