import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';
import Img from 'components/Chat/ChatMessage/Img';
import { formatDate } from 'utils/formatDate';

const DetailsBody = ({
  item,
  selectedCard,
  updatingData,
  withdraw,
}) => {
  const newDate = item?.Date?.substring(0, 11);
  const newTime = item?.Date?.substring(11) || '';

  const displayUserNames = () => {
    if (selectedCard === 1) {
      return {
        FirstName: item?.isOnStore
          ? item?.Recipient?.FirstName
          : item?.ContactFirstName,
        LastName: item?.isOnStore
          ? item?.Recipient?.LastName
          : item?.ContactLastName,
      };
    }
    if (selectedCard === 2) {
      return {
        FirstName:
          updatingData?.requestData?.FirstName || item?.FirstName,
        LastName:
          updatingData?.requestData?.LastName || item?.LastName,
      };
    }
    if (selectedCard === 3) {
      return {
        FirstName: item?.Recipient?.FirstName,
        LastName: item?.Recipient?.LastName,
      };
    }
    if (selectedCard === 4) {
      return {
        FirstName:
          updatingData?.requestData?.FirstName || item?.FirstName,
        LastName:
          updatingData?.requestData?.LastName || item?.LastName,
      };
    }
  };
  const displayUserPicture = () => {
    if (selectedCard === 1) {
      return {
        PictureUrl: item?.ContactPictureURL,
      };
    }
    if (selectedCard === 2) {
      return {
        PictureUrl: item?.DestPictureURL,
      };
    }
    if (selectedCard === 3) {
      return {
        PictureUrl: item?.Recipient?.PictureURL,
      };
    }
    if (selectedCard === 4) {
      return {
        PictureUrl: item?.DestPictureURL,
      };
    }
  };
  const displayAmounts = () => {
    if (selectedCard === 1 || selectedCard === 3) {
      return {
        Amount: item?.Amount,
        Currency: item?.Currency,
      };
    }
    if (selectedCard === 2) {
      return {
        Amount: item?.DestAmount || item?.AmountSent,
        Currency: item?.DestCurrency || '',
      };
    }
    if (selectedCard === 4) {
      return {
        Amount: item?.DestAmount,
        Currency: '',
      };
    }
  };
  const displayPhoneNumber = () => {
    if (selectedCard === 1) {
      return item?.ContactPhone;
    }
    if (selectedCard === 2) {
      return (
        updatingData?.requestData?.TargetPhoneNumber ||
        `${item?.PhonePrefix} ${item?.Phone}`
      );
    }
    if (selectedCard === 3) {
      if (item?.Recipient?.Prefix) {
        return `${item?.Recipient?.Prefix} ${item?.Recipient?.Phone}`;
      }
      return '';
    }
    if (selectedCard === 4) {
      return (
        updatingData?.requestData?.TargetPhoneNumber ||
        `${item?.PhonePrefix} ${item?.Phone}`
      );
    }
  };

  return (
    <div className="details-body">
      <Table basic>
        <Table.Body>
          {!withdraw && (
            <Table.Row>
              <div className="table-headings">
                <div className="recipient">
                  {global.translate('Recipient')}
                </div>
                <div className="user-details">
                  <Img
                    src={displayUserPicture().PictureUrl}
                    compress
                    format="png"
                    height={50}
                    width={50}
                    hasError
                  />
                  <div className="names-phones">
                    <div>{`${displayUserNames().FirstName} ${
                      displayUserNames().LastName
                    }`}</div>
                    <span>{displayPhoneNumber()}</span>
                  </div>
                </div>
              </div>
            </Table.Row>
          )}

          <Table.Row>
            <Table.Cell>
              <div className="amount">
                <div>{global.translate('Amount')}</div>
                <div>{`${displayAmounts().Amount} ${
                  displayAmounts().Currency
                }`}</div>
              </div>
            </Table.Cell>
            <Table.Cell textAlign="right" />
          </Table.Row>
          {item?.ExchangeFees && (
            <Table.Row>
              <Table.Cell>
                <div className="details-data">
                  {global.translate('External fees')}
                </div>
              </Table.Cell>
              <Table.Cell textAlign="right">
                {item?.ExchangeFees}
              </Table.Cell>
            </Table.Row>
          )}
          {item?.ExchangeFees && (
            <Table.Row>
              <Table.Cell>
                <div className="details-data">
                  {global.translate('Exchange fees')}
                </div>{' '}
              </Table.Cell>
              <Table.Cell textAlign="right">
                {item?.ExchangeFees}
              </Table.Cell>
            </Table.Row>
          )}
          {(item?.DisplayTransferNumber || item?.TransferNumber) && (
            <Table.Row>
              <Table.Cell>
                {' '}
                <div className="details-data">
                  {global.translate('Transfer number')}
                </div>{' '}
              </Table.Cell>
              <Table.Cell textAlign="right">
                {item?.DisplayTransferNumber || item?.TransferNumber}
              </Table.Cell>
            </Table.Row>
          )}
          {(item?.DisplaySecurityCode || item?.SecurityCode) && (
            <Table.Row>
              <Table.Cell>
                {' '}
                <div className="details-data">
                  {global.translate('Security code')}
                </div>{' '}
              </Table.Cell>
              <Table.Cell textAlign="right">
                {item?.SecurityCode}
              </Table.Cell>
            </Table.Row>
          )}
          {item?.Reference && (
            <Table.Row>
              <Table.Cell>
                {' '}
                <div className="details-data">
                  {global.translate('Reference')}
                </div>{' '}
              </Table.Cell>
              <Table.Cell textAlign="right">
                {item?.Reference}
              </Table.Cell>
            </Table.Row>
          )}

          <Table.Row>
            <Table.Cell>
              {' '}
              <div className="details-data">
                {global.translate('Transfer date')}
              </div>
            </Table.Cell>
            <Table.Cell textAlign="right">
              {moment(formatDate(item?.Date)).format('LL')}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

DetailsBody.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  selectedCard: PropTypes.number,
  updatingData: PropTypes.objectOf(PropTypes.any),
  withdraw: PropTypes.bool,
};
DetailsBody.defaultProps = {
  item: {},
  selectedCard: 1,
  updatingData: {},
  withdraw: false,
};

export default DetailsBody;
