/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import './MyStores.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import Loader from 'components/common/Loader';
import Pagination from 'components/common/Pagination';
import AddBig from 'assets/images/addBig.png';
import StoreCard from './StoreCard';
import EmptyCard from './EmptyCard';
import Message from 'components/common/Message';
import GoBack from 'components/common/GoBack';

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
          <span className="lighter">
            {global.translate('Our services')}
          </span>
        </WelcomeBar>
        <GoBack onClickHandler={onClickHandler} />
        <div className="my-stores">
          <div className="title">{global.translate('My stores')}</div>
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

          <Image
            height={75}
            className="addImage"
            src={AddBig}
            onClick={() => history.push('/add-store')}
          />
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
