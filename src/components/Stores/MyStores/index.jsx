/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import './MyStores.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import Loader from 'components/common/Loader';
import Pagination from 'components/common/Pagination';
import Message from 'components/common/Message';
import GoBack from 'components/common/GoBack';
import RedeemVoucherModal from 'components/Stores/StoreDetailsComponent/RedeemVoucherModal';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import StoreCard from './StoreCard';
import EmptyCard from './EmptyCard';

const MyStores = ({ userData, myStores }) => {
  const locationParams = useLocation();
  const params = queryString.parse(locationParams.search);

  const history = useHistory();
  const [storesToShow, setStoresToShow] = useState([]);
  const { error, loading } = myStores;

  const [
    isOpenRedeemVoucherModal,
    setIsOpenRedeemVoucherModal,
  ] = useState(false);
  const onPageChange = itemsToShow => {
    setStoresToShow(itemsToShow);
  };
  const onClickHandler = () => history.goBack();

  useEffect(() => {
    if (params.redeem === 'true') {
      setIsOpenRedeemVoucherModal(true);
    }
  }, []);

  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <div className="head-content">
            {!isAppDisplayedInWebView() && (
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
            )}
            <h2 className="head-title">
              {global.translate('My stores')}
            </h2>
            <div className="head-buttons">
              <button
                type="button"
                onClick={() => {
                  setIsOpenRedeemVoucherModal(true);
                }}
              >
                {global.translate('Redeem a voucher', 1243)}
              </button>
              <button
                type="button"
                onClick={() => history.push('/add-store')}
              >
                {global.translate('Create a store', 1243)}
              </button>
            </div>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="clear" />
        <div className="wrap__container">
          <div className="my-stores">
            {myStores.loading && (
              <p>
                <Loader
                  loaderContent={global.translate('Working...', 412)}
                />
              </p>
            )}
            {error && error[0] && !loading && (
              <Message
                message={
                  error[0].Description
                    ? global.translate(error[0].Description)
                    : global.translate(error.error)
                }
              />
            )}
            {error && !error[0] && !loading && (
              <Message message={global.translate(error.error)} />
            )}
            {!myStores.loading && !error && (
              <div className="my-store-list">
                {myStores.storeList &&
                myStores.storeList[0] &&
                myStores.storeList[0].Error === '2016' &&
                !myStores.loading ? (
                  <EmptyCard
                    createText={global.translate('Create store')}
                    onAddClick={() => history.push('/add-store')}
                    header={global.translate(
                      'Looks like you do not have a store yet',
                    )}
                    body={global.translate(
                      'You can create your own store and offer any service your want across our platforms',
                    )}
                  />
                ) : (
                  <>
                    {storesToShow.map(store => (
                      <StoreCard
                        key={store.StoreID}
                        onClick={() =>
                          history.push({
                            pathname: '/store-details',
                            search: '?tab=details',
                            state: { store: store.StoreID },
                          })
                        }
                        store={store}
                      />
                    ))}
                  </>
                )}
              </div>
            )}
            {!loading && !error && (
              <Pagination
                data={myStores.storeList}
                onPageChange={onPageChange}
                itemsPerPage={5}
              />
            )}
          </div>
        </div>
        <RedeemVoucherModal
          open={isOpenRedeemVoucherModal}
          setOpen={setIsOpenRedeemVoucherModal}
        />
      </DashboardLayout>
    </>
  );
};

MyStores.propTypes = {
  userData: PropTypes.instanceOf(Object),
  myStores: PropTypes.instanceOf(Object).isRequired,
};

MyStores.defaultProps = {
  userData: {
    data: {},
  },
};

export default MyStores;
