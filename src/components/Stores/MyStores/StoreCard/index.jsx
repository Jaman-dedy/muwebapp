/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Img from 'components/common/Img';
import './StoreCard.scss';
import imagePlaceholder from 'assets/images/ShopIcon.svg';
import EllipseMenu from 'components/common/EllipseOptions';
import EditTransactionImage from 'assets/images/edit.png';
import ViewEyeImage from 'assets/images/vieweye.png';
import ViewVochersImage from 'assets/images/gift.png';
import Advertisementsmage from 'assets/images/shout.png';

const StoreCard = ({ store, onClick }) => {
  const {
    StoreName,
    OpeningHour,
    ClosingHour,
    Likes,
    DisLikes,
    Address,
    StoreID,
    StoreLogo,
    PendingVouchers,
  } = store;

  const history = useHistory();
  const [hasError, setHasError] = useState(false);

  const options = [
    {
      name: global.translate('View Details'),
      image: ViewEyeImage,
      onClick: () => {
        history.push({
          pathname: '/store-details',
          state: { store: StoreID, detailTab: 0 },
        });
      },
    },
    {
      name: global.translate('View Vouchers'),
      image: ViewVochersImage,
      onClick: () => {
        history.push({
          pathname: '/store-details',
          state: { store: StoreID, detailTab: 1 },
        });
      },
    },
    {
      name: `${global.translate('Edit')} ${global.translate(
        'Store',
      )}`,
      image: EditTransactionImage,
      onClick: () => {
        history.push({
          pathname: '/store-details',
          state: { store: StoreID, detailTab: 2 },
        });
      },
    },
    {
      name: `${global.translate('Manage campaigns', 128)}`,
      image: Advertisementsmage,
      onClick: () => {
        history.push({
          pathname: '/publicity',
          state: {
            ItemID: StoreID,
            CampaignType: 1,
            item: {
              ItemID: StoreID,
              Name: StoreName,
              Address,
              Logo: StoreLogo,
            },
          },
        });
      },
    },
  ];

  return (
    <div className="store" onClick={onClick}>
      <div className="store-image">
        <Img
          compress
          format="png"
          width="100px"
          height="100px"
          src={StoreLogo}
          hasError={hasError}
          setHasError={setHasError}
          alt={<Image centered src={imagePlaceholder} />}
          notRounded
        />
      </div>
      <div className="store-info">
        <h3 className="store-name">{StoreName}</h3>
        <span className="store-open-time">
          {global.translate('Open from', 1625)} {OpeningHour}{' '}
          {global.translate('to')} {ClosingHour}
        </span>
        <span className="store-address">{Address}</span>
        <div className="likes">
          <div className="up-votes">
            <Icon name="thumbs up outline" />
            <span>{Likes}</span>
          </div>
          <div className="down-votes">
            <Icon name="thumbs down outline" />
            <span>{DisLikes}</span>
          </div>

          <div className="down-votes">
            <Icon name="calculator" />
            <span>{PendingVouchers}</span>
          </div>
        </div>
      </div>

      <EllipseMenu
        options={options}
        userItemStyle={{
          paddingLeft: 5,
        }}
      />
    </div>
  );
};

StoreCard.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func,
};

StoreCard.defaultProps = {
  onClick: () => null,
};

export default StoreCard;
