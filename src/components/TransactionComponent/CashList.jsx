import React from 'react';
import './style.scss';
import { Button, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import UnPaidCashList from './UnPaidCashList';
import { useHistory } from 'react-router-dom';
import PREVIOUS_ICON from 'assets/images/back.png';

const CashList = ({
  userData,
  walletNumber,
  unPaidCashList,
  getUnPaidCashList,
}) => {
  const history = useHistory();
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData.loading}>
        <span className="lighter">
          &nbsp; Hey{' '}
          <strong>
            {`${userData.data && userData.data.FirstName}`},{' '}
          </strong>
          {global.translate(
            'Here are all your unpaid Cash Transactions',
          )}
        </span>
      </WelcomeBar>
      <Image
        src={PREVIOUS_ICON}
        height={30}
        onClick={() => history.push('/transactions')}
        className="backImage"
      />

      <div className="main-container" style={{ marginTop: -45 }}>
        <UnPaidCashList
          unPaidCashList={unPaidCashList}
          getUnPaidCashList={getUnPaidCashList}
          walletNumber={walletNumber}
          showAll
        />
      </div>
    </DashboardLayout>
  );
};
CashList.propTypes = {};

CashList.defaultProps = {};
export default CashList;
