/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Image, Icon, Button, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';
import imgLevelHelper from './imgLevelHelper';

const SingleCardView = ({ card, onClick, detail }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const copyToClipBoard = async (e, CardNumber, message) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(CardNumber);
      setCopySuccess(message);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div className="display-card-box">
      <div className="left-side">
        <div>
          <Image
            src={imgLevelHelper(card?.CardType, card?.CardLevel)}
          />
        </div>
        <div className="left-details">
          <span>
            <strong>{card?.NameOnCard}</strong>{' '}
          </span>
          <span>{card?.CardNumberHidden}</span>
          <div className="left-details-action">
            <Popup
              content={copySuccess}
              on="click"
              pinned
              trigger={
                <span
                  onClick={e =>
                    copyToClipBoard(
                      e,
                      card?.CardNumber,
                      'Card number copied!',
                    )
                  }
                >
                  <Icon name="copy outline" />
                  {global.translate('Copy card number')}
                </span>
              }
            />
            <Popup
              content={copySuccess}
              on="click"
              pinned
              trigger={
                <span
                  onClick={e =>
                    copyToClipBoard(e, card?.CVV, 'CVV copied!')
                  }
                >
                  <Icon name="copy outline" />
                  {global.translate('Copy card CVV')}
                </span>
              }
            />
          </div>
        </div>
      </div>
      <div className="right-side">
        <span>
          <strong>{card?.Balance}</strong> {card?.Currency}
        </span>
        {!detail && (
          <Button basic onClick={() => onClick(card)}>
            {global.translate('View')}
          </Button>
        )}
      </div>
    </div>
  );
};
SingleCardView.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  detail: PropTypes.bool.isRequired,
};
export default SingleCardView;
