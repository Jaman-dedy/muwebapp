import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import GoBack from 'components/common/GoBack';
import UnPaidCashList from './UnPaidCashList';

const CashList = ({
  userData,
  walletNumber,
  unPaidCashList,
  getUnPaidCashList,
  onCancelTransactionConfirm,
  cancelTransactionData,
  pendingVouchersOnWallets,
  fromVouchers,
}) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {fromVouchers
              ? global.translate('My pending sent vouchers')
              : global.translate(
                  'My pending cash transactions',
                  1234,
                )}
            {}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>

      <div className="clear" />
      <div className="wrap__container">
        <UnPaidCashList
          unPaidCashList={unPaidCashList}
          getUnPaidCashList={getUnPaidCashList}
          walletNumber={walletNumber}
          cancelTransactionData={cancelTransactionData}
          showAll
          fromVouchers={fromVouchers}
          pendingVouchersOnWallets={pendingVouchersOnWallets}
          onCancelTransactionConfirm={onCancelTransactionConfirm}
        />
      </div>
    </DashboardLayout>
  );
};
CashList.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  walletNumber: PropTypes.string.isRequired,
  unPaidCashList: PropTypes.arrayOf(PropTypes.any).isRequired,
  getUnPaidCashList: PropTypes.func.isRequired,
  onCancelTransactionConfirm: PropTypes.func,
  cancelTransactionData: PropTypes.objectOf(PropTypes.any),
  pendingVouchersOnWallets: PropTypes.objectOf(PropTypes.any),
  fromVouchers: PropTypes.objectOf(PropTypes.any),
};

CashList.defaultProps = {
  onCancelTransactionConfirm: () => {},
  cancelTransactionData: () => {},
  pendingVouchersOnWallets: {},
  fromVouchers: false,
};
export default CashList;
