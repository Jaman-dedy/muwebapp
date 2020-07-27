import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Segment, Grid, Message } from 'semantic-ui-react';
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

const CreditCardList = ({ creditCardList, loading }) => {
  const history = useHistory();
  const [creditCards, setCreditCards] = useState([]);

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
  useEffect(() => {
    if (creditCardList) {
      setCreditCards(
        creditCardList.map(item => {
          const levelColor = setBGcolor(item.CardLevel);
          const levelBackColor = setBackBGColor(item.CardLevel);
          return {
            ...item,
            cardFace: 'recto',
            levelColor,
            levelBackColor,
          };
        }),
      );
    }
  }, [creditCardList]);
  const onClickHandler = () => history.goBack();
  const handleSetCardFace = (e, CardNumber, cardSide) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedCards = creditCards.map(item => {
      if (item.CardNumber === CardNumber) {
        return {
          ...item,
          cardFace: cardSide,
        };
      }
      return item;
    });
    setCreditCards(updatedCards);
  };
  return (
    <DashboardLayout>
      <WelcomeBar>
        <span className="lighter">
          {global.translate('Credit cards list')}
        </span>
      </WelcomeBar>
      <GoBack onClickHandler={onClickHandler} />
      <div className={classes.CardList}>
        <Segment>
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
              <Segment>
                <Link
                  to={{
                    pathname: '/credit-card-details',
                    state: { wallet },
                  }}
                >
                  <Grid>
                    <Grid.Column mobile={16} tablet={10} computer={6}>
                      {wallet.cardFace === 'recto' && (
                        <CardFront wallet={wallet} />
                      )}
                      {wallet.cardFace === 'verso' && (
                        <CardBack wallet={wallet} />
                      )}
                    </Grid.Column>
                    <Grid.Column mobile={6} tablet={4} computer={2}>
                      <CardMiniFront
                        wallet={wallet}
                        onClick={e =>
                          handleSetCardFace(
                            e,
                            wallet.CardNumber,
                            'recto',
                          )
                        }
                      />
                      <CardMiniBack
                        wallet={wallet}
                        onClick={e =>
                          handleSetCardFace(
                            e,
                            wallet.CardNumber,
                            'verso',
                          )
                        }
                      />
                    </Grid.Column>
                    <Details wallet={wallet} />
                  </Grid>
                </Link>
              </Segment>
            ))
          )}
        </Segment>
      </div>
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
