/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Button,
  Icon,
  Input,
  TransitionablePortal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { clearConfirmation } from 'redux/actions/moneyTransfer/confirmTransaction';
import PinCodeForm from 'components/common/PinCodeForm';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import TransactionEntity from 'components/MoneyTransfer/SendMoney/TransactionEntity';
import Wrapper from 'hoc/Wrapper';
import formatNumber from 'utils/formatNumber';
import NestedModal from './virtualCardDetails/confirmRedeeModal';

const AddMoneyModal = ({
  setOpen,
  walletList,
  destinationContact,
  errors,
  onOptionsChange,
  form,
  balanceOnWallet,
  setForm,
  checkTransactionConfirmation,
  checking,
  confirmationError,
  confirmationData,
  loading,
  error,
  isSendingCash,
  data,
  setErrors,
  step,
  setStep,
  addMoneyOpen,
  setAddMoneyOpen,
  userData,
  selectedWallet,
  setSelectedWallet,
  onAddMoneyToVirtualCard,
  isViewingDetail,
  onRedeeMoney,
  isRedeeming,
  setIsRedeeming,
  loadRedeeMoney,
  openConfirmModal,
  setOpenConfirmModal,
  virtualCard,
  shouldClear,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data[0] && isViewingDetail) {
      setStep(step + 1);
    }
  }, [data]);
  const currency =
    selectedWallet?.CurrencyCode || selectedWallet?.Currency;
  useEffect(() => {
    if (isViewingDetail) {
      return () => {
        setStep(1);
      };
    }
  }, []);
  const defaultOption =
    walletList && walletList.find(item => item.Default === 'YES');
  const [setCurrentOpt] = useState({});
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  useEffect(() => {
    if (defaultOption) {
      setCurrentOpt(defaultOption);
    }
  }, [defaultOption]);
  useEffect(() => {
    if (step === 3 && isViewingDetail) {
      setStep(1);
      setOpen(false);
      setErrors(null);
    }
  }, [step]);

  return (
    <Wrapper>
      {' '}
      <TransitionablePortal
        transition={{
          duration: 400,
          animation: 'fade',
        }}
        onClose={() => setOpen(false)}
        open={addMoneyOpen}
      >
        <Modal
          size="small"
          open={addMoneyOpen}
          closeOnDocumentClick={false}
          closeOnDimmerClick={false}
          onOpen={() => {
            setOpen(false);
          }}
        >
          <Modal.Header centered className="modal-title">
            {isRedeeming
              ? global.translate(
                  `Redeem money from my virtual card`,
                  2043,
                )
              : global.translate(
                  `Add money to my virtual card`,
                  2044,
                )}
          </Modal.Header>
          {step === 1 && (
            <Modal.Content className="entities">
              <div className="entities">
                <TransactionEntity
                  customStyle
                  data={userData}
                  id={1}
                  currentOption={selectedWallet}
                  setCurrentOption={setSelectedWallet}
                  isSendingCash={isSendingCash}
                  name="sourceWallet"
                  form={form}
                  walletList={userData?.Wallets}
                  onChange={onOptionsChange}
                  destinationContact={destinationContact}
                  isRedeeming={isRedeeming}
                />{' '}
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
              {isRedeeming ? (
                ''
              ) : (
                <div className="money-section">
                  <div className="amount">
                    <span>{global.translate('Amount', 116)}</span>
                  </div>
                  <div className="amount-value">
                    <div className="form-information">
                      <Input
                        type="number"
                        name="amount"
                        placeholder={global.translate('Amount', 116)}
                        onChange={onOptionsChange}
                        value={form?.amount || null}
                      />
                      <strong>{currency}</strong>
                    </div>
                  </div>

                  <div className="plus-minus-icons">
                    <div
                      role="button"
                      tabIndex="0"
                      onKeyPress={() => {}}
                      className="icon"
                      onClick={() => {
                        setForm({
                          ...form,
                          amount: parseInt(form.amount, 10) - 1,
                        });
                      }}
                    >
                      <Icon name="minus" className="inner-icon" />
                    </div>
                    <div
                      className="icon"
                      role="button"
                      tabIndex="0"
                      onClick={() => {
                        setForm({
                          ...form,
                          amount: parseInt(form.amount, 10) + 1,
                        });
                      }}
                      onKeyPress={() => {}}
                    >
                      <Icon name="add" className="inner-icon" />
                    </div>
                  </div>
                </div>
              )}
              {isRedeeming ? (
                ''
              ) : (
                <div className="load-stuff">
                  {errors && <Message message={errors} />}
                  {confirmationError && confirmationError[0] && (
                    <Message
                      message={
                        confirmationError[0].Description
                          ? global.translate(
                              confirmationError[0].Description,
                            )
                          : global.translate(confirmationError.error)
                      }
                    />
                  )}
                  {confirmationError && !confirmationError[0] && (
                    <Message
                      message={global.translate(
                        confirmationError.error,
                      )}
                    />
                  )}
                  {checking && (
                    <LoaderComponent
                      loaderContent={global.translate(
                        'Working…',
                        412,
                      )}
                    />
                  )}
                </div>
              )}
            </Modal.Content>
          )}
          {step === 2 && (
            <Modal.Content className="ss-content">
              {confirmationData && confirmationData[0] && (
                <>
                  <div className="ss-amount">
                    <p>{global.translate('Amount', 116)}: </p>{' '}
                    &nbsp;&nbsp;
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
                        <p className="right">
                          {confirmationData[0].Fees}
                        </p>
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
                        <p className="right">
                          {confirmationData[0].Taxes}
                        </p>
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
                      <p
                        className="left"
                        style={{ marginTop: '13px' }}
                      >
                        {global.translate('Total', 269)}:
                      </p>
                      <p className="right">
                        <strong
                          className="bolder"
                          style={{
                            fontSize: '20px',
                            fontWeight: 500,
                          }}
                        >
                          {confirmationData[0].TotalAmount}
                        </strong>
                      </p>
                    </div>
                    <div className="fees-item">
                      <p
                        className="left"
                        style={{ marginTop: '13px' }}
                      >
                        {global.translate(
                          'Amount to be received',
                          397,
                        )}
                        :
                      </p>
                      <p className="right">
                        {' '}
                        <strong
                          className="bolder"
                          style={{
                            fontSize: '20px',
                            fontWeight: 500,
                          }}
                        >
                          {confirmationData[0].AmountToBeSent}
                        </strong>
                      </p>
                    </div>
                  </div>
                </>
              )}
              <>
                <div className="pin-number">
                  <PinCodeForm
                    shouldClear={shouldClear}
                    label={global.translate(
                      'Confirm  your PIN number',
                      941,
                    )}
                    onChange={onOptionsChange}
                    name="pin"
                  />
                </div>
                <div
                  className="load-stuff"
                  style={{ alignSelf: 'center' }}
                >
                  {' '}
                  {errors && shouldClear && (
                    <Message message={errors} />
                  )}
                  <>
                    {' '}
                    {error && shouldClear && (
                      <Message message={global.translate(error)} />
                    )}
                    {error && !error[0] && (
                      <Message
                        message={global.translate(error.error)}
                      />
                    )}
                  </>
                </div>
              </>
            </Modal.Content>
          )}
          <Modal.Actions>
            <>
              {step !== 1 && step !== 3 && (
                <Button
                  disabled={checking || loading}
                  basic
                  color="red"
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  {global.translate('Back', 174)}
                </Button>
              )}
              {step !== 3 && (
                <Button
                  disabled={loading}
                  basic
                  color="red"
                  onClick={() => {
                    setAddMoneyOpen(!addMoneyOpen);
                    setIsRedeeming(false);
                    setStep(1);
                    setIsRedeeming(false);
                    setForm({
                      ...form,
                      amount: '',
                    });
                    setErrors(null);
                    clearConfirmation()(dispatch);
                  }}
                >
                  {global.translate('Cancel', 86)}
                </Button>
              )}

              {isRedeeming ? (
                <Button
                  positive
                  onClick={() => {
                    setOpenConfirmModal(true);
                    setAddMoneyOpen(false);
                  }}
                >
                  {' '}
                  Redeem Money{' '}
                </Button>
              ) : (
                <Button
                  positive
                  loading={loading}
                  disabled={checking || loading}
                  onClick={() => {
                    if (step === 1) {
                      checkTransactionConfirmation();
                    } else if (step === 2) {
                      onAddMoneyToVirtualCard();
                    }
                  }}
                >
                  {global.translate('Add money', 89)}
                </Button>
              )}
            </>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>
      <NestedModal
        setAddMoneyOpen={setAddMoneyOpen}
        setIsRedeeming={setIsRedeeming}
        onRedeeMoney={onRedeeMoney}
        isRedeeming={isRedeeming}
        onOptionsChange={onOptionsChange}
        addMoneyOpen={addMoneyOpen}
        setOpenConfirmModal={setOpenConfirmModal}
        openConfirmModal={openConfirmModal}
        loadRedeeMoney={loadRedeeMoney}
        errors={errors}
        error={error}
        virtualCard={virtualCard}
      />
    </Wrapper>
  );
};

