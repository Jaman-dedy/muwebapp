import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';
import CardFidelity from './CardFidelity';
import CardShortCut from './CardShortCut';
import ReferralCard from './ReferralCard';

const Profile = ({ isABusinessAccount, onClick, userData }) => {
  const rewards = userData?.Rewards;
  return (
    <div className="user-profile-container">
      <div className="user-intro">
        <h3>
          {global.translate('Hi')}
          &nbsp;
          {userData?.FirstName},{' '}
          {global.translate("let's setup your account real quick")}
        </h3>
        <div>
          {' '}
          {global.translate(
            'Your account is active and you can explore different features tailored for you. We only need to verify your identify so that your account is fully functional.',
          )}
        </div>
        <div>
          <Button
            className={
              !isABusinessAccount
                ? `btn-update-info`
                : `btn-update-switch`
            }
            onClick={onClick}
          >
            {global.translate('Update personal information')}
          </Button>
          <Button
            className={
              isABusinessAccount
                ? `btn-update-info`
                : `btn-update-switch`
            }
            onClick={onClick}
          >
            {global.translate('Switch to business account')}
          </Button>
        </div>
      </div>
      <div className="user-stats">
        <CardFidelity
          title={global.translate('Number of wallets')}
          stats={userData?.Wallets?.length}
        />
        <CardFidelity
          title={rewards?.StatusText}
          stats={rewards?.TotalPoints?.PointsValue}
          fidelity
        />
        <CardShortCut />
      </div>
      <ReferralCard />
    </div>
  );
};
Profile.propTypes = {
  isABusinessAccount: PropTypes.bool,
  onClick: PropTypes.func,
  userData: PropTypes.objectOf(PropTypes.any),
};
Profile.defaultProps = {
  isABusinessAccount: false,
  onClick: () => {},
  userData: {},
};

export default Profile;
