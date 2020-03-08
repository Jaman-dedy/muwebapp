import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Table,
  Icon,
  Menu,
  Pagination,
} from 'semantic-ui-react';
import LoaderComponent from 'components/common/Loader';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import Message from 'components/common/Message';
import backIcon from 'assets/images/back.png';
import DashboardLayout from 'components/common/DashboardLayout';
import DefaultWalletContainer from 'containers/Dashboard/defaultWallet';
import GraphDataContainer from 'containers/Dashboard/cumulativeGraph';
import UserCurrenciesContainer from 'containers/Dashboard/userCurrencies';
import NetworthContainer from 'containers/Dashboard/networth';
import AddBig from 'assets/images/addBig.png';
import AddWalletModal from 'components/Wallets/AddWalletModal';
import WalletOptionsModal from './WalletOptionsModal';
import EditWalletModal from './EditWalletModal';
import ListItem from './ListItem';

import './Wallets.scss';
// import add wallet modal
// list component
// import dashboard components

const WalletComponents = ({
  userData,
  loading,
  myWallets,
  getMyWallets,
  data,
  history,
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
  addWallet,
  clearForm,
  getMyWalletsAction,
  setFormObject,
  setAsDefaultFx,
  createWallet,
}) => {
  console.log('createWallet', createWallet);
  const openAddModalFX = () => {
    setOpenAddWalletModal(true);
    clearForm();
  };

  const openOption = wallet => {
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

  //MOVE THE DEFAULT WALLET TO THE TOP

  // Get current Contacts
  const indexOfLastWallet = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstWallet = indexOfLastWallet - ITEMS_PER_PAGE;

  const showingWallets =
    data &&
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
            Hey{' '}
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , manage your wallets
          </span>
        </WelcomeBar>

        <div className="dashboard-content-wrapper wallet-dashboard">
          <div className="top-section">
            <div className="wallet">
              <DefaultWalletContainer />
            </div>
            <GraphDataContainer />
          </div>
          <div className="currencies-container">
            <UserCurrenciesContainer />
          </div>
          <div className="networth-container">
            <NetworthContainer />
          </div>
        </div>
      </div>

      <div className="wallets">
        <Image
          className="backButton"
          src={backIcon}
          height={30}
          onClick={() => history.goBack()}
        />
        <div className="main-container">
          <div className="all-wallets">
            <div className="all-wallets-top-wrapper">
              <p className="sub-title">All wallets</p>
              <Image
                height={90}
                className="addImage"
                src={AddBig}
                onClick={() => openAddModalFX()}
              />
            </div>

            <div>
              {loading && (
                <LoaderComponent loaderContent="Loading wallets" />
              )}

              {createWallet.error && Array.isArray(createWallet.error)
                ? createWallet.error.map(err => (
                    <>
                      <Message
                        message={
                          err.Description || 'Something went wrong'
                        }
                      />
                      {Array.isArray(err.Messages)
                        ? err.Messages.map(subErr => (
                            <Message
                              message={
                                subErr.Text || 'Something went wrong'
                              }
                            />
                          ))
                        : ''}
                    </>
                  ))
                : ''}
              {showingWallets && (
                <Table>
                  <Table.Body>
                    {showingWallets.map(item => (
                      <Table.Row>
                        <Table.Cell collapsing>
                          <Image
                            src={item.Flag}
                            className="wallet-flag"
                          />
                        </Table.Cell>
                        <Table.Cell collapsing>
                          {item.AccountNumber}{' '}
                          {item.AccountName &&
                            `(${item.AccountName})`}
                          <br />
                          <span>{item.Balance}</span>
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          <span>{item.CurrencyCode} </span>
                          <span className="edit-wallet">
                            <Icon
                              name="pencil alternate"
                              onClick={() => openEdit(item)}
                            />
                          </span>
                          <span className="right-span">
                            <Icon
                              name="ellipsis vertical"
                              onClick={() => openOption(item)}
                            />
                          </span>
                          {item.Default === 'YES' && (
                            <span className="check-sign">
                              <Icon name="check" />
                            </span>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
              <div
                style={{
                  display: 'flex',
                }}
              >
                {data && data[0] && data.length > ITEMS_PER_PAGE && (
                  <Pagination
                    style={{
                      marginBottom: '30px',
                      marginLeft: 'auto',
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
            </div>
            {error && (
              <Message
                message={
                  error.error ? error.error : 'Something went wrong'
                }
                action={{
                  onClick: () => {
                    getMyWallets();
                  },
                }}
              />
            )}

            <AddWalletModal
              open={openAddWalletModal}
              setOpenAddWalletModel={setOpenAddWalletModal}
              onChange={onChange}
              form={form}
              onSubmit={addwalletFX}
              searchData={searchData}
              currencies={currencies}
              addWallet={addWallet}
              getMyWalletsAction={getMyWalletsAction}
            />

            <WalletOptionsModal
              open={openOptionModal}
              setAsDefaultFx={setAsDefaultFx}
              deleteWalletFX={deleteWalletFX}
              setOpen={openOptionModalFx}
            />

            <EditWalletModal
              open={openEdtWalletModal}
              openEdtWalletModalFx={openEdtWalletModalFx}
              onChange={onChange}
              form={form}
              onSubmit={editWalletFX}
              searchData={searchData}
              currencies={currencies}
              addWallet={addWallet}
              getMyWalletsAction={getMyWalletsAction}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

WalletComponents.defaultProps = {
  error: {},
};

export default WalletComponents;
