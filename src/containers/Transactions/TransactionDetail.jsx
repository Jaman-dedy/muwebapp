import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TransactionDetailComponent from 'components/Transactions/TransactionDetails';
import modifyCash from 'redux/actions/moneyTransfer/modifyCash';

const Transactions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [transactionData, setTransactionData] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [phoneValue, setPhoneValue] = useState();
  const [form, setForm] = useState({});
  const [openEditTransaction, setOpenEditTransaction] = useState(
    false,
  );
  const item = location?.state?.item;
  const selectedCard = location?.state?.selectedCard;
  const onOptionChange = ({ target: { value, name } }) => {
    setForm({ ...form, [name]: value });
  };
  const {
    loading: updating,
    data: updatingData,
    error: updatingError,
  } = useSelector(state => state.transactions.modifyCash);

  useEffect(() => {
    if (updatingData) {
      setOpenEditTransaction(false);
      setForm({
        ...form,
        FirstName: updatingData.requestData.FirstName,
        LastName: updatingData.requestData.LastName,
      });
      setPhoneValue(updatingData.requestData.TargetPhoneNumber);
    }
  }, [updatingData]);

  useEffect(() => {
    if (item && selectedCard !== 1) {
      setForm({
        ...form,
        SecurityCode: item.SecurityCode,
        VoucherNumber: item.TransferNumber,
        CountryCode: item.CountryCode,
        FirstName: item.FirstName || item.Recipient.FirstName,
        LastName: item.LastName || item.Recipient.LastName,
      });
    }
  }, []);
  if (item) {
    const data = {
      item,
      selectedCard,
    };
    localStorage.setItem('detailTransaction', JSON.stringify(data));
  }

  if (!item) {
    const data = localStorage.getItem('detailTransaction');
    const newData = JSON.parse(data);
    if (!transactionData) {
      setTransactionData(newData.item);
      setCardNumber(newData.selectedCard);
    }
  }
  const { digit0, digit1, digit2, digit3 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;
  const modifyOneTransaction = () => {
    modifyCash({
      PIN,
      SecurityCode: form.SecurityCode,
      VoucherNumber: form.VoucherNumber,
      TargetPhoneNumber: phoneValue && phoneValue,
      FirstName: form.FirstName,
      LastName: form.LastName,
      CountryCode: form.CountryCode,
    })(dispatch);
  };

  return (
    <TransactionDetailComponent
      item={item || transactionData}
      selectedCard={selectedCard || cardNumber}
      phoneValue={phoneValue}
      setPhoneValue={setPhoneValue}
      modifyOneTransaction={modifyOneTransaction}
      form={Object.keys(form).length && form}
      onOptionChange={onOptionChange}
      updating={updating}
      updatingData={updatingData}
      updatingError={updatingError && updatingError?.[0]}
      openEditTransaction={openEditTransaction}
      setOpenEditTransaction={setOpenEditTransaction}
    />
  );
};

export default Transactions;
