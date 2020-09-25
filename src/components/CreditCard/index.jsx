import React from 'react';
import propTypes from 'prop-types';
import Wrapper from 'hoc/Wrapper';
import GetCardOptions from './getOptions';

const CreditCard = ({
  getCardOptions,
  addCreditCardModalOpen,
  setAddCreditCardModalOpen,
  setForm,
}) => {
  return (
    <Wrapper>
      <GetCardOptions
        getCardOptions={getCardOptions}
        addCreditCardModalOpen={addCreditCardModalOpen}
        setAddCreditCardModalOpen={setAddCreditCardModalOpen}
        setForm={setForm}
      />
    </Wrapper>
  );
};
CreditCard.propTypes = {
  getCardOptions: propTypes.instanceOf(Object).isRequired,
  addCreditCardModalOpen: propTypes.bool.isRequired,
  setAddCreditCardModalOpen: propTypes.func.isRequired,
  setForm: propTypes.func,
};
CreditCard.defaultProps = {
  setForm: () => {},
};

export default CreditCard;
