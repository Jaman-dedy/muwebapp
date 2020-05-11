import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Table,
  Icon,
  Pagination,
  Label,
} from 'semantic-ui-react';
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
import WalletOptionsModal from './WalletOptionsModal';
import EditWalletModal from './EditWalletModal';

import FailedModal from './FailedModal';

import './Wallets.scss';

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
    openOptionModalFx();
  };

  const openEdit = wallet => {
    clearForm();
    const obj = { ...wallet, Name: wallet.AccountName };
    setFormObject(obj);
    openEdtWalletModalFx();
  };

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
        let temp = data[i];
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
                width={75}
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
                                <Icon
                                  name="checkmark"
                                  color="green"
                                />
                                {global.translate('DEFAULT')}
                              </>
                            )}
                            <span
                              style={{ fontSize: 15, weight: 300 }}
                            >
                              {item.CurrencyCode}{' '}
                            </span>

                            <span className="right-span">
                              <Icon
                                name="ellipsis vertical"
                                onClick={() => {
                                  setItem(item);
                                  openOption(item);
                                }}
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div />
              {data && data[0] && data.length > ITEMS_PER_PAGE && (
                <Pagination
                  style={{
                    marginBottom: '30px',
                  }}
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
  createWallet: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.instanceOf(Object),
};

WalletComponents.defaultProps = {
  error: null,
};

export default WalletComponents;
