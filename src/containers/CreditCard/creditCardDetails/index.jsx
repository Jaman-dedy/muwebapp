import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import CreditCardDetails from 'components/CreditCard/creditCardDetails';
import getCreditCards from 'redux/actions/credit-card/getCreditCards';
import creditCardDetails from './creditCardDetails';

const CreditCardDetailsContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [currentWallet, setCurrentWallet] = useState(null);
  const {
    creditCardList,
    activateCreditCard,
    enableCreditCard,
  } = useSelector(({ creditCard }) => creditCard);
  const { wallet } = location.state;

  // console.log('wallet', wallet);
  console.log('creditCardList?.data', creditCardList);

  // const fetchCreditCardList = () => {
  //   getCreditCards()(dispatch);
  // };
  useEffect(() => {
    if (!creditCardList.data) {
      setCurrentWallet(wallet);
      getCreditCards()(dispatch);
    }
  }, []);
  useEffect(() => {
    if (creditCardList?.data) {
      creditCardList.data.map(item => {
        if (item.CardNumber === location.state.wallet.CardNumber) {
          setCurrentWallet(item);
        }
      });
    }
  }, [creditCardList.data]);

  useEffect(() => {
    if (creditCardList.data) {
      creditCardList.data.map(item => {
        if (item.CardNumber === location.state.wallet.CardNumber) {
          setCurrentWallet({
            ...item,
            levelBackColor: location.state.wallet.levelBackColor,
            levelColor: location.state.wallet.levelColor,
          });
        }
      });
    }
  }, [activateCreditCard.data, enableCreditCard.data]);
  console.log('currentWallet', currentWallet);
  return (
    <CreditCardDetails
      creditCardDetails={creditCardDetails(currentWallet || wallet)}
    />
  );
};

export default CreditCardDetailsContainer;
