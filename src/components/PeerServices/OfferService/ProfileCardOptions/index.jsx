import React from 'react';
import { List, Image, Card, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import WalletIcon from 'assets/images/profilecard/mywallet.svg';
import paybillsIcon from 'assets/images/profilecard/paybills.png';
import SendCashIcon from 'assets/images/profilecard/sendcash.svg';
import SettingsIcon from 'assets/images/profilecard/settings.svg';
import './style.scss';
import { setIsendingCash } from 'redux/actions/dashboard/dashboard';

export default function ProfileCardOptions() {
  const dispatch = useDispatch();
  return (
    <>
      <Card className="profile-options-card">
        <Card.Content id="profile-options-card-content">
          <List>
            <Segment
              basic
              className="item"
              as={Link}
              to="/wallets?referer=marketplace"
              onClick={() => {
                setIsendingCash(dispatch);
              }}
            >
              <Image src={WalletIcon} />
              <List.Content className="item-content">
                {global.translate('My Wallets', 68)}
              </List.Content>
            </Segment>
            <Segment
              basic
              className="item"
              as={Link}
              to="/money-transfer?ref=pay-bills"
            >
              <Image src={paybillsIcon} />
              <List.Content className="item-content">
                {global.translate('Pay Bills', 67)}
              </List.Content>
            </Segment>
            <Segment
              basic
              className="item"
              as={Link}
              to="/contacts?ref=send-cash"
              onClick={() => {
                setIsendingCash(dispatch);
              }}
            >
              <Image src={SendCashIcon} />
              <List.Content className="item-content">
                {global.translate('Send Cash', 915)}
              </List.Content>
            </Segment>
            <Segment
              basic
              className="item"
              as={Link}
              to="/account-management?referer=marketplace"
            >
              <Image src={SettingsIcon} />
              <List.Content className="item-content">
                {global.translate('Manage my account', 1269)}
              </List.Content>
            </Segment>
          </List>
        </Card.Content>
      </Card>
    </>
  );
}

ProfileCardOptions.propTypes = {};
