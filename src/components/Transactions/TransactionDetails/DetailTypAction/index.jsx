import React from 'react';
import { Image, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import transactionTypeImg from 'assets/images/transactions/transaction-type.svg';
import displayTransactionType from './helperTransactionTypes';
import './style.scss';

const DetailTypeAction = ({ item, selectedCard }) => {
  const history = useHistory();
  return (
    <div className="transaction-type">
      <div className="type-description">
        <Image src={transactionTypeImg} />
        <span>
          {selectedCard === 1 &&
            displayTransactionType(item?.TransactionType).Description}
          {selectedCard === 2 &&
            global.translate('Pending cash sent')}
          {selectedCard === 3 && global.translate('Pending voucher')}
          {selectedCard === 4 &&
            global.translate('External transfer')}
        </span>
      </div>
      <div>
        {selectedCard === 1 &&
          displayTransactionType(item?.TransactionType).Action && (
            <Button
              onClick={() =>
                history.push(
                  displayTransactionType(item?.TransactionType)
                    .PathName,
                )
              }
            >
              {displayTransactionType(item?.TransactionType).Action}
            </Button>
          )}
        {selectedCard !== 1 && (
          <Button>{global.translate('Edit')}</Button>
        )}
      </div>
    </div>
  );
};
DetailTypeAction.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  selectedCard: PropTypes.number,
};
DetailTypeAction.defaultProps = {
  item: {},
  selectedCard: 1,
};
export default DetailTypeAction;
