/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import formatNumber from 'utils/formatNumber';
import payOptionImg from 'assets/images/microloan/pay-option.svg';
import payOptionTickedImg from 'assets/images/microloan/pay-option-ticked.svg';
import './style.scss';

const PayLoanModal = ({
  open,
  setOpen,
  loan,
  paymentOption,
  setPaymentOption,
  handleConfirmPayLoan,
  confirmLoanLoading,
  payLoanLoading,
  confirmLoanData,
  walletList,
}) => {
  const wallet =
    walletList?.length !== 0 &&
    walletList.find(
      ({ AccountNumber }) => AccountNumber === loan?.WalletNumber,
    );
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="tiny">
      <Modal.Content>
        <h3>{global.translate('Pay this loan')}</h3>
        <div className="pay-off-title">
          {global.translate('Pay from wallet')}
        </div>
        <div>
          <div>
            <div className="pay-text-content">
              <div className="flag-img">
                <Image src={wallet && wallet.Flag} />
              </div>

              <div className="wallet-content">
                <div>
                  <strong>{loan?.WalletNumber}</strong>{' '}
                </div>
                <div>
                  {wallet &&
                    formatNumber(wallet.Balance, {
                      locales: preferred,
                    })}
                  &nbsp; {wallet && wallet.CurrencyCode}
                </div>
              </div>
            </div>
            <div className="pay-off-options">
              <div className="pay-off-title">
                {global.translate('Pay off options')}
              </div>
              <div
                className="pay-option"
                onClick={() => setPaymentOption('Total')}
                style={
                  paymentOption === 'Total'
                    ? {
                        border: '1px solid #E95927',
                        'box-shadow':
                          '0px 0px 10px rgba(0, 0, 0, 0.2)',
                      }
                    : null
                }
              >
                <div>
                  <div>
                    <strong>
                      {loan?.Currency} {loan?.CapitalBalance}
                    </strong>{' '}
                  </div>
                  {global.translate(
                    'Pay off the whole remaining loan balance',
                  )}
                </div>
                <Image
                  src={
                    paymentOption === 'Total'
                      ? payOptionTickedImg
                      : payOptionImg
                  }
                />
              </div>
              <div
                className="pay-option"
                onClick={() => setPaymentOption('Month')}
                style={
                  paymentOption === 'Month'
                    ? {
                        border: '1px solid #E95927',
                        'box-shadow':
                          '0px 0px 10px rgba(0, 0, 0, 0.2)',
                      }
                    : null
                }
              >
                <div>
                  <div>
                    {' '}
                    <strong>
                      {loan?.Currency} {loan?.MonthlyPay}
                    </strong>{' '}
                  </div>
                  {global.translate('Monthly payment')}
                </div>
                <Image
                  src={
                    paymentOption === 'Month'
                      ? payOptionTickedImg
                      : payOptionImg
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pay-now-button">
          <Button
            loading={confirmLoanLoading || payLoanLoading}
            content={
              confirmLoanData
                ? global.translate('Pay now')
                : global.translate('Next')
            }
            onClick={handleConfirmPayLoan}
          />
        </div>
        <div className="cancel-now-button">
          <Button basic color="red" onClick={() => setOpen(false)}>
            {global.translate('Cancel')}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

PayLoanModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  loan: PropTypes.objectOf(PropTypes.any),
  paymentOption: PropTypes.string,
  setPaymentOption: PropTypes.func,
  handleConfirmPayLoan: PropTypes.func,
  confirmLoanLoading: PropTypes.func,
  payLoanLoading: PropTypes.func,
  confirmLoanData: PropTypes.objectOf(PropTypes.any),
  walletList: PropTypes.arrayOf(PropTypes.any),
};
PayLoanModal.defaultProps = {
  open: false,
  setOpen: () => {},
  loan: {},
  paymentOption: 'Total',
  setPaymentOption: () => {},
  handleConfirmPayLoan: () => {},
  confirmLoanLoading: () => {},
  payLoanLoading: () => {},
  confirmLoanData: {},
  walletList: [],
};

export default PayLoanModal;
