/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './StoreCard.scss';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import EditTransactionImage from 'assets/images/edit.png';
import ViewVochersImage from 'assets/images/gift.png';
import imagePlaceholder from 'assets/images/ShopIcon.svg';
import Advertisementsmage from 'assets/images/shout.png';
import VoucherImage from 'assets/images/voucher.png';
import ViewEyeImage from 'assets/images/vieweye.png';
import EllipseMenu from 'components/common/EllipseOptions';
import Img from 'components/common/Img';

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
      name: global.translate('View Details', 1556),
      image: ViewEyeImage,
      onClick: () => {
        history.push({
          pathname: '/store-details',
          state: {
            store: StoreID,
            detailTab: 0,
            storeName: StoreName,
          },
        });
      },
    },
    {
      name: global.translate('View Vouchers', 2219),
      image: ViewVochersImage,
      onClick: () => {
        history.push({
          pathname: '/store-details',
          state: {
            store: StoreID,
            detailTab: 1,
            storeName: StoreName,
          },
        });
      },
    },
    {
      name: `${global.translate('Edit')} ${global.translate(
        'Store',
        803,
      )}`,
      image: EditTransactionImage,
      onClick: () => {
        history.push({
          pathname: '/store-details',
          state: {
            store: StoreID,
            detailTab: 2,
            storeName: StoreName,
          },
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
              ...store,
            },
          },
        });
      },
    },
    {
      name: `${global.translate('Send Voucher', 763)}`,
      image: VoucherImage,
      onClick: () => {
        history.push({
          pathname: '/contacts',
          search: 'ref=send-voucher',
          state: {
            targetStore: store,
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
          not_rounded
        />
      </div>
      <div className="store-info">
        <h3 className="store-name">{StoreName}</h3>
        <span className="store-open-time">
          {global.translate('Open from', 1625)} {OpeningHour}
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
            <Icon name="clock outline" />
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
