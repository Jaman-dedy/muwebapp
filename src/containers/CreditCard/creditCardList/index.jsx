/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreditCardList from 'components/CreditCard/creditCardList';
import getCreditCards from 'redux/actions/credit-card/getCreditCards';

const CreditCardListContainer = () => {
  const dispatch = useDispatch();
  const { creditCardList } = useSelector(
    ({ creditCard }) => creditCard,
  );
  const fetchCreditCardList = () => {
    getCreditCards()(dispatch);
  };
  useEffect(() => {
    if (!creditCardList.data) {
      fetchCreditCardList();
    }
  }, []);
  return (
    <CreditCardList
      creditCardList={creditCardList?.data}
      loading={creditCardList.loading}
    />
  );
};
export default CreditCardListContainer;
