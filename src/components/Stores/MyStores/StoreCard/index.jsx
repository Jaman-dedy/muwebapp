/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Img from 'components/common/Img';
import './StoreCard.scss';
import imagePlaceholder from 'assets/images/placeholder.jpg';
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
      name: `${global.translate('Manage')} ${global.translate(
        'Advertisements',
      )}`,
      image: Advertisementsmage,
      onClick: () => {
        history.push({
          pathname: '/store-details',
          state: { store: StoreID, detailTab: 1 },
        });
      },
    },
  ];

  return (
    <div className="store" onClick={onClick}>
      <div className="store-image">
        <Img src={StoreLogo} alt={<Image src={imagePlaceholder} />} />
      </div>
      <div className="store-info">
        <span className="store-name">{StoreName}</span>
        <span className="store-open-time">
          {global.translate('Open from')} {OpeningHour}{' '}
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
