import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Table,
  Icon,
  Pagination,
  Label,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import LoaderComponent from 'components/common/Loader';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import Message from 'components/common/Message';
import DashboardLayout from 'components/common/DashboardLayout';
import DefaultWalletContainer from 'containers/Dashboard/defaultWallet';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import NetworthContainer from 'containers/Dashboard/networth';
import AddBig from 'assets/images/addBig.png';
import AddWalletModal from 'components/Wallets/AddWalletModal';

import CurrencyExchangeIcon from 'assets/images/CurrencyExchangeIcon.png';

import ConfirmModal from 'components/common/ConfirmModal';
import './Wallets.scss';
import EllipseMenu from 'components/common/EllipseOptions';

import SetDefault from 'assets/images/setAsDefaultIcon.png';
import EyeIcon from 'assets/images/eyeOptIcon.png';
import VisaIcon from 'assets/images/visaOptIcon.png';
import TrashIcon from 'assets/images/trashOptIcon.png';
import AddWalletIcon from 'assets/images/AddWalletIcon.png';
import EditIcon from 'assets/images/edit.png';
import AddMoneyIcon from 'assets/images/add_money_dash.png';
import EditWalletModal from './EditWalletModal';
import FailedModal from './FailedModal';
import WalletOptionsModal from './WalletOptionsModal';
import useWindowSize from 'utils/useWindowSize';

const WalletComponents = ({
  userData,
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
  const [item, setItem] = useState({});

  const { width } = useWindowSize();

  const [isModalOpened, setModalOpen] = useState(false);
  const history = useHistory();

  const handleDismis = () => {
    clearForm();
  };

  const openAddModalFX = () => {
    setOpenAddWalletModal(true);
    clearForm();
  };

  const openOption = wallet => {
    clearForm();
    const obj = { ...wallet, Name: wallet.AccountName };
    setFormObject(obj);
    // openOptionModalFx();
  };

  const openEdit = wallet => {
    clearForm();
    const obj = { ...wallet, Name: wallet.AccountName };
    setFormObject(obj);
    openEdtWalletModalFx();
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
      name: global.translate('Add a visa card', 90),
      image: VisaIcon,
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
      name: global.translate('Delete Wallet', 557),
      image: TrashIcon,
      onClick: () => {
        setModalOpen(true);
      },
    },
    {
      name: global.translate('Add wallets', 111),
      image: AddWalletIcon,
      onClick: () => {
        setOpenAddWalletModal();
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
        });
      },
    },
    {
      name: global.translate('Currency exchange', 87),
      image: CurrencyExchangeIcon,
      onClick: () => {
        history.push({
          pathname: '/services',
        });
      },
    },
  ];

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    data && data[0] && data.length / ITEMS_PER_PAGE,
  );
  const indexOfLastWallet = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstWallet = indexOfLastWallet - ITEMS_PER_PAGE;

  const showingWallets =
    Array.isArray(data) &&
    data[0] &&
    data
      .sort((a, b) => a.AccountNumber.localeCompare(b.AccountNumber))
      .slice(indexOfFirstWallet, indexOfLastWallet);
  const onpageChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
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
      <div className="dashboard">
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            {global.translate('Manage wallets', 142)}
          </span>
        </WelcomeBar>
        <ConfirmModal
          close={() => setModalOpen(false)}
          isOpened={isModalOpened}
          onClickYes={deleteWalletFX}
          message={`${global.translate('Delete', 415)} ${
            form.AccountNumber
          } ?`}
        />
        <div className="dashboard-content-wrapper wallet-dashboard">
          <div className="top-section">
            <div className="wallet">
              <DefaultWalletContainer />
            </div>

            <div className="dash_graph1">
              <GraphDataContainer />
            </div>
          </div>
          <div className="currencies-container">
            <UserCurrenciesContainer />
          </div>
          <div className="networth-container">
            <NetworthContainer scope="WALLET" />
          </div>
          <div className="networth-container">
            <NetworthContainer scope="TOTAL" />
          </div>
        </div>
      </div>

      <div className="wallets">
        <div className="main-container">
          <div className="all-wallets">
            <div className="all-wallets-top-wrapper">
              <p className="sub-title">
                {global.translate('All wallets', 187)}
              </p>
              <Image
                className="addImage"
                width={width < 700 ? 60 : 75}
                height={width < 700 ? 60 : 75}
                src={AddBig}
                onClick={() => openAddModalFX()}
              />
            </div>

            {(loading || deleteWallet.loading) && (
              <LoaderComponent
                loaderContent={global.translate('Loading', 194)}
              />
            )}

            {!loading && error && (
              <Message
                message={
                  error.error ? error.error : 'Something went wrong'
                }
                action={{
                  onClick: () => {
                    getMyWalletsFX();
                    handleDismis();
                  },
                }}
              />
            )}

            {createWallet.error && Array.isArray(createWallet.error)
              ? createWallet.error.map(err => (
                  <>
                    <Message
                      message={
                        err.Description || 'Something went wrong'
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
                          <Image
                            src={item.Flag}
                            className="wallet-flag"
                          />
                          <div style={{ marginLeft: 25 }}>
                            <span
                              style={{ fontSize: 15, weight: 300 }}
                            >
                              {' '}
                              {item.AccountNumber}{' '}
                              {item.AccountName &&
                                `(${item.AccountName})`}
                            </span>

                            <br />
                            <span className="bold">
                              {item.Balance}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'baseline',
                            }}
                            floated="right"
                          >
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
                              style={{ fontSize: 15, weight: 300 }}
                            >
                              {item.CurrencyCode}{' '}
                            </span>

                            <span
                              className="right-span"
                              onMouseEnter={() => {
                                setItem(item);
                                openOption(item);
                              }}
                            >
                              <EllipseMenu options={options} />
                            </span>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div />
              {data && data[0] && data.length > ITEMS_PER_PAGE && (
                <Pagination
                  style={
                    width < 700
                      ? { fontSize: '0.8rem', marginBottom: '30px' }
                      : {
                          marginBottom: '30px',
                        }
                  }
                  boundaryRange={0}
                  ellipsisItem
                  onPageChange={onpageChange}
                  siblingRange={1}
                  activePage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </div>

            <AddWalletModal
              open={openAddWalletModal}
              setOpenAddWalletModel={setOpenAddWalletModal}
              onChange={onChange}
              form={form}
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

WalletComponents.propTypes = {
  createWallet: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.instanceOf(Object),
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
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
