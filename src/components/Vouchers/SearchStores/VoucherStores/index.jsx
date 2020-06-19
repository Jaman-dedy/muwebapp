import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Img from 'components/Vouchers/Img';
import EllipseMenu from 'components/common/EllipseOptions';
import Message from 'components/common/Message';
import Pagination from 'components/common/Pagination';
import ViewEyeImage from 'assets/images/vieweye.png';
import ViewVochersImage from 'assets/images/gift.png';
import EditTransactionImage from 'assets/images/edit.png';
import Advertisementsmage from 'assets/images/shout.png';

import './VoucherStores.scss';

const Stores = ({ searchStoreList, selectingStore }) => {
  const [storesToShow, setStoresToShow] = useState([]);
  const history = useHistory();

  const onPageChange = itemsToShow => {
    setStoresToShow(itemsToShow);
  };

  const options = item => {
    return [
      {
        name: global.translate('View Details'),
        image: ViewEyeImage,
        onClick: () => {
          history.push({
            pathname: '/store-details',
            state: { store: item.StoreID, detailTab: 0 },
          });
        },
      },
      {
        name: global.translate('View Vouchers'),
        image: ViewVochersImage,
        onClick: () => {
          history.push({
            pathname: '/store-details',
            state: { store: item.StoreID, detailTab: 1 },
          });
        },
      },
      /*       {
        name: `${global.translate('Edit')} ${global.translate(
          'Store',
        )}`,
        image: EditTransactionImage,
        onClick: () => {
          history.push({
            pathname: '/store-details',
            state: { store: item.StoreID, detailTab: 2 },
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
              ItemID: item.StoreID,
              CampaignType: 1,
              item: {
                ItemID: item.StoreID,
                Name: item.StoreName,
                Address: item.Address,
                Logo: item.StoreLogo,
              },
            },
          });
        },
      }, */
    ];
  };
  return (
    <div className="VoucherStores">
      <div className="add-money-container">
        {Array.isArray(searchStoreList) &&
          searchStoreList &&
          searchStoreList.length > 0 && (
            <div className="voucher-stores__title">
              {global.translate('Stores', 1624)}
            </div>
          )}

        {Array.isArray(searchStoreList) &&
          storesToShow &&
          searchStoreList[0].StoreFound !== 'No' && (
            <div className="voucher-stores__items">
              {storesToShow.map(item => (
                <button
                  type="button"
                  className="flex flex-row voucher-stores__items__item "
                  onClick={() => {
                    selectingStore(item);
                  }}
                >
                  <div className="voucher-stores__items__item__image-container">
                    <Img
                      pic={item.StoreLogo || 'N/A'}
                      className="voucher-stores__items__item__image-container__image"
                    />
                  </div>
                  <div className="voucher-stores__items__item__details flex flex-column">
                    <span>
                      <span>{item.StoreName}</span>
                    </span>
                    <span>
                      {global.translate('From', 114)}{' '}
                      {item.OpeningHour} {global.translate('To', 115)}{' '}
                      {item.ClosingHour}
                    </span>
                    <span>
                      {item.City}, {item.Address}
                    </span>
                    <span className="voucher-stores__items__item__details__thumbs-icons">
                      <span>
                        <Icon name="thumbs up outline" />
                      </span>
                      <span>
                        <Icon name="thumbs down outline" />
                      </span>
                    </span>
                  </div>
                  <div>
                    {/*  <Icon name="ellipsis vertical" /> */}

                    <EllipseMenu
                      options={options(item)}
                      userItemStyle={{
                        paddingLeft: 5,
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}

        {Array.isArray(searchStoreList) &&
          searchStoreList[0].StoreFound === 'No' && (
            <Message
              error={false}
              message={global.translate(
                'The search returns no result',
                1253,
              )}
              style={{ width: '100%' }}
            />
          )}

        {searchStoreList && searchStoreList.length > 5 && (
          <Pagination
            data={searchStoreList}
            onPageChange={onPageChange}
            itemsPerPage={5}
            style={{ width: '80%' }}
          />
        )}
      </div>
    </div>
  );
};

Stores.propTypes = {
  searchStoreList: PropTypes.objectOf(PropTypes.any),
  selectingStore: PropTypes.func,
};
Stores.defaultProps = {
  searchStoreList: {},
  selectingStore: null,
};
export default Stores;
