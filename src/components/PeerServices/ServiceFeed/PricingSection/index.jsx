/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import PriceItem from './PriceItem';
import './style.scss';

const PricingSection = ({ service, onStartChatClick }) => {
  const { data: user } = useSelector(state => state.user.userData);
  return (
    <>
      {' '}
      <div className="header-segment">
        {' '}
        <p className="price">{global.translate('Price')}</p>
      </div>
      {service?.PriceList?.length < 1 ? (
        <Segment placeholder id="no-pricing-available">
          <Header icon>
            <Icon name="money bill alternate" />
            {global.translate('No pricing options available')}
          </Header>
          <Button color="orange" basic onClick={onStartChatClick}>
            {user?.PID === service.Owner.OwnerPID
              ? global.translate('Add Pricing')
              : global.translate('DM for Prices')}
          </Button>
        </Segment>
      ) : (
        <div className="prices-lists">
          {service?.PriceList?.map((item, index) => (
            <PriceItem {...item} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

PricingSection.propTypes = {
  service: PropTypes.objectOf(PropTypes.any).isRequired,
  onStartChatClick: PropTypes.func.isRequired,
};

export default PricingSection;
