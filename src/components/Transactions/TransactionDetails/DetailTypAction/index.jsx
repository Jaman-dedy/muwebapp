import React from 'react';
import { Image, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import transactionTypeImg from 'assets/images/transactions/transaction-type.svg';
import displayTransactionType from './helperTransactionTypes';
import './style.scss';
import EditTransaction from '../EditTransaction';

const DetailTypeAction = ({
  item,
  selectedCard,
  setPhoneValue,
  phoneValue,
  onOptionChange,
  form,
  modifyOneTransaction,
  updatingError,
  updating,
  updatingData,
  openEditTransaction,
  setOpenEditTransaction,
}) => {
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
          <Button onClick={() => setOpenEditTransaction(true)}>
            {global.translate('Edit')}
          </Button>
        )}
      </div>
      <EditTransaction
        setOpen={setOpenEditTransaction}
        open={openEditTransaction}
        phoneValue={phoneValue}
        setPhoneValue={setPhoneValue}
        item={item}
        onOptionChange={onOptionChange}
        form={form}
        modifyOneTransaction={modifyOneTransaction}
        updating={updating}
        updatingData={updatingData}
        updatingError={updatingError}
      />
    </div>
  );
};
DetailTypeAction.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  selectedCard: PropTypes.number,
  setPhoneValue: PropTypes.func,
  phoneValue: PropTypes.string,
  onOptionChange: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.objectOf(PropTypes.any),
  modifyOneTransaction: PropTypes.func,
  updatingError: PropTypes.objectOf(PropTypes.any),
  updating: PropTypes.bool,
  updatingData: PropTypes.objectOf(PropTypes.any),
  openEditTransaction: PropTypes.bool,
  setOpenEditTransaction: PropTypes.func,
};
DetailTypeAction.defaultProps = {
  item: {},
  selectedCard: 1,
  setPhoneValue: () => {},
  phoneValue: '',
  onOptionChange: {},
  form: {},
  modifyOneTransaction: () => {},
  updatingError: {},
  updating: PropTypes.bool,
  updatingData: {},
  openEditTransaction: PropTypes.bool,
  setOpenEditTransaction: () => {},
};
export default DetailTypeAction;
