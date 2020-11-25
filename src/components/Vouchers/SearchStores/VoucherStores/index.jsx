/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Card } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import Img from 'components/Vouchers/Img';
import EllipseMenu from 'components/common/EllipseOptions';
import Message from 'components/common/Message';
import Pagination from 'components/common/Pagination';
import EmptyCard from 'components/common/EmptyCard';
import EmptyStore from 'assets/images/empty_voucher.svg';

import './VoucherStores.scss';

const Stores = ({
  searchStoreList,
  selectingStore,
  options,
  title,
}) => {
  const history = useHistory();
  const [storesToShow, setStoresToShow] = useState([]);
  const { recentStores } = useSelector(state => state.transactions);
  const { pathname: path } = useLocation();

  const onPageChange = itemsToShow => {
    setStoresToShow(itemsToShow);
  };

  useEffect(() => {
    if (searchStoreList) { 
      setStoresToShow(searchStoreList.slice(0,5));
    }
     
  }, [searchStoreList]);

  return (
    <div className="VoucherStores">
      {Array.isArray(searchStoreList) &&
        storesToShow &&
        searchStoreList[0].StoreFound !== 'No' &&
        searchStoreList[0].Result !== 'FAILED' && (
          <Card fluid>
            <Card.Content>
              {Array.isArray(searchStoreList) &&
                searchStoreList &&
                searchStoreList.length > 0 && (
                  <div className="voucher-stores__title">
                    <h3>{title}</h3>
                  </div>
                )}
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
                      <h4>{item.StoreName}</h4>
                      <div className="voucher-stores__items__item__details__row">
                        {global.translate('From', 114)}{' '}
                        {item.OpeningHour}{' '}
                        {global.translate('To', 115)}{' '}
                        {item.ClosingHour}
                      </div>
                      <div className="voucher-stores__items__item__details__row">
                        {item.City}, {item.Address}
                      </div>
                      <div className="flex flex-row">
                        <span className="flex flex-row voucher-stores__items__item__details__thumbs-icons">
                          <span className="flex flex-row">
                            <Icon name="thumbs up" />
                            <span className="flex-row voucher-stores__items__item__details__thumbs-icons__numbers">
                              {item.Likes}
                            </span>
                          </span>
                          <span className="flex flex-rown">
                            <Icon name="thumbs down" />
                            <span className="flex-row voucher-stores__items__item__details__thumbs-icons__numbers">
                              {item.DisLikes}
                            </span>
                          </span>
                        </span>
                        <span className="flex flex-row">
                          <span>
                            <div className="wrap-ratings">
                              <div
                                style={{
                                  width: `${(parseFloat(
                                    item.AverageRating,
                                    10,
                                  ) *
                                    100) /
                                    5}%`,
                                }}
                              />
                              <button
                                className="ratingBtn"
                                type="button"
                                disabled
                              />
                              <button
                                className="ratingBtn"
                                type="button"
                                disabled
                              />
                              <button
                                className="ratingBtn"
                                type="button"
                                disabled
                              />
                              <button
                                className="ratingBtn"
                                type="button"
                                disabled
                              />
                              <button
                                className="ratingBtn"
                                type="button"
                                disabled
                              />
                            </div>
                          </span>
                          <div className="rating-count">
                            {item.RatingCount}{' '}
                            {global.translate('Reviews', 783)}
                          </div>
                        </span>
                      </div>
                    </div>
                    <div>
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
            </Card.Content>
          </Card>
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

      {Array.isArray(recentStores.data) &&
        path.startsWith('/transactions') &&
        recentStores.data[0]?.Result === 'FAILED' && (
          <EmptyCard
            header={global.translate(
              `Looks like you haven't visit any store yet`,
            )}
            createText={global.translate(`Send a voucher`)}
            onAddClick={() => {
              history.push('/contacts?ref=send-voucher');
            }}
            body={global.translate(
              `Click on the button bellow to send a voucher`,
            )}
            imgSrc={EmptyStore}
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
  );
};

Stores.propTypes = {
  searchStoreList: PropTypes.objectOf(PropTypes.any),
  selectingStore: PropTypes.func,
  options: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
Stores.defaultProps = {
  searchStoreList: {},
  selectingStore: null,
  options: null,
  title: 'Stores',
};
export default Stores;
