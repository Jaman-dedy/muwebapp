import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Input,
  TransitionablePortal,
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../SendMoney/modal.scss';
import PinCodeForm from 'components/common/PinCodeForm';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import formatNumber from 'utils/formatNumber';
import TransactionEntity from '../SendMoney/TransactionEntity';
import { divide } from 'lodash';

const ExchangeCurrencyModal = ({
  open,
  userData,
  setOpen,
  walletList,
  onOptionsChange,
  form,
  balanceOnWallet,
  setForm,
  currency,
  checkTransactionConfirmation,
  checking,
  confirmationError,
  confirmationData,
  moveFundsToToUWallet,
  loading,
  error,
  data,
  errors,
  setErrors,
  step,
  resetState,
  DefaultWallet,
}) => {
  useEffect(() => {
    if (data && data?.[0]) {
      setForm({});
      resetState();
      setErrors(null);
      setOpen(false);
    }
  }, [data]);

  const [shouldClear, setShouldClear] = useState(false);
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  useEffect(() => {
    if (error) {
      if (
        Array.isArray(error) &&
        error[0].UserLoginCorrect === 'FALSE'
      ) {
        setShouldClear(true);
      }
    }
  }, [error]);

  const defaultOption =
    walletList && walletList.find(item => item.Default === 'YES');
  const [currentOption, setCurrentOption] = useState(null);

  const [currentDestOption, setCurrentDestOption] = useState(null);
  useEffect(() => {
    if (defaultOption) {
      setCurrentOption(DefaultWallet ?? defaultOption);
    }
  }, [defaultOption, DefaultWallet]);

  return (
    <TransitionablePortal
      transition={{
        duration: 400,
        animation: 'fade',
      }}
      onClose={() => {
        setOpen(false);
        resetState();
      }}
      open={open}
    >
      <Modal size="small" open={open} onOpen={() => setOpen(!open)}>
        <Modal.Header className="modal-title">
          {global.translate('Currency Exchange or Cash pooling', 569)}
        </Modal.Header>
        {step === 1 && (
          <Modal.Content className="entities">
            <div className="entities">
              <TransactionEntity
                data={userData}
                id={1}
                name="sourceWallet"
                form={form}
                walletTitle={global.translate(
                  'Transfer from wallet',
                  271,
                )}
                walletList={walletList}
                currentOption={currentOption}
                setCurrentOption={setCurrentOption}
                onChange={onOptionsChange}
              />
              <h4 className="to">{global.translate('To', 115)}: </h4>

              <TransactionEntity
                data={userData}
                form={form}
                name="user2wallets"
                id={2}
                walletTitle={global.translate('Target wallet', 233)}
                walletList={walletList}
                currentOption={currentDestOption}
                setCurrentOption={setCurrentDestOption}
                onChange={onOptionsChange}
              />
            </div>

            <div className="remaining-money-shade">
              <h4 className="available">
                {global.translate(
                  'Available Balance in the Selected Wallet',
                  1223,
                )}
                <p className="available-value">
                  {formatNumber(balanceOnWallet, {
                    locales: preferred,
                    currency,
                  })}
                </p>
              </h4>
            </div>

            <div className="wrap-money-form">
              <div className="wrap-money-input">
                <div>{global.translate('Amount', 116)}</div>
                <div className="money-input">
                  <Input
                    type="number"
                    name="amount"
                    placeholder={global.translate('Amount', 116)}
                    onChange={onOptionsChange}
                    value={form.amount || null}
                  />
                  <span>{currency}</span>
                </div>
              </div>
            </div>
            <div className="loader-section">
              {errors && <Message message={errors} />}
              {confirmationError && confirmationError[0] && (
                <Message
                  message={
                    confirmationError &&
                    confirmationError[0].Description
                      ? global.translate(
                          confirmationError &&
                            confirmationError[0].Description,
                        )
                      : global.translate(confirmationError.error)
                  }
                />
              )}
              {confirmationError && !confirmationError[0] && (
                <Message
                  message={global.translate(confirmationError.error)}
                />
              )}
            </div>
          </Modal.Content>
        )}
        {step === 2 && confirmationData && confirmationData[0] && (
          <Modal.Content className="ss-content">
            <div className="ss-amount">
              <p>{global.translate('Amount', 116)}: </p> &nbsp;&nbsp;
              <p>
                <strong>{confirmationData[0].Amount}</strong>
              </p>
            </div>

            <div className="fees">
              <div className="fees-list">
                <p>{global.translate('Fees', 117)}</p>

                <div className="fees-item">
                  <p className="left">
                    {global.translate('Fees', 117)}:
                  </p>
                  <p className="right">{confirmationData[0].Fees}</p>
                </div>
                <div className="fees-item">
                  <p className="left">
                    {global.translate('External fees', 121)}:
                  </p>
                  <p className="right">
                    {confirmationData[0].ExternalFees}
                  </p>
                </div>
                <div className="fees-item">
                  <p className="left">
                    {global.translate('Exchange fees', 120)}:
                  </p>
                  <p className="right">
                    {' '}
                    {confirmationData[0].ExchangeFees}
                  </p>
                </div>
                <div className="fees-item">
                  <p className="left">
                    {global.translate('Taxes', 956)}:
                  </p>
                  <p className="right">{confirmationData[0].Taxes}</p>
                </div>
              </div>
            </div>
            <div className="exchange-rate">
              <p>
                {global.translate('Exchange Rate', 80)}=
                {confirmationData[0].ExchangeRate}
              </p>
            </div>
            <div className="amount-to-be-recieved-break-down">
              <div className="fees-item">
                <p className="left" style={{ marginTop: '13px' }}>
                  {global.translate('Total', 269)}:
                </p>
                <p className="right">
                  <strong
                    className="bolder"
                    style={{ fontSize: '20px', fontWeight: 500 }}
                  >
                    {confirmationData[0].TotalAmount}
                  </strong>
                </p>
              </div>
              <div className="fees-item">
                <p className="left" style={{ marginTop: '13px' }}>
                  {global.translate('Amount to be received', 397)}:
                </p>
                <p className="right">
                  {' '}
                  <strong
                    className="bolder"
                    style={{ fontSize: '20px', fontWeight: 500 }}
                  >
                    {confirmationData[0].AmountToBeSent}
                  </strong>
                </p>
              </div>
            </div>

            <div className="confirm-form">
              <Input
                name="reference"
                onChange={onOptionsChange}
                value={form.reference || ''}
                placeholder={global.translate(
                  'Enter reference here',
                  433,
                )}
              />
              <Input
                name="description"
                onChange={onOptionsChange}
                value={form.description || ''}
                placeholder={global.translate(
                  'Enter description here',
                  434,
                )}
              />
            </div>
            <div className="pin-number">
              <PinCodeForm
                label={global.translate(
                  'Confirm  your PIN number',
                  941,
                )}
                onChange={onOptionsChange}
                shouldClear={shouldClear}
                setShouldClear={setShouldClear}
              />
            </div>
            <div
              className="loader-section"
              style={{ alignSelf: 'center' }}
            >
              {errors && <Message message={errors} />}
              {error && error[0] && (
                <Message
                  message={
                    error && error[0].Description
                      ? global.translate(error[0].Description)
                      : global.translate(error.error, 162)
                  }
                />
              )}
              {error && !error[0] && (
                <Message
                  message={global.translate(error.error, 162)}
                />
              )}
            </div>
          </Modal.Content>
        )}
        <Modal.Actions>
          <>
            {step !== 1 && (
              <Button
                basic
                color="red"
                disabled={checking || loading}
                onClick={() => {
                  resetState();
                }}
              >
                {global.translate('Back', 2158)}
              </Button>
            )}

            {step !== 3 && (
              <Button
                basic
                color="red"
                disabled={checking || loading}
                onClick={() => {
                  setOpen(!open);
                  resetState();
                  setForm({});
                  setErrors(null);
                  setCurrentOption(defaultOption || null);
                  setCurrentDestOption(null);
                }}
              >
                {global.translate('Cancel', 86)}
              </Button>
            )}
            <Button
              positive
              disabled={checking || loading}
              loading={checking || loading}
              onClick={() => {
                if (step === 1) {
                  checkTransactionConfirmation();
                } else if (step === 2) {
                  moveFundsToToUWallet();
                }
              }}
            >
              {step !== 3
                ? global.translate('Exchange', 1997)
                : global.translate('Done', 55)}
            </Button>
          </>
        </Modal.Actions>
      </Modal>
    </TransitionablePortal>
  );
};

ExchangeCurrencyModal.propTypes = {
  open: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  balanceOnWallet: PropTypes.string,
  setForm: PropTypes.func,
  currency: PropTypes.string,
  checkTransactionConfirmation: PropTypes.func,
  checking: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any).isRequired,
  confirmationData: PropTypes.objectOf(PropTypes.any).isRequired,
  moveFundsToToUWallet: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  setErrors: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  resetState: PropTypes.func.isRequired,
};

ExchangeCurrencyModal.defaultProps = {
  moveFundsToToUWallet: () => {},
  loading: false,
  currency: null,
  checkTransactionConfirmation: () => {},
  checking: false,
  balanceOnWallet: 0,
  setForm: () => {},
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  open: false,
};
export default ExchangeCurrencyModal;
