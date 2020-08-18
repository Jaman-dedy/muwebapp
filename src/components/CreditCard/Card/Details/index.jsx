import React from 'react';
import propTypes from 'prop-types';
import { List, Grid } from 'semantic-ui-react';
import Wrapper from 'hoc/Wrapper';
import formatDate from 'utils/formatDate';
import classes from './Details.module.scss';

const Details = ({ wallet }) => {
  const creationDate = wallet?.CreationDate;
  const lastODate = wallet?.LastOperationDate;
  const language = localStorage.getItem('language') || 'en';
  const formatedCreationDate = formatDate(creationDate, language);
  const formatedLastODate = formatDate(lastODate, language);
  return (
    <Wrapper>
      <div className={classes.WrapCardDetails}>
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <List>
            <List.Item
              content={
                (wallet && wallet.WalletNumber) ||
                wallet.AccountNumber
              }
            />
            <List.Item>
              <List.Content>
                CVV: <strong>{wallet && wallet.CVV}</strong>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {global.translate(`Expiration date`)} :{' '}
                <strong>
                  {wallet && `${wallet.MM}/${wallet.YYYY}`}
                </strong>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {global.translate(`Creation date`)}:{' '}
                <strong>{formatedCreationDate}</strong>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {global.translate(`Last operation amount`)}:{' '}
                <strong>
                  {wallet &&
                    `${wallet.LastOperationAmount} ${
                      wallet.Currency
                        ? wallet.Currency
                        : wallet.CurrencyCode
                    }`}
                </strong>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {global.translate(`Last operation date`)}:{' '}
                <strong>{formatedLastODate}</strong>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {wallet && wallet.MonthlyLImitText}:{' '}
                <strong>{wallet && wallet.MonthlyLimit}</strong>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                {wallet && wallet.MonthlyFeesText}:{' '}
                <strong>{wallet && wallet.MonthlyFees}</strong>
              </List.Content>
            </List.Item>
          </List>
        </Grid.Column>
      </div>
    </Wrapper>
  );
};
Details.propTypes = {
  wallet: propTypes.instanceOf(Object).isRequired,
};
Details.defaultProp = {
  language: localStorage.getItem('language') || 'en',
};
export default Details;
