import React, { useState } from 'react';
import { Input, Button, Popup } from 'semantic-ui-react';
import './style.scss';

const ReferralCard = () => {
  const referralURI = 'app.2u.money/register?referral=trump';
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipBoard = async (e, CardNumber, message) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(CardNumber);
      setCopySuccess(message);
    } catch (err) {
      setCopySuccess('Failed to copy!', 2143);
    }
  };
  return (
    <div className="referee-container">
      <div>
        {' '}
        <h3>{global.translate('Tell friends about')} 2u Money</h3>
        <div>
          {global.translate(
            ' Share this link so your fiends can join millions of people who want to secure their transaction, and manage their digital wallets.',
          )}
        </div>
      </div>
      <div className="link-input">
        <Input value={referralURI} />
        <Popup
          content={copySuccess}
          on="click"
          pinned
          trigger={
            <Button
              onClick={e =>
                copyToClipBoard(e, referralURI, 'Link copied!')
              }
              content={global.translate('Copy link')}
            />
          }
        />
      </div>
    </div>
  );
};

export default ReferralCard;
