/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Label, Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import LoaderComponent from 'components/common/Loader';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import Message from 'components/common/Message';
import formatNumber from 'utils/formatNumber';
import DashboardLayout from 'components/common/DashboardLayout';
import DefaultWalletContainer from 'containers/Dashboard/defaultWallet';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import NetworthContainer from 'containers/Dashboard/networth';
import AddWalletModal from 'components/Wallets/AddWalletModal';
import getCreditCardOptions from 'redux/actions/credit-card/getOptions';
import CurrencyExchangeIcon from 'assets/images/CurrencyExchangeIcon.png';
import ConfirmModal from 'components/common/ConfirmModal';
import './Wallets.scss';
import EllipseMenu from 'components/common/EllipseOptions';

import SetDefault from 'assets/images/setAsDefaultIcon.png';
import EyeIcon from 'assets/images/eyeOptIcon.png';
import CreditCardIcon from 'assets/images/creditCard.svg';
import TrashIcon from 'assets/images/trashOptIcon.png';
import EditIcon from 'assets/images/edit.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import GoBack from 'components/common/GoBack';
import CreditCardContainer from 'containers/CreditCard';
import EditWalletModal from './EditWalletModal';
import FailedModal from './FailedModal';
import WalletOptionsModal from './WalletOptionsModal';
import { setIsSendingMoney } from 'redux/actions/dashboard/dashboard';
import CurrencyExchangeContainer from 'containers/MoneyTransfer/Exchange/Exchange';

const WalletComponents = ({
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
  error,
  currencies,
  addwalletFX,
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
}) => {
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const dispatch = useDispatch();

  const [isModalOpened, setModalOpen] = useState(false);
  const [
    addCreditCardModalOpen,
    setAddCreditCardModalOpen,
  ] = useState(false);
  const history = useHistory();
  const { language: { preferred } = {}, userData } = useSelector(
    ({ user }) => user,
  );

  const handleDismis = () => {
    clearForm();
  };

  const openAddModalFX = () => {
    setOpenAddWalletModal(true);
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
      name: global.translate('Add a credit card', 90),
      image: CreditCardIcon,
      onClick: item => {
        setAddCreditCardModalOpen(true);
        hadleLoadCardOptions(item);
        setStep(1);
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
      name: global.translate('Rename wallet'),
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
      onClick: () => {
        setSendMoneyOpen(!sendMoneyOpen);
        setIsSendingMoney(dispatch);
      },
    },
  ];

  const onClickHandler = () => history.goBack();
  const showingWallets = !!data.length && data;

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
    <DashboardLayout>
      <CurrencyExchangeContainer
        setSendMoneyOpen={setSendMoneyOpen}
        sendMoneyOpen={sendMoneyOpen}
      />
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Manage wallets', 142)}
          </h2>
          <div className="head-buttons">
            <button type="button" onClick={() => openAddModalFX()}>
              {global.translate('Add wallets', 111)}
            </button>
          </div>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="clear" />
      <div className="wrap__container">
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <div className="wallet__card">
              <DefaultWalletContainer />
            </div>
            <div className="wallet__card">
              <div className="wrap__graph">
                <h3 className="dash-title small-v-padding">
                  {global.translate('Transaction history')}
                </h3>
                <GraphDataContainer />
              </div>
            </div>
            <div className="wallet__card">
              <UserCurrenciesContainer />
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={11}>
            <ConfirmModal
              close={() => setModalOpen(false)}
              isOpened={isModalOpened}
              onClickYes={deleteWalletFX}
              message={`${global.translate('Delete', 415)} ${
                form.AccountNumber
              } ?`}
            />
            <div className="wallets">
              <div className="all-wallets">
                <h3>{global.translate('All wallets', 187)}</h3>

                {(loading || deleteWallet.loading) && (
                  <LoaderComponent
                    loaderContent={global.translate('Loading', 194)}
                  />
                )}

                {createWallet.error &&
                Array.isArray(createWallet.error)
                  ? createWallet.error.map(err => (
                      <>
                        <Message
                          message={
                            err.Description ||
                            global.translate(
                              'Something went wrong',
                              1933,
                            )
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
                {showingWallets && (
                  <div className="wallets_table">
                    <Table unstackable>
                      <Table.Body>
                        {showingWallets.map(item => (
                          <Table.Row>
                            <Table.Cell
                              className="walletdetails"
                              style={{ display: 'flex' }}
                            >
                              <div className="wallet-flag">
                                <img src={item.Flag} alt="flag" />
                              </div>
                              <div style={{ marginLeft: 25 }}>
                                <span
                                  style={{
                                    fontSize: 15,
                                    weight: 300,
                                  }}
                                >
                                  {' '}
                                  {item.AccountNumber}{' '}
                                  {item.AccountName &&
                                    `(${item.AccountName})`}
                                </span>

                                <br />
                                <span className="bold">
                                  {formatNumber(item.Balance, {
                                    locales: preferred,
                                  })}
                                </span>
                              </div>
                            </Table.Cell>
                            <Table.Cell textAlign="right">
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                }}
                                floated="right"
                              >
                                <div className="wallet-currency">
                                  {item.Default === 'YES' && (
                                    <>
                                      <Label color="green">
                                        <Label.Detail>
                                          {global.translate(
                                            'DEFAULT',
                                          )}
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
                                    {item.CurrencyCode}{' '}
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
                  onSubmit={addwalletFX}
                  searchData={searchData}
                  currencies={currencies}
                  addWallet={createWallet}
                  getMyWalletsFX={getMyWalletsFX}
                  clearForm={clearForm}
                  getMyCurrencies={getMyCurrencies}
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
                  open={deleteWallet.error}
                  errors={deleteWallet.error}
                  clearForm={clearForm}
                />
                <CreditCardContainer
                  setAddCreditCardModalOpen={
                    setAddCreditCardModalOpen
                  }
                  addCreditCardModalOpen={addCreditCardModalOpen}
                  selectedWallet={selectedWallet}
                  step={step}
                  setStep={setStep}
                />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </DashboardLayout>
  );
};

WalletComponents.propTypes = {
  createWallet: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.instanceOf(Object),
  loading: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpenAddWalletModal: PropTypes.func,
  openAddWalletModal: PropTypes.func,
  openOptionModal: PropTypes.func,
  openOptionModalFx: PropTypes.func,
  openEdtWalletModal: PropTypes.func,
  openEdtWalletModalFx: PropTypes.func,
  onChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  searchData: PropTypes.objectOf(PropTypes.any).isRequired,
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  addwalletFX: PropTypes.func,
  editWalletFX: PropTypes.func,
  deleteWalletFX: PropTypes.func,
  clearForm: PropTypes.func,
  getMyWalletsFX: PropTypes.func,
  setFormObject: PropTypes.func,
  setAsDefaultFx: PropTypes.func,
  editWallet: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteWallet: PropTypes.objectOf(PropTypes.any).isRequired,
  getMyCurrencies: PropTypes.func,
};

WalletComponents.defaultProps = {
  error: null,
  loading: false,
  addwalletFX: () => null,
  editWalletFX: () => null,
  deleteWalletFX: () => null,
  clearForm: () => null,
  getMyWalletsFX: () => null,
  setFormObject: () => null,
  setAsDefaultFx: () => null,
  setOpenAddWalletModal: () => null,
  openAddWalletModal: () => null,
  openOptionModal: () => null,
  openOptionModalFx: () => null,
  openEdtWalletModal: () => null,
  openEdtWalletModalFx: () => null,
  onChange: () => null,
  getMyCurrencies: () => null,
};

export default WalletComponents;
