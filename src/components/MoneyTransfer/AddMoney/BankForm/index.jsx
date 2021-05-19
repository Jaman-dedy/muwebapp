import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import InfoMessage from 'components/common/Alert/InfoMessage';

import './style.scss';

const TopUpFromBankForm = ({ onChange, form, setStep }) => {
  const [bankOptions, setBankOptions] = useState([]);
  const [showSameCurrencyError, setShowCurrencyError] = useState(
    false,
  );

  const dispatch = useDispatch();

  const { linkedBankAccounts } = useSelector(
    ({ walletsAndBanks }) => walletsAndBanks,
  );

  useEffect(() => {
    if (Array.isArray(linkedBankAccounts?.data)) {
      setBankOptions(
        linkedBankAccounts?.data?.map(bank => ({
          key: bank?.AccountNumber,
          text: `${bank?.BankName} (${bank?.AccountNumber}) ${bank.Currency}`,
          value: bank,
        })),
      );
    }
  }, [linkedBankAccounts?.data]);

  useEffect(() => {
    if (form?.bankAccount) {
      setShowCurrencyError(
        form?.bankAccount?.Currency !== form?.WalletCurrency,
      );
    }
  }, [form?.bankAccount?.Currency, form?.WalletCurrency]);

  return (
    <div className="bank-form">
      <Form>
        <Form.Field>
          <label>{global.translate('Select a bank account')}</label>
          <Form.Dropdown
            options={bankOptions}
            onChange={onChange}
            value={form?.bankAccount}
            selection
            loading={linkedBankAccounts?.loading}
            placeholder={global.translate('Select a bank account')}
            name="bankAccount"
          />
        </Form.Field>
        <Form.Field>
          <div className="wrap-money-input">
            <div>{global.translate('Amount', 116)}</div>
            <div className="money-input">
              <Input
                type="number"
                name="amount"
                placeholder={global.translate('Amount', 116)}
                onChange={onChange}
                value={form.amount || null}
              />
              <span>{form?.bankAccount?.Currency}</span>
            </div>
          </div>
        </Form.Field>
        {showSameCurrencyError && (
          <InfoMessage
            className="bank-form__info-message"
            description={`${global.translate(
              'Please select a bank account that uses ',
            )} ${form?.WalletCurrency} ${global.translate(
              'currency or change the target wallet.',
            )}.`}
          />
        )}

        <div className="bank-form__actions">
          <Button basic onClick={() => setStep(1)}>
            {global.translate('Back')}
          </Button>
          <Button
            className="btn--confirm"
            onClick={() => setStep(3)}
            disabled={
              !form?.amount ||
              !form?.bankAccount ||
              showSameCurrencyError
            }
          >
            {global.translate('Next')}
          </Button>
        </div>
      </Form>
    </div>
  );
};

TopUpFromBankForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  form: PropTypes.objectOf({
    amount: PropTypes.string.isRequired,
    selectedBank: PropTypes.objectOf(PropTypes.any).isRequired,
  }).isRequired,
};

export default TopUpFromBankForm;
