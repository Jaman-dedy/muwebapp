/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Fab.scss';
import { Icon } from 'semantic-ui-react';

const Fab = ({
  goToVoucher,
  goToSendCash,
  goToGetPaid,
  goToQuickPay,
  goToSendMoney,
}) => {
  const [showOption, setShowOption] = useState(false);

  return (
    <div className="fab-container">
      <div
        className="fab fab-icon-holder"
        onClick={() => {
          setShowOption(show => !show);
        }}
      >
        <Icon name="money bill alternate outline" />
      </div>
      <ul className="fab-options">
        {showOption && (
          <>
            <li>
              <span className="fab-label">
                {global.translate('Send voucher')}
              </span>
              <div onClick={goToVoucher} className="fab-icon-holder">
                <Icon name="gift" />
              </div>
            </li>
            <li>
              <span className="fab-label">
                {global.translate('Send cash', 1948)}
              </span>
              <div onClick={goToSendCash} className="fab-icon-holder">
                <Icon name="money bill alternate" />
              </div>
            </li>
            <li>
              <span className="fab-label">
                {global.translate('Get paid', 482)}
              </span>
              <div onClick={goToGetPaid} className="fab-icon-holder">
                <Icon name="qrcode" />
              </div>
            </li>
            <li>
              <span className="fab-label">
                {global.translate('Send money')}
              </span>
              <div
                onClick={goToSendMoney}
                className="fab-icon-holder"
              >
                <Icon name="dollar sign" />
              </div>
            </li>
            <li>
              <span className="fab-label">
                {global.translate('Quick pay')}
              </span>
              <div onClick={goToQuickPay} className="fab-icon-holder">
                <Icon name="dollar sign" />
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

Fab.propTypes = {
  goToVoucher: PropTypes.func.isRequired,
  goToSendCash: PropTypes.func.isRequired,
  goToGetPaid: PropTypes.func.isRequired,
  goToQuickPay: PropTypes.func.isRequired,
  goToSendMoney: PropTypes.func.isRequired,
};

export default Fab;
