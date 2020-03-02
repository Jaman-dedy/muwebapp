import React from 'react';

import { Image, Table, Icon } from 'semantic-ui-react';
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
  setOpen,
  AddToMyWallets,
  onChange,
  open,
  form,
  searchData,
  error = { error },
}) => {
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

        <div className="dashboard-content-wrapper">
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
        <div className="heading-text">
          <Image
            src={backIcon}
            height={30}
            onClick={() => history.goBack()}
          />
        </div>

        <div className="main-container">
          <div className="all-wallets">
            <div className="all-wallets-top-wrapper">
              <p className="sub-title">All wallets</p>
              <Image
                height={90}
                className="addImage"
                src={AddBig}
                onClick={() => setOpen(true)}
              />
            </div>
            <div>
              <Table>
                <Table.Body>
                  {data.map((item, key) => (
                    <Table.Row>
                      <Table.Cell collapsing>
                        <Image
                          src={item.Flag}
                          className="wallet-flag"
                        />
                      </Table.Cell>
                      <Table.Cell collapsing>
                        {item.AccountNumber} <br />
                        <span>{item.Balance}</span>
                      </Table.Cell>

                      <Table.Cell textAlign="right">
                        <span>{item.CurrencyCode} </span>
                        <span>
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
            </div>

            {/*     <AddWalletModal
              open={open}
              setOpen={setOpen}
              onChange={onChange}
              form={form}
              onSubmit={AddToMyWallets}
              searchData={searchData}
            />
 */}

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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WalletComponents;
