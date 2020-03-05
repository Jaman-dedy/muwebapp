import React, { useEffect, useState } from 'react';

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
  setOpenAddWalletModel,
  onChange,
  openAddWalletModel,
  form,
  searchData,
  error = { error },
  currencies,
  addwalletFX,
  editWalletFX,
  deleteWalletFX,
  addWallet,
  clearForm,
  getMyWalletsAction,
}) => {
  const openAddModalFX = () => {
    setOpenAddWalletModel(true);
    clearForm();
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
    for (var i = 0; i < data.length; i++) {
      if (data[i].Default === 'YES') {
        var temp = data[i];
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
                            <Icon name="pencil alternate"></Icon>
                          </span>
                          <span className="right-span">
                            <Icon name="ellipsis vertical"></Icon>
                          </span>
                          {item.Default === 'YES' && (
                            <span className="check-sign">
                              <Icon name="check"></Icon>
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
            {error && data === null && (
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
              open={openAddWalletModel}
              setOpenAddWalletModel={setOpenAddWalletModel}
              onChange={onChange}
              form={form}
              onSubmit={addwalletFX}
              searchData={searchData}
              currencies={currencies}
              addWallet={addWallet}
              getMyWalletsAction={getMyWalletsAction}
            />

            {/* {resetPasswordQuestions.Questions.map((item, key) => (
                  <Form.Field key={item.Text}>
                    <span className="question white-space-nowrap text-darken-blue">
                      <div className="dot" />
                      {item.Text}
                    </span>
                    <Form.Input
                      type="text"
                      placeholder="Your answer"
                      value={resetPasswordData[`A${key + 1}`]}
                      name={`A${key + 1}`}
                      onChange={e => {
                        onInputChange(e);
                      }}
                    />
                  </Form.Field>
                ))} */}

            {loading && (
              <LoaderComponent loaderContent="Loading wallets" />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WalletComponents;
