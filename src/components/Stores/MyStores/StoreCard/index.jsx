import React from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Dropdown } from 'semantic-ui-react';

import PencilIcon from 'assets/images/pencil_black.png';
import TransactionsImage from 'assets/images/transactions.png';
import ViewHistoryImage from 'assets/images/viewhistory2.png';
import DeleteContactImage from 'assets/images/deletecontact2.png';
import ContactInfoImage from 'assets/images/contactInfo2.png';
import Img from 'components/common/Img';
import './StoreCard.scss';

const StoreCard = ({ store, onClick }) => {
  const {
    StoreName,
    OpeningHour,
    ClosingHour,
    Likes,
    DisLikes,
    Address,
    StoreLogo,
  } = store;
  const imagePlaceholder =
    'https://gentryfashion.com/media/magedelight/storelocator/storeinfo/image/default/shop-placeholder.jpg';

  return (
    <div className="store">
      <div className="store-image">
        <Img src={StoreLogo} alt={<Image src={imagePlaceholder} />} />
      </div>
      <div className="store-info">
        <span className="store-name">{StoreName}</span>
        <span className="store-open-time">
          Open from {OpeningHour} to {ClosingHour}
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
        </div>
      </div>
      <div className="icons">
        <Image
          name="pencil"
          width={17}
          src={PencilIcon}
          onClick={onClick}
        />
        <Dropdown icon={<Icon name="ellipsis vertical" link />}>
          <Dropdown.Menu
            className="options"
            style={{
              marginLeft: -245,
              marginTop: -20,
              width: 240,
              padding: '10px 0px',
            }}
          >
            {[
              {
                image: ViewHistoryImage,
                name: global.translate('View History'),
              },
              {
                image: ContactInfoImage,
                name: global.translate('Edit Store'),
              },
              {
                image: DeleteContactImage,
                name: global.translate('Delete Store'),
              },
            ].map(item => (
              <div className="innerOptions" key={item.name}>
                <Image
                  src={item.image}
                  height={20}
                  className="iconItem"
                />
                <p className="itemName">{item.name}</p>
              </div>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
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
