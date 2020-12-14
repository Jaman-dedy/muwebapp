/* eslint-disable */
import React from 'react';
import './index.scss';
import TransactionsPlaceholder from 'assets/images/transactions-placeholder.svg';
import WalletDebited from 'assets/images/minus.svg';
import WalletCredited from 'assets/images/plus.svg';
const Transactions = ({ getTransactions, loadingTransaction }) => {
  return (
    <>
      {getTransactions && (
        <div className="wrap-transactions-history">
          {getTransactions &&
            getTransactions[0]?.Data?.slice(0, 3).map(
              ({
                Currency,
                Date,
                OpsType,
                Amount,
                TargetAccount,
              }) => (
                <div className="one-record">
                  <div className="record-info">
                    <h4>{TargetAccount}</h4>
                    {Date}
                  </div>
                  <div className="record-amount">
                    {OpsType === '-' && <img src={WalletDebited} />}
                    {OpsType === '+' && <img src={WalletCredited} />}
                    <b> {Amount}</b> {Currency}
                  </div>
                </div>
              ),
            )}
        </div>
      )}
      {loadingTransaction && (
        <div className="animate-placeholder">
          <img src={TransactionsPlaceholder} />
        </div>
      )}
    </>
  );
};

Transactions.propTypes = {};

export default Transactions;
