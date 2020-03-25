import React from 'react';
import {
  Card,
  Image,
  Button,
  List,
  Segment,
  Modal,
} from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Thumbnail from 'components/common/Thumbnail';
import countries from 'utils/countries';

const TransactionDetails = ({ item, open, setOpen }) => {
  return (
    <Modal size="tiny" open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Transaction to {item.PhoneNumber}</Modal.Header>
      <Modal.Content>
        <Card.Content>
          <Thumbnail
            style={{ height: 40, width: 40, float: 'right' }}
            floated="right"
            name={item.FirstName}
            secondName={item.LastName}
            size="mini"
          />
        </Card.Content>
        {item.FirstName} {item.LastName}
        <small>{moment(new Date()).format('YYYY/MM/DD')}</small>
        <List divided verticalAlign="middle" size="large">
          <List.Item>
            <List.Content floated="right">
              {item.SourceAmount}
            </List.Content>

            <List.Content>Transfer Amount</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="right">
              {item.PhoneNumber}
            </List.Content>

            <List.Content>Recipient Phone Number</List.Content>
          </List.Item>

          <List.Item>
            <List.Content floated="right">
              {item &&
                item.CountryCode &&
                countries.find(
                  country =>
                    country.key.toUpperCase() === item.CountryCode,
                ).text}
            </List.Content>

            <List.Content>Recipient Country</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="right">
              {item.DestCurrency}
            </List.Content>

            <List.Content>Recipient Currency</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="right">
              {item.DisplayTransferNumber}
            </List.Content>

            <List.Content>Transfer Number</List.Content>
          </List.Item>

          <List.Item>
            <List.Content floated="right">
              {item.DisplaySecurityCode}
            </List.Content>

            <List.Content>Transfer Number</List.Content>
          </List.Item>

          <List.Item>
            <List.Content floated="right">
              {item.SourceAccountNumber}
            </List.Content>

            <List.Content>Source Wallet</List.Content>
          </List.Item>
        </List>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Edit
            </Button>
            <Button basic color="red">
              Cancel
            </Button>
          </div>
        </Card.Content>
      </Modal.Content>
    </Modal>
  );
};

export default TransactionDetails;
