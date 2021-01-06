import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, List } from 'semantic-ui-react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import GoBack from 'components/common/GoBack';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import EmptyCard from 'components/common/EmptyCard';
import EmptyCardList from 'assets/images/empty_card.svg';
import getUserData from 'redux/actions/users/getUserInfo';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

import './CardList.scss';
import Placeholder from './Placeholder';
import DisplayCard from './DisplayCard';

const CreditCardList = ({ creditCardList, loading }) => {
  const history = useHistory();
  const handleOnClick = wallet => {
    history.push({
      pathname: '/credit-card-details',
      state: { wallet },
    });
  };

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.user.userData);

  useEffect(() => {
    if (!data) {
      getUserData()(dispatch);
    }
  }, []);

  const handleCreateCard = () => {
    history.push('/add-card');
  };

  const onClickHandler = () => history.goBack();
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          {!isAppDisplayedInWebView() && (
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
          )}

          <h2 className="head-title">
            {global.translate('My M-Cards', 2173)}
          </h2>
          <div className="head-buttons">
            <button type="button" onClick={handleCreateCard}>
              {global.translate(`Order an M-Card`, 2175)}
            </button>
          </div>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <>
        {loading && (
          <div className="CardList animate-placeholder">
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </div>
        )}
        {(!creditCardList ||
          !creditCardList?.length ||
          creditCardList[0]?.RecordsCount === '0') &&
        !loading ? (
          <EmptyCard
            header={global.translate(
              "Looks like you don't have any M-Card yet",
            )}
            createText={global.translate('add an M-Card', 1961)}
            body={global.translate(
              'You can create your M-card and use them for your transactions',
            )}
            onAddClick={handleCreateCard}
            imgSrc={EmptyCardList}
          />
        ) : (
          !loading && (
            <div className="CardList">
              <Segment>
                <List divided relaxed>
                  {creditCardList?.map(card => (
                    <DisplayCard
                      card={card}
                      onClick={handleOnClick}
                    />
                  ))}
                </List>
              </Segment>
            </div>
          )
        )}
      </>
    </DashboardLayout>
  );
};
CreditCardList.propTypes = {
  creditCardList: propTypes.instanceOf(Array),
  loading: propTypes.bool.isRequired,
};
CreditCardList.defaultProps = {
  creditCardList: [],
};
export default CreditCardList;
