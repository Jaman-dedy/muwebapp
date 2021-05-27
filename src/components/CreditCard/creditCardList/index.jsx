import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import GoBack from 'components/common/GoBack';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import EmptyCard from 'components/common/EmptyCard';
import EmptyCardList from 'assets/images/empty_card.svg';
import getUserData from 'redux/actions/users/getUserInfo';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import ModalInfo from 'components/common/ModalInfo';
import modalIcon from 'assets/images/microloan/danger-cross.svg';

import './CardList.scss';
import Placeholder from './Placeholder';
import DisplayCard from './DisplayCard';

const CreditCardList = ({ creditCardList, loading, userData }) => {
  const history = useHistory();
  const handleOnClick = wallet => {
    history.push({
      pathname: '/credit-card-details',
      state: { wallet },
    });
  };

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.user.userData);

  const [openModal, setOpenModal] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    if (!data) {
      getUserData()(dispatch);
    }
  }, []);

  const handleCreateCard = () => {
    if (userData?.AccountVerified === 'YES') {
      handleCreateCard();
    } else {
      setOpenModal(true);
    }
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
            {global.translate('My M-Cards', 2159)}
          </h2>
          <div className="head-buttons">
            <button
              type="button"
              onClick={() => {
                if (userData?.AccountVerified === 'YES') {
                  handleCreateCard();
                } else {
                  setOpenModal(true);
                }
              }}
            >
              {global.translate(`Order an M-Card`, 2171)}
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
              2161,
            )}
            createText={global.translate('add an M-Card', 1961)}
            body={global.translate(
              'You can create your M-card and use them for your transactions',
              2162,
            )}
            onAddClick={handleCreateCard}
            imgSrc={EmptyCardList}
          />
        ) : (
          !loading && (
            <div className="CardList">
              <Segment style={{ padding: 0 }}>
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
      <ModalInfo
        open={openModal}
        setOpen={setOpenModal}
        title={global.translate('You are not eligible', 2280)}
        body={global.translate(
          'You are not eligible to order an M Card. Only verified accounts can order an M Card. To be verified you need navigate to the profile page and upload your documents',
        )}
        icon={modalIcon}
        isEligible={isEligible}
        buttonText={global.translate('Okay', 2554)}
      />
    </DashboardLayout>
  );
};
CreditCardList.propTypes = {
  creditCardList: PropTypes.instanceOf(Array),
  loading: PropTypes.bool.isRequired,
  userData: PropTypes.objectOf(PropTypes.any),
};
CreditCardList.defaultProps = {
  creditCardList: [],
  userData: {},
};
export default CreditCardList;
