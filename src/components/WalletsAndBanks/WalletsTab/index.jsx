/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Label, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Message from 'components/common/Message';
import formatNumber from 'utils/formatNumber';
import AddWalletModal from 'components/WalletsAndBanks/WalletsTab/AddWalletModal';
import getCreditCardOptions from 'redux/actions/credit-card/getOptions';
import CurrencyExchangeIcon from 'assets/images/CurrencyExchangeIcon.png';
import ConfirmModal from 'components/common/ConfirmModal';
import EllipseMenu from 'components/common/EllipseOptions';
import SetDefault from 'assets/images/setAsDefaultIcon.png';
import EyeIcon from 'assets/images/eyeOptIcon.png';
import CreditCardIcon from 'assets/images/creditCard.svg';
import TrashIcon from 'assets/images/trashOptIcon.png';
import EditIcon from 'assets/images/edit.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import EditWalletModal from './EditWalletModal';
import FailedModal from './FailedModal';
import WalletOptionsModal from './WalletOptionsModal';
import { setIsSendingMoney } from 'redux/actions/dashboard/dashboard';
import CurrencyExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';
import WalletTablePlaceholder from 'assets/images/placeholders/wallet-table-placeholder.svg';
import './style.scss';
const WalletComponents = ({ userWallets }) => {
  const {
    loading,
    data,
    setOpenAddWalletModal,
    openAddWalletModal,
    openOptionModal,
    openOptionModalFx,
    openEdtWalletModal,
    openEdtWalletModalFx,
    onChange,
    form,
    searchData,
    currencies,
    addWalletFX,
    editWalletFX,
    deleteWalletFX,
    clearForm,
    getMyWalletsFX,
    setFormObject,
    setAsDefaultFx,
    createWallet,
    editWallet,
    deleteWallet,
    getMyCurrencies,
    userCurrenciesLoading,
  } = userWallets;
  const [item, setItem] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const dispatch = useDispatch();

  const [isModalOpened, setModalOpen] = useState(false);

  const history = useHistory();
  const { language: { preferred } = {}, userData } = useSelector(
    ({ user }) => user,
  );

  const handleDismis = () => {
    clearForm();
  };

  const openOption = (wallet = item) => {
    clearForm();
    const obj = { ...wallet, Name: wallet.AccountName };
    setFormObject(obj);
  };

  const openEdit = (wallet = item) => {
    clearForm();
    const obj = { ...wallet, Name: wallet.AccountName };
    setFormObject(obj);
    openEdtWalletModalFx();
  };
  const hadleLoadCardOptions = wallet => {
    if (wallet.HasACreditCard === 'YES') {
      history.push({
        pathname: '/credit-card-details',
        state: {
          wallet,
        },
      });
    }
    if (Object.keys(wallet).length !== 0) {
      setSelectedWallet(wallet.AccountNumber);
      const data = { Wallet: wallet.AccountNumber };
      getCreditCardOptions(data, '/GetCreditCardOptions')(dispatch);
    }
  };

  const options = [
    {
      name: global.translate('Set as default', 93),
      image: SetDefault,

      onClick: () => {
        setAsDefaultFx();
      },
    },

    {
      name: global.translate('View transactions', 143),
      image: EyeIcon,
      onClick: () => {
        history.push({
          pathname: '/transactions',
          state: {
            wallet: item,
          },
        });
      },
    },
    {
      name: global.translate('Order an M-Card', 2171),
      image: CreditCardIcon,
      onClick: item => {
        history.push({
          pathname: '/add-card',
          state: {
            wallet: item,
          },
        });
      },
    },
    {
      name: global.translate('Delete Wallet', 557),
      image: TrashIcon,
      onClick: () => {
        setModalOpen(true);
      },
    },
    {
      name: global.translate('Rename wallet', 2172),
      image: EditIcon,
      onClick: () => {
        openEdit();
      },
    },
    {
      name: global.translate('Add money to your wallet', 173),
      image: AddMoneyIcon,
      onClick: () => {
        history.push({
          pathname: '/add-money',
          state: {
            wallet: item,
          },
        });
      },
    },
    {
      name: global.translate('Currency exchange', 87),
      image: CurrencyExchangeIcon,
      onClick: wallet => {
        setSelectedWallet(wallet);
        setSendMoneyOpen(!sendMoneyOpen);
        setIsSendingMoney(dispatch);
      },
    },
  ];

  const showingWallets = data ?? [];

  useEffect(() => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].Default === 'YES') {
        const temp = data[i];
        data.splice(i, 1);
        data.unshift(temp);
        break;
      }
    }
  }, [showingWallets]);

  return (
    <>
      <ConfirmModal
        close={() => setModalOpen(false)}
        isOpened={isModalOpened}
        onClickYes={deleteWalletFX}
        message={`${global.translate('Delete Wallet', 557)} : ${
          form?.AccountNumber
        } ${form?.AccountName ? `(${form?.AccountName})` : ''} ?`}
      />
      <div className="wallets">
        <div className="all-wallets">
          {loading && (
            <Image
              src={WalletTablePlaceholder}
              className="animate-placeholder fluid"
            />
          )}

          {createWallet?.error && Array.isArray(createWallet?.error)
            ? createWallet?.error.map(err => (
                <>
                  <Message
                    message={
                      err?.Description ||
                      global.translate('Something went wrong', 1933)
                    }
                    action={{
                      onClick: () => {
                        handleDismis();
                      },
                    }}
                  />
                </>
              ))
            : ''}
          {!loading && showingWallets && (
            <div className="wallets_table">
              <Table stackable>
                <Table.Body>
                  {showingWallets?.map(item => (
                    <Table.Row>
                      <Table.Cell className="walletdetails">
                        <div className="walletdetails-container">
                          <div className="wallet-flag">
                            <img src={item.Flag} alt="flag" />
                          </div>
                          <div className="wallet-item-balance">
                            <span className="wallet-item">
                              {item.AccountNumber}
                              {item.AccountName &&
                                `(${item.AccountName})`}
                            </span>

                            <br />
                            <span className="wallet__balance">
                              {formatNumber(item.Balance, {
                                locales: preferred,
                              })}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <div
                          className="default-wallet"
                          floated="right"
                        >
                          <div className="wallet-currency">
                            {item.Default === 'YES' && (
                              <>
                                <Label color="green">
                                  <Label.Detail>
                                    {global.translate('DEFAULT')}
                                  </Label.Detail>
                                </Label>
                              </>
                            )}
                            <span
                              style={{
                                fontSize: 15,
                                weight: 300,
                              }}
                            >
                              {item.CurrencyCode}
                            </span>
                          </div>

                          <span
                            className="right-span"
                            onMouseEnter={() => {
                              setItem(item);
                              openOption(item);
                            }}
                          >
                            <EllipseMenu
                              wallet={item}
                              options={options}
                              hadleLoadCardOptions={
                                hadleLoadCardOptions
                              }
                            />
                          </span>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
          <AddWalletModal
            open={openAddWalletModal}
            setOpenAddWalletModel={setOpenAddWalletModal}
            onChange={onChange}
            form={form}
            userData={userData}
            onSubmit={addWalletFX}
            searchData={searchData}
            currencies={currencies}
            addWallet={createWallet}
            getMyWalletsFX={getMyWalletsFX}
            clearForm={clearForm}
            getMyCurrencies={getMyCurrencies}
            userCurrenciesLoading={userCurrenciesLoading}
          />

          <CurrencyExchangeContainer
            setSendMoneyOpen={setSendMoneyOpen}
            sendMoneyOpen={sendMoneyOpen}
            selectedWallet={selectedWallet}
          />
          <WalletOptionsModal
            open={openOptionModal}
            item={item}
            setAsDefaultFx={setAsDefaultFx}
            deleteWalletFX={deleteWalletFX}
            setOpen={openOptionModalFx}
            setOpenAddWalletModal={setOpenAddWalletModal}
            openEdtWalletModalFx={openEdtWalletModalFx}
            deleteWallet={deleteWallet}
            form={form}
            clearForm={clearForm}
          />

          <EditWalletModal
            open={openEdtWalletModal}
            openEdtWalletModalFx={openEdtWalletModalFx}
            onChange={onChange}
            form={form}
            onSubmit={editWalletFX}
            searchData={searchData}
            currencies={currencies}
            addWallet={editWallet}
            getMyWalletsFX={getMyWalletsFX}
          />

          <FailedModal
            open={deleteWallet?.error}
            errors={deleteWallet?.error}
            clearForm={clearForm}
          />
        </div>
      </div>
    </>
  );
};

WalletComponents.propTypes = {
  userWallets: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default WalletComponents;
