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
      <Grid.Column mobile={14} tablet={7} computer={4}>
        <div className={classes.DetailsLeft}>
          <List>
            <List.Item
              icon="address card"
              content={
                (wallet && wallet.WalletNumber) ||
                wallet.AccountNumber
              }
            />
            <List.Item>
              <List.Icon name="credit card outline" />
              <List.Content>
                <strong>CVV : </strong> {wallet && wallet.CVV}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="calendar alternate outline" />
              <List.Content>
                <strong>
                  {global.translate(`Expiration date`)} :
                </strong>{' '}
                {wallet && `${wallet.MM}/${wallet.YYYY}`}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="calendar alternate outline" />
              <List.Content>
                <strong>{global.translate(`Creation date`)} :</strong>{' '}
                {formatedCreationDate}
              </List.Content>
            </List.Item>
          </List>
        </div>
      </Grid.Column>
      <Grid.Column mobile={14} tablet={7} computer={4}>
        <div className={classes.DetailsRight}>
          <List>
            <List.Item>
              <List.Icon name="usd" />
              <List.Content>
                <strong>
                  {global.translate(`Last operation amount`)} :{' '}
                </strong>{' '}
                <br />
                {wallet &&
                  `${wallet.LastOperationAmount} ${
                    wallet.Currency
                      ? wallet.Currency
                      : wallet.CurrencyCode
                  }`}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="usd" />
              <List.Content>
                <strong>
                  {global.translate(`Last operation date`)} :
                </strong>{' '}
                {formatedLastODate}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="chart line" />
              <List.Content>
                <strong>{wallet && wallet.MonthlyLImitText}: </strong>{' '}
                {wallet && wallet.MonthlyLimit}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="chart line" />
              <List.Content>
                <strong>{wallet && wallet.MonthlyFeesText}: </strong>{' '}
                {wallet && wallet.MonthlyFees}
              </List.Content>
            </List.Item>
          </List>
        </div>
      </Grid.Column>
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
