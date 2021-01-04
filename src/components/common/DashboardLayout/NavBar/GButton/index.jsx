/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {
  Button,
  Segment,
  TransitionablePortal,
  List,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const GButton = ({
  goToSendMoney,
  goToQuickPay,
  goToGetPaid,
  goToSendCash,
  goToSendVoucher,
}) => {
  return (
    <div>
      <TransitionablePortal
        closeOnTriggerClick
        openOnTriggerClick
        trigger={
          <Button
            style={{ backgroundColor: '#D0342F' }}
            content={global.translate('Transfer Money', 674)}
          />
        }
      >
        <Segment
          style={{
            left: '20%',
            position: 'fixed',
            top: '-6px',
            zIndex: 1000,
            width: '290px',
          }}
        >
          <List selection verticalAlign="middle" divided>
            <List.Item>
              <Icon name="sync" />
              <List.Content onClick={goToSendMoney}>
                <List.Header>Transfer Money</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="dollar sign" />
              <List.Content onClick={goToQuickPay}>
                <List.Header>
                  {global.translate('Quick pay')}
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="qrcode" />
              <List.Content onClick={goToGetPaid}>
                <List.Header>
                  {global.translate('Get Paid', 482)}
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="money bill alternate" />
              <List.Content onClick={goToSendCash}>
                <List.Header>
                  {global.translate('Send Cash', 1948)}
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="gift" />
              <List.Content onClick={goToSendVoucher}>
                <List.Header>
                  {global.translate('Send Voucher')}
                </List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </TransitionablePortal>
    </div>
  );
};
GButton.propTypes = {
  goToSendMoney: PropTypes.func.isRequired,
  goToQuickPay: PropTypes.func.isRequired,
  goToGetPaid: PropTypes.func.isRequired,
  goToSendCash: PropTypes.func.isRequired,
  goToSendVoucher: PropTypes.func.isRequired,
};
export default GButton;
