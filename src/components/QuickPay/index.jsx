import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Icon,
  Card,
  Image,
  Grid,
  Label,
} from 'semantic-ui-react';
import QrReader from 'react-qr-reader';
import Cleave from 'cleave.js/react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import Message from 'components/common/Message';
import './quickpay.scss';
import QrCodeImg from 'assets/images/qrCode.svg';
import ReusableDrowdown from 'components/common/Dropdown/ReusableDropdown';
import formatNumber from 'utils/formatNumber';
import SendMoneyModal from './sendMoneyModal';

const QuickPay = ({
  onOptionChange,
  searchUser,
  locateUser,
  loading,
  form,
  handleError,
  handleScan,
  result,
  canScanQR,
  setCanScanQR,
  walletList,
  setSelectedWallet,
  selectWallet,
  checkTransactionConfirmation,
  errors,
  sendMoneyModal,
}) => {
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  const location = (
    <span>
      <Icon name="map pin" />
      {locateUser?.data?.[0]?.Country}
    </span>
  );

  const isDisabled = () => {
    if (!form.AccountNumber) {
      return true;
    }
    if (locateUser?.data && !form.Amount) {
      return true;
    }
    if (result) {
      return true;
    }
    return false;
  };

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Quick pay', 1975)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>

      <div className="quick-pay-container">
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <div className="search-wallet">
              <span>
                {global.translate(
                  "Provide your recipient's account number",
                )}
              </span>
              <br />
              <div>
                <Cleave
                  className="account-number-input"
                  placeholder="XXX-XX-USERNAME"
                  options={{
                    delimiter: '-',
                    blocks: [3, 2, 15],
                    uppercase: true,
                  }}
                  name="AccountNumber"
                  onChange={onOptionChange}
                />
              </div>

              <div className="user-card">
                {locateUser.data && !result && (
                  <Card
                    className="user-found-card"
                    image={locateUser.data[0].PictureURL}
                    header={locateUser.data[0].FirstName}
                    meta={locateUser.data[0].LastName}
                    description=""
                    extra={location}
                  />
                )}
              </div>

              {locateUser.data && !result && (
                <>
                  <span>Change my wallet</span>
                  <div className="change-wallet">
                    <ReusableDrowdown
                      options={walletList && walletList}
                      currentOption={selectWallet}
                      setCurrentOption={setSelectedWallet}
                      customstyle
                    />
                    <div>
                      <Label size="large">
                        {formatNumber(selectWallet?.Balance, {
                          locales: preferred,
                        })}
                      </Label>
                    </div>
                  </div>
                </>
              )}

              {locateUser.data && !result && (
                <div className="amount-box">
                  <div className="amount-div">
                    <Cleave
                      className="amount-input"
                      placeholder="Amount"
                      options={{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                      }}
                      value={form?.Amount}
                      name="Amount"
                      onChange={onOptionChange}
                    />
                  </div>
                  <div>
                    <Label size="large">
                      {selectWallet?.CurrencyCode}
                    </Label>
                  </div>
                </div>
              )}
              <div className="error-message">
                {errors && <Message message={errors} />}
              </div>

              <div className="quick-pay-button">
                <Button
                  onClick={() => {
                    searchUser();
                    if (form?.TargetCurrency && form?.Amount) {
                      checkTransactionConfirmation();
                    }
                  }}
                  color={
                    locateUser.data && !result ? 'green' : 'orange'
                  }
                  fluid
                  loading={!result && loading}
                  disabled={isDisabled()}
                >
                  {!locateUser.data && <Icon name="search" />}

                  {locateUser.data && !result
                    ? global.translate('Next')
                    : global.translate('Search')}
                </Button>
              </div>
            </div>
          </Grid.Column>

          <Grid.Column mobile={16} only="mobile">
            <div className="scan-QR">
              <span>Scan QR code and pay instantly</span>
              <br />
              <br />
              {!canScanQR && (
                <div className="QR-placeholder">
                  <Image src={QrCodeImg} />
                </div>
              )}
              {canScanQR && !result && (
                <div>
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                  />
                </div>
              )}
              <div className="user-card">
                {locateUser.data && result && (
                  <Card
                    className="user-found-card"
                    image={locateUser.data[0].PictureURL}
                    header={locateUser.data[0].FirstName}
                    meta={locateUser.data[0].LastName}
                    description=""
                    extra={location}
                  />
                )}
              </div>
              {locateUser.data && result && (
                <>
                  <span>Change my wallet</span>
                  <div className="change-wallet">
                    <ReusableDrowdown
                      options={walletList && walletList}
                      currentOption={selectWallet}
                      setCurrentOption={setSelectedWallet}
                      customstyle
                    />
                    <div>
                      <Label size="large">
                        {formatNumber(selectWallet?.Balance, {
                          locales: preferred,
                        })}
                      </Label>
                    </div>
                  </div>
                </>
              )}
              {locateUser.data && result && (
                <div className="amount-box">
                  <div className="amount-div">
                    <Cleave
                      className="amount-input"
                      placeholder="Amount"
                      options={{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                      }}
                      value={form?.Amount}
                      name="Amount"
                      onChange={onOptionChange}
                    />
                  </div>
                  <div>
                    <Label size="large">
                      {selectWallet?.CurrencyCode}
                    </Label>
                  </div>
                </div>
              )}
              <div className="quick-pay-button">
                {result && (
                  <div className="quick-pay-result">
                    {' '}
                    <strong>{result}</strong>{' '}
                  </div>
                )}

                <Button
                  onClick={() => {
                    setCanScanQR(true);
                    if (result) {
                      searchUser();
                    }
                    if (
                      form?.TargetCurrency &&
                      form?.Amount &&
                      result
                    ) {
                      checkTransactionConfirmation();
                    }
                  }}
                  loading={result && loading}
                  color={
                    locateUser.data && result ? 'green' : 'orange'
                  }
                  fluid
                >
                  {!result && <Icon name="qrcode" />}
                  {result && !locateUser.data && (
                    <Icon name="search" />
                  )}

                  {!result && global.translate('Scan code')}
                  {result &&
                    !locateUser.data &&
                    global.translate('Search')}
                  {result &&
                    locateUser.data &&
                    global.translate('Next')}
                </Button>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
      <SendMoneyModal sendMoneyModal={sendMoneyModal} />
    </DashboardLayout>
  );
};
QuickPay.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  handleError: PropTypes.func.isRequired,
  handleScan: PropTypes.func.isRequired,
  result: PropTypes.string.isRequired,
  canScanQR: PropTypes.bool.isRequired,
  setCanScanQR: PropTypes.func.isRequired,
  walletList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setSelectedWallet: PropTypes.func.isRequired,
  selectWallet: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionChange: PropTypes.func.isRequired,
  searchUser: PropTypes.func.isRequired,
  locateUser: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  checkTransactionConfirmation: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  sendMoneyModal: PropTypes.func.isRequired,
};

export default QuickPay;
