import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';
import CardFidelity from './CardFidelity';
import CardShortCut from './CardShortCut';
import ReferralCard from './ReferralCard';

const Profile = ({
  onUpdatePersonalInformation,
  onUpdateBusinessInformation,
  userData,
  updateInfo,
}) => {
  const rewards = userData?.Rewards;

  return (
    <div className="user-profile-container">
      <div className="user-intro">
        <h3>
          {global.translate('Hi')}
          &nbsp;
          <span>{userData?.FirstName}</span>,{' '}
          {global.translate("let's setup your account real quick")}
        </h3>
        <div>
          {global.translate(
            'Your account is active and you can explore different features tailored for you. We only need to verify your identify so that your account is fully functional.',
          )}
        </div>
      </div>
      <div className="user-stats">
        <div className="fidelity-card">
          <CardFidelity
            title={global.translate('Number of wallets')}
            stats={userData?.Wallets?.length}
          />
          <CardFidelity
            title={rewards?.StatusText}
            stats={rewards?.TotalPoints?.PointsValue}
            fidelity
          />
        </div>
        <CardShortCut />
      </div>
      <ReferralCard username={userData?.PID} />
    </div>
  );
};
Profile.propTypes = {
  isABusinessAccount: PropTypes.bool,
  onClick: PropTypes.func,
  userData: PropTypes.objectOf(PropTypes.any),
  updateBusinessAccount: PropTypes.bool.isRequired,
};
Profile.defaultProps = {
  isABusinessAccount: false,
  onClick: () => {},
  userData: {},
};

export default Profile;
