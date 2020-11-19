import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import GoBack from 'components/common/GoBack';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import EmptyCard from 'components/common/EmptyCard';
import EmptyCardList from 'assets/images/empty_card.svg';
import getUserData from 'redux/actions/users/getUserInfo';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import CardFront from '../Card/CardFront';
import CardBack from '../Card/CardBack';
import Details from '../Card/Details';
import classes from './CardList.module.scss';
import Placeholder from './Placeholder';
import AddCreditCardModal from './AddCreditCardModal';
import GetCardOptions from '../getOptions';

const CreditCardList = ({
  creditCardList,
  loading,
  setOpen,
  open,
  errors,
  setErrors,
  walletList,
  selectedWallet,
  setSlectedWallet,
  getCardOptions,
  openOptionModal,
  setOpenOptionModal,
  setForm,
  creditCardNextStep,
}) => {
  const history = useHistory();
  const [creditCards, setCreditCards] = useState([]);
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

  const handleModalOpen = () => {
    setOpen(true);
  };

  const setBGcolor = level => {
    if (level === '1') {
      return classes.YouthCardBG;
    }
    if (level === '2') {
      return classes.SilverCardBG;
    }
    if (level === '3') {
      return classes.GoldCardBG;
    }
    if (level === '4') {
      return classes.PlatinumBG;
    }
    if (level === '5') {
      return classes.BlackBG;
    }
  };
  const setBackBGColor = level => {
    if (level === '1') {
      return classes.YouthBackBG;
    }
    if (level === '2') {
      return classes.SilverBackBG;
    }
    if (level === '3') {
      return classes.GoldBackCardBG;
    }
    if (level === '4') {
      return classes.PlatinumBackBG;
    }
    if (level === '5') {
      return classes.BlackBackBG;
    }
  };
  const matchLevel = level => {
    if (level === '1') {
      return 'Youth';
    }
    if (level === '2') {
      return 'Silver';
    }
    if (level === '3') {
      return 'Gold';
    }
    if (level === '4') {
      return 'Platinum';
    }
    if (level === '5') {
      return 'Black';
    }
  };
  useEffect(() => {
    if (creditCardList) {
      setCreditCards(
        creditCardList.map(item => {
          const levelColor = setBGcolor(item.CardLevel);
          const levelBackColor = setBackBGColor(item.CardLevel);
          const textLevels = matchLevel(item.CardLevel);
          return {
            ...item,
            cardFace: 'recto',
            levelColor,
            levelBackColor,
            textLevels,
          };
        }),
      );
    }
  }, [creditCardList]);

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
            {global.translate('My M-Cards')}
          </h2>
          <div className="head-buttons">
            <button type="button" onClick={handleModalOpen}>
              {global.translate(`Add an M-Card`)}
            </button>
          </div>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <>
        {loading && (
          <div className={classes.CardList}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </div>
        )}
        {creditCardList && creditCardList[0].RecordsCount === '0' ? (
          <EmptyCard
            header={global.translate(
              "Looks like you don't have any M-Card yet",
            )}
            createText={global.translate('add an M-Card', 1961)}
            body={global.translate(
              'You can create your M-card and use them for your transactions',
            )}
            onAddClick={handleModalOpen}
            imgSrc={EmptyCardList}
          />
        ) : (
          !loading && (
            <div className={classes.CardList}>
              {creditCards.map(wallet => (
                <Grid
                  className={classes.CardLayout}
                  onClick={() => {
                    handleOnClick(wallet);
                  }}
                >
                  <Grid.Column mobile={16} tablet={16} computer={7}>
                    <div className={classes.BGCardLayout}>
                      {wallet.cardFace === 'recto' && (
                        <CardFront wallet={wallet} />
                      )}
                      {wallet.cardFace === 'verso' && (
                        <CardBack wallet={wallet} />
                      )}
                    </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={16} computer={9}>
                    <Details wallet={wallet} />
                  </Grid.Column>
                </Grid>
              ))}
            </div>
          )
        )}
      </>
      {open && walletList.length > 0 && (
        <AddCreditCardModal
          open={open}
          setOpen={setOpen}
          errors={errors}
          setErrors={setErrors}
          creditCardList={creditCardList}
          walletList={walletList}
          selectedWallet={selectedWallet}
          setSlectedWallet={setSlectedWallet}
          creditCardNextStep={creditCardNextStep}
        />
      )}
      <GetCardOptions
        getCardOptions={getCardOptions}
        addCreditCardModalOpen={openOptionModal}
        setAddCreditCardModalOpen={setOpenOptionModal}
        setForm={setForm}
      />
    </DashboardLayout>
  );
};

CreditCardList.propTypes = {
  creditCardList: propTypes.instanceOf(Array),
  loading: propTypes.bool.isRequired,
  setOpen: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
  errors: propTypes.string.isRequired,
  setErrors: propTypes.func.isRequired,
  walletList: propTypes.instanceOf(Array).isRequired,
  selectedWallet: propTypes.instanceOf(Array).isRequired,
  setSlectedWallet: propTypes.func.isRequired,
  getCardOptions: propTypes.instanceOf(Object).isRequired,
  openOptionModal: propTypes.bool.isRequired,
  setOpenOptionModal: propTypes.func.isRequired,
  setForm: propTypes.func.isRequired,
  creditCardNextStep: propTypes.func.isRequired,
};

CreditCardList.defaultProps = {
  creditCardList: [],
};

export default CreditCardList;