AddMoneyModal.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func,
  walletList: PropTypes.arrayOf(PropTypes.any),
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  balanceOnWallet: PropTypes.string,
  setForm: PropTypes.func,
  currency: PropTypes.string,
  checkTransactionConfirmation: PropTypes.func,
  checking: PropTypes.bool,
  confirmationError: PropTypes.objectOf(PropTypes.any).isRequired,
  confirmationData: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  setErrors: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  errors: PropTypes.string,
  isSendingCash: PropTypes.bool,
  addMoneyOpen: PropTypes.bool,
  setAddMoneyOpen: PropTypes.func,
  selectedWallet: PropTypes.objectOf(PropTypes.any),
  setSelectedWallet: PropTypes.func,
  onAddMoneyToVirtualCard: PropTypes.func,
  isViewingDetail: PropTypes.bool,
  onRedeeMoney: PropTypes.func,
  isRedeeming: PropTypes.bool,
  loadRedeeMoney: PropTypes.bool,
  setIsRedeeming: PropTypes.func,
  openConfirmModal: PropTypes.bool,
  setOpenConfirmModal: PropTypes.func,
  virtualCard: PropTypes.objectOf(PropTypes.any).isRequired,
  shouldClear: PropTypes.bool.isRequired,
};

AddMoneyModal.defaultProps = {
  loading: false,
  errors: null,
  currency: null,
  checkTransactionConfirmation: () => {},
  checking: false,
  balanceOnWallet: 0,
  setForm: () => {},
  onOptionsChange: () => {},
  setOpen: () => {},
  walletList: [],
  isSendingCash: PropTypes.bool,
  addMoneyOpen: false,
  setAddMoneyOpen: () => {},
  selectedWallet: {},
  setSelectedWallet: () => {},
  onAddMoneyToVirtualCard: () => {},
  isViewingDetail: false,
  onRedeeMoney: () => {},
  isRedeeming: false,
  loadRedeeMoney: false,
  setIsRedeeming: () => {},
  openConfirmModal: false,
  setOpenConfirmModal: () => {},
};
export default AddMoneyModal;
