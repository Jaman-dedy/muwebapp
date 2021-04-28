import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import RightArrowIcon from 'assets/images/profile/right-arrow-icon.svg';
import WalletIcon from 'assets/images/profile/wallet-profile-icon.svg';
import RookieIcon from 'assets/images/profile/rookie-icon.svg';
import './style.scss';

const CardFidelity = ({ title, fidelity, stats }) => {
  return (
    <div className="card-container">
      <div className="card-summary margin-btm">
        <div>{title}</div>
        <div>
          <Image src={RightArrowIcon} />
        </div>
      </div>
      <div className="card-summary">
        <div className="wallet-count">{stats}</div>
        <div>
          <Image src={fidelity ? RookieIcon : WalletIcon} />
        </div>
      </div>
    </div>
  );
};

CardFidelity.propTypes = {
  title: PropTypes.string,
  fidelity: PropTypes.bool,
  stats: PropTypes.string,
};
CardFidelity.defaultProps = {
  title: '',
  fidelity: false,
  stats: '',
};

export default CardFidelity;
