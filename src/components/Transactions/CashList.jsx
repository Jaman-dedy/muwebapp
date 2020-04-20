import React from 'react';
import './style.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import PREVIOUS_ICON from 'assets/images/back.png';
import UnPaidCashList from './UnPaidCashList';

const CashList = ({
  userData,
  walletNumber,
  unPaidCashList,
  getUnPaidCashList,
  onCancelTransactionConfirm,
  cancelTransactionData,
}) => {
  const history = useHistory();
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <span className="lighter">
          {global.translate('My pending cash transactions')}
        </span>
      </WelcomeBar>
      {!unPaidCashList.loading && (
        <Image
          src={PREVIOUS_ICON}
          height={30}
          onClick={() => history.push('/transactions')}
          className="backImage"
        />
      )}

      <UnPaidCashList
        unPaidCashList={unPaidCashList}
        getUnPaidCashList={getUnPaidCashList}
        walletNumber={walletNumber}
        cancelTransactionData={cancelTransactionData}
        showAll
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
};

CashList.defaultProps = {};
export default CashList;
