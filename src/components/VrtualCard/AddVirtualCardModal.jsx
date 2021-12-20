import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import Message from 'components/common/Message';
import ReusableDropdown from 'components/common/Dropdown/ReusableDropdown';

import getUserData from 'redux/actions/users/getUserInfo';
import classes from './AddVirtualCardModal.module.scss';

const AddVirtualCard = ({
  open,
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
  form,
  setForm,
}) => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.user.userData);
  const { data: virtualCards } = useSelector(
    state => state.virtualCard.virtualCardList,
  );

  useEffect(() => {
    if (!data) {
      getUserData()(dispatch);
    }
  }, []);

  const usedCurrencies = virtualCards
    ? virtualCards.map(card => card.Currency)
    : [];
  const currencyOption = [];
  if (currencies?.data?.length) {
    currencies.data.filter((currency, index) => {
      if (usedCurrencies.length) {
        if (!usedCurrencies.includes(currency.CurrencyCode))
          return currencyOption.push({
            key: index,
            Title: currency.CurrencyCode,
            value: currency.CurrencyCode,
            Img: currency.Flag,
          });
      } else {
        return currencyOption.push({
          key: index,
          Title: currency.CurrencyCode,
          value: currency.CurrencyCode,
          Img: currency.Flag,
        });
      }
    });
  }

  return (
    <div className={classes.Container}>
      <Modal
        size="small"
        open={open}
        closeOnDocumentClick={false}
        closeOnDimmerClick={false}
        onClose={() => setOpen(false)}
      >
        <Modal.Header style={{ textAlign: 'center' }}>
          {global.translate(`Add an O-Card`)}
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
              options={currencyOption}
              placeholder={
                currencyOption.length
                  ? global.translate('Currency')
                  : global.translate('No remaining currency', 3013)
              }
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
            <span>{global.translate(`Select the O-Card type`)}</span>
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
              setForm({});
            }}
            neg
            basic
            color="red"
            ative
          >
            Cancel
          </Button>
          <Button
            disabled={!form?.CurrencyCode || !form?.VirtualCard}
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
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  setForm: PropTypes.func.isRequired,
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
