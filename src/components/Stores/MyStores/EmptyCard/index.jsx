import React from 'react';
import { Image } from 'semantic-ui-react';

import AddBig from 'assets/images/addBig.png';
import './EmptyCard.scss';

const EmptyCard = () => {
  return (
    <div className="empty-store">
      <div className="cards">
        <div className="card">
          <div className="store-image" />
          <div className="store-info">
            <div className="store-name" />
            <div className="store-open-time" />
            <div className="store-address" />
          </div>
        </div>
        <div className="card">
          <div className="store-image" />
          <div className="store-info">
            <div className="store-name" />
            <div className="store-open-time" />
            <div className="store-address" />
          </div>
        </div>
      </div>
      <div className="add-store">
        <span>
          {global.translate('You don’t have any store yet')}
        </span>
        <div>
          <Image src={AddBig} size="mini" onClick={() => null} />
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
