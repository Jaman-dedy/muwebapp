/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Form, Label, Input } from 'semantic-ui-react';

import visaCard from 'assets/images/visa-card.png';
import masterCard from 'assets/images/mastercard.png';
import discover from 'assets/images/discover-card.png';

const CreditCardNumberInput = ({
  addMoneyFromCreditCard,
  handleInputChange,
  errors,
  inputValue,
}) => {
  const [creditCardType, setCreditCardType] = useState(visaCard);
  const [creditCardNumber, setCreditCardNumber] = useState({
    number1: '',
    number2: '',
    number3: '',
    number4: '',
    restored: false,
  });

  const refs = {
    number1: useRef(null),
    number2: useRef(null),
    number3: useRef(null),
    number4: useRef(null),
  };

  useEffect(() => {
    if (inputValue.length === 0) {
      setCreditCardType(visaCard);
      setCreditCardNumber({
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        restored: false,
      });
    } else {
      setCreditCardNumber({
        number1: inputValue.slice(0, 4),
        number2: inputValue.slice(4, 8),
        number3: inputValue.slice(8, 12),
        number4: inputValue.slice(12, 16),
        restored: false,
      });
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    const nextRefIndex = parseInt(name.slice(-1), 10) + 1;

    if (value.length < 5) {
      if (value.length === 4 && nextRefIndex <= 4)
        refs[`number${nextRefIndex}`].current.focus();
      setCreditCardNumber({
        ...creditCardNumber,
        restored: false,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (
      addMoneyFromCreditCard.success &&
      !creditCardNumber.restored
    ) {
      setCreditCardNumber({
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        restored: true,
      });
      return;
    }

    const { number1, number2, number3, number4 } = creditCardNumber;

    const CardNumber = `${number1}${number2}${number3}${number4}`;
    switch (CardNumber[0]) {
      case '4':
        setCreditCardType(visaCard);
        break;
      case '5':
        setCreditCardType(masterCard);
        break;
      case '6':
        setCreditCardType(discover);
        break;
      default:
        break;
    }
    handleInputChange({
      target: { name: 'CardNumber', value: CardNumber },
    });
  }, [creditCardNumber, addMoneyFromCreditCard]);

  return (
    <>
      <div className="card-number">
        <Input
          error={false}
          type="number"
          name="number1"
          ref={refs.number1}
          value={creditCardNumber.number1}
          onChange={handleChange}
          required
          maxLength={4}
          width={3}
        />
        <Input
          error={false}
          type="number"
          name="number2"
          ref={refs.number2}
          value={creditCardNumber.number2}
          onChange={handleChange}
          required
          maxLength={4}
          width={3}
        />
        <Input
          error={false}
          type="number"
          name="number3"
          ref={refs.number3}
          value={creditCardNumber.number3}
          onChange={handleChange}
          required
          maxLength={4}
          width={3}
        />
        <Input
          error={false}
          type="number"
          name="number4"
          ref={refs.number4}
          value={creditCardNumber.number4}
          onChange={handleChange}
          required
          maxLength={4}
          width={3}
        />
        <div className="credit-card-type">
          <Image src={creditCardType} />
        </div>
      </div>
      {errors.CardNumber && (
        <Form.Field style={{ marginTop: '-7px' }}>
          <Label pointing prompt>
            {errors.CardNumber}
          </Label>
        </Form.Field>
      )}
    </>
  );
};

CreditCardNumberInput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object),
  addMoneyFromCreditCard: PropTypes.instanceOf(Object),
  inputValue: PropTypes.string,
};

CreditCardNumberInput.defaultProps = {
  errors: {},
  addMoneyFromCreditCard: {},
  inputValue: '',
};

export default CreditCardNumberInput;
