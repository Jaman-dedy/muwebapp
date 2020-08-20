import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import Message from 'components/common/Message';
import ReusableDropdown from 'components/common/Dropdown/ReusableDropdown';

import classes from './AddVirtualCardModal.module.scss';

const AddVirtualCard = ({
  open,
  size,
  setOpen,
  currencies,
  onOptionsChange,
  onAddVirtualCard,
  selectedCurrency,
  setSelectedCurrency,
  selectedCard,
  setSelectedCard,
  virtualCardTypes,
  errors,
  setErrors,
  addVirtualCard,
}) => {
  const currencyOption = [];
  if (currencies?.data?.length) {
    currencies.data.map((currency, index) => {
      return currencyOption.push({
        key: index,
        Title: currency.CurrencyCode,
        value: currency.CurrencyCode,
        Img: currency.Flag,
      });
    });
  }
  return (
    <div className={classes.Container}>
      <Modal
        size={size}
        open={open}
        closeOnDocumentClick={false}
        closeOnDimmerClick={false}
        onClose={() => setOpen(false)}
      >
        <Modal.Header style={{ textAlign: 'center' }}>
          {global.translate(`Add a new virtual card`)}
        </Modal.Header>
        <Modal.Content>
          <div style={{ width: '60%', margin: 'auto' }}>
            <span>
              {' '}
              {global.translate(`Select a currency`, 1307)}
            </span>
            <ReusableDropdown
              customstyle
              search
              currentOption={selectedCurrency && selectedCurrency}
              setCurrentOption={setSelectedCurrency}
              options={currencyOption.length && currencyOption}
              placeholder="Currency"
              onChange={e => {
                onOptionsChange(e, {
                  name: 'CurrencyCode',
                  value: e.target.value,
                });
              }}
            />
          </div>
          <br />
          <div style={{ width: '60%', margin: 'auto' }}>
            <span>
              {global.translate(`Select the virtual card type`)}
            </span>
            <ReusableDropdown
              customstyle
              fluid
              currentOption={selectedCard && selectedCard}
              setCurrentOption={setSelectedCard}
              selection
              wrapSelection={false}
              options={virtualCardTypes && virtualCardTypes}
              placeholder="Virtual card type"
              onChange={e => {
                onOptionsChange(e, {
                  name: 'VirtualCard',
                  value: e.target.value,
                });
              }}
            />
            {errors && <Message message={errors} />}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={addVirtualCard && addVirtualCard.loading}
            onClick={() => {
              setOpen(false);
              setSelectedCard(null);
              setSelectedCurrency(null);
              setErrors(null);
            }}
            neg
            basic
            color="red"
            ative
          >
            Cancel
          </Button>
          <Button
            loading={addVirtualCard && addVirtualCard.loading}
            positive
            content="Add"
            onClick={() => onAddVirtualCard()}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

AddVirtualCard.propTypes = {
  open: PropTypes.bool,
  size: PropTypes.string.isRequired,
  setOpen: PropTypes.func,
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func,
  onAddVirtualCard: PropTypes.func,
  selectedCurrency: PropTypes.string.isRequired,
  selectedCard: PropTypes.string.isRequired,
  setSelectedCurrency: PropTypes.func,
  setSelectedCard: PropTypes.func,
  virtualCardTypes: PropTypes.instanceOf(Array).isRequired,
  errors: PropTypes.string,
  setErrors: PropTypes.func,
  addVirtualCard: PropTypes.objectOf(PropTypes.any).isRequired,
};

AddVirtualCard.defaultProps = {
  open: false,
  setOpen: () => {},
  onOptionsChange: () => {},
  onAddVirtualCard: () => {},
  setSelectedCurrency: () => {},
  setSelectedCard: () => {},
  errors: '',
  setErrors: () => {},
};

export default AddVirtualCard;
