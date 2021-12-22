import React, { useState } from 'react';
import { Button, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const ReferralCard = ({ username }) => {
  const referralURI = `${
    window.location.origin
  }/register?referrer=${username?.toLowerCase()}`;
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipBoard = async (e, CardNumber, message) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(CardNumber);
      setCopySuccess(message);
    } catch (err) {
      setCopySuccess(`${global.translate('Failed to copy!')}`);
    }
  };
  return (
    <div className="referee-container">
      <div>
        {' '}
        <h3>{global.translate('Tell friends about')} M2u Money</h3>
        <div>
          {global.translate(
            ' Share this link so your fiends can join millions of people who want to secure their transaction, and manage their digital wallets.',
          )}
        </div>
      </div>
      <div className="link-input">
        <div className="referral-link">{referralURI}</div>
        <Popup
          content={copySuccess}
          on="click"
          pinned
          trigger={
            <Button
              onClick={e =>
                copyToClipBoard(
                  e,
                  referralURI,
                  global.translate('Link copied!'),
                )
              }
              content={global.translate('Copy link')}
            />
          }
        />
      </div>
    </div>
  );
};

ReferralCard.propTypes = {
  username: PropTypes.string,
};

ReferralCard.defaultProps = {
  username: '',
};

export default ReferralCard;
