/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Message, Grid } from 'semantic-ui-react';
import propTypes from 'prop-types';
import GoBack from 'components/common/GoBack';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import Wrapper from 'hoc/Wrapper';
import CardFront from '../Card/CardFront';
import CardBack from '../Card/CardBack';
import CardMiniFront from '../Card/MiniCard/CardFront';
import CardMiniBack from '../Card/MiniCard/CardBack';
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
  balanceOnWallet,
  onOptionsChange,
  currency,
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
  // const handleSetCardFace = (e, CardNumber, cardSide) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const updatedCards = creditCards.map(item => {
  //     if (item.CardNumber === CardNumber) {
  //       return {
  //         ...item,
  //         cardFace: cardSide,
  //       };
  //     }
  //     return item;
  //   });
  //   setCreditCards(updatedCards);
  // };
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('My Credit cards')}
          </h2>
          <div className="head-buttons">
            <button type="button" onClick={handleModalOpen}>
              {global.translate(`Add a credit card`)}
            </button>
          </div>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className={classes.CardList}>
        <div>
          {loading && (
            <Wrapper>
              <Placeholder />
              <Placeholder />
              <Placeholder />
            </Wrapper>
          )}
          {creditCardList &&
          creditCardList[0].RecordsCount === '0' ? (
            <Message>
              <p style={{ textAlign: 'center' }}>
                {global.translate(`Credit cards not found`)}
              </p>
            </Message>
          ) : (
            creditCards.map(wallet => (
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
            ))
          )}
        </div>
      </div>
      <AddCreditCardModal
        open={open}
        setOpen={setOpen}
        errors={errors}
        setErrors={setErrors}
        creditCardList={creditCardList && creditCardList}
        walletList={walletList && walletList}
        selectedWallet={selectedWallet}
        setSlectedWallet={setSlectedWallet}
        balanceOnWallet={balanceOnWallet}
        onOptionsChange={onOptionsChange}
        currency={currency}
        creditCardNextStep={creditCardNextStep}
      />
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
};

CreditCardList.defaultProps = {
  creditCardList: [],
};

export default CreditCardList;
