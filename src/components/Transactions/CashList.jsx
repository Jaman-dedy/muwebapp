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
        <span className="lighter">
          {fromVouchers
            ? global.translate('My pending sent vouchers')
            : global.translate('My pending cash transactions')}
          {}
        </span>
      </WelcomeBar>
      <GoBack onClickHandler={onClickHandler} />
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
    </DashboardLayout>
  );
};
CashList.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  walletNumber: PropTypes.string.isRequired,
  unPaidCashList: PropTypes.arrayOf(PropTypes.any).isRequired,
  getUnPaidCashList: PropTypes.func.isRequired,
  onCancelTransactionConfirm: PropTypes.func,
  cancelTransactionData: PropTypes.func,
  pendingVouchersOnWallets: PropTypes.objectOf(PropTypes.any),
  fromVouchers: PropTypes.bool,
};

CashList.defaultProps = {
  onCancelTransactionConfirm: () => {},
  cancelTransactionData: () => {},
  pendingVouchersOnWallets: {},
  fromVouchers: false,
};
export default CashList;
