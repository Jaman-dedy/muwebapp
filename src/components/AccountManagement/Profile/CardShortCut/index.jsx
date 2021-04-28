/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SendMoneyIcon from 'assets/images/profile/send-money-icon.svg';
import SendCashIcon from 'assets/images/profile/send-cash-icon.svg';
import CardsIcon from 'assets/images/profile/cards-icon.svg';
import ContactsIcon from 'assets/images/profile/contacts-icon.svg';

import './style.scss';

const CardShortCut = () => {
  const history = useHistory();
  const goToTransferMoney = () => {
    history.push({
      pathname: '/contacts',
      search: '?ref=send-money',
    });
  };
  const goToSendCash = () => {
    history.push({
      pathname: '/contacts',
      search: '?ref=send-cash',
    });
  };
  const goToCards = () => {
    history.push('/credit-cards');
  };
  const goToContacts = () => {
    history.push('/contacts');
  };
  return (
    <div className="short-cut-container">
      <div onClick={goToTransferMoney}>
        <Image src={SendMoneyIcon} centered />{' '}
        <div>{global.translate('Money transfer')}</div>
      </div>
      <div onClick={goToSendCash}>
        <Image src={SendCashIcon} centered />{' '}
        <div>{global.translate('Send cash')}</div>
      </div>
      <div onClick={goToCards}>
        <Image src={CardsIcon} centered />{' '}
        <div>{global.translate('Cards')}</div>
      </div>
      <div onClick={goToContacts}>
        <Image src={ContactsIcon} centered />{' '}
        <div>{global.translate('Contacts')}</div>
      </div>
    </div>
  );
};
CardShortCut.propTypes = {};
CardShortCut.defaultProps = {};

export default CardShortCut;
