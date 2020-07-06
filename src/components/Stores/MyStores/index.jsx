/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import './MyStores.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import Loader from 'components/common/Loader';
import Pagination from 'components/common/Pagination';
import Message from 'components/common/Message';
import GoBack from 'components/common/GoBack';
import StoreCard from './StoreCard';
import EmptyCard from './EmptyCard';

const MyStores = ({ userData, myStores }) => {
  const history = useHistory();
  const [storesToShow, setStoresToShow] = useState([]);
  const { error, loading } = myStores;
  const onPageChange = itemsToShow => {
    setStoresToShow(itemsToShow);
  };
  const onClickHandler = () => history.goBack();
  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <div className="contents">
            <div
              style={{ display: 'flex !important' }}
              className="lighter"
            >
              <GoBack style onClickHandler={onClickHandler} />
              <div>{global.translate('My stores')}</div>
            </div>
            <div className="right-contents">
              <Button
                onClick={() => history.push('/add-store')}
                color="orange"
                icon="add"
                basic
                content={global.translate('Create a store', 1243)}
              />
            </div>
          </div>
        </WelcomeBar>
        <div className="my-stores">
          {/* <div className="title">{global.translate('My stores')}</div> */}
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
                <EmptyCard />
              ) : (
                <>
                  {storesToShow.map(store => (
                    <StoreCard
                      key={store.StoreID}
                      onClick={() =>
                        history.push({
                          pathname: '/store-details',
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
