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
import PREVIOUS_ICON from 'assets/images/back.png';
import StoreCard from './StoreCard';
import EmptyCard from './EmptyCard';

const MyStores = ({ userData, myStores }) => {
  const history = useHistory();
  const [storesToShow, setStoresToShow] = useState([]);
  const onPageChange = itemsToShow => {
    setStoresToShow(itemsToShow);
  };
  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            Hey{' '}
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , {global.translate('enjoy our services')}
          </span>
        </WelcomeBar>
        <div className="my-stores">
          <Image
            src={PREVIOUS_ICON}
            height={30}
            className="goBack"
            onClick={() => history.goBack()}
          />
          <div className="title">{global.translate('My stores')}</div>
          <div className="my-store-list">
            {myStores.storeList.length === 0 && !myStores.loading ? (
              <EmptyCard />
            ) : (
              <>
                {myStores.loading && (
                  <p>
                    <Loader
                      loaderContent={global.translate(
                        'Working...',
                        412,
                      )}
                    />
                  </p>
                )}
                {storesToShow.map(store => (
                  <StoreCard
                    key={store.StoreID}
                    onClick={() =>
                      history.push(
                        `/add-store?StoreID=${store.StoreID}`,
                      )
                    }
                    store={store}
                  />
                ))}
              </>
            )}
          </div>
          <Pagination
            data={myStores.storeList}
            onPageChange={onPageChange}
            itemsPerPage={4}
          />
          <Image
            height={90}
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
