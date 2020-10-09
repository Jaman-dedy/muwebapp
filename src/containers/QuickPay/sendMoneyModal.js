import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moveFunds, {
  clearMoveFundsErrors,
} from 'redux/actions/moneyTransfer/moveFunds';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';

export default ({
  form,
  setForm,
  confirmationData,
  openModal,
  setOpenModal,
  step,
  errors,
  setErrors,
  countryCode,
  locateUser,
  isUsingDefaultWallet,
  setResult,
}) => {
  const dispatch = useDispatch();
  const { loading, error: moveFundError, data } = useSelector(
    state => state.moneyTransfer.moveFundsTo2UWallet,
  );
  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const resetState = () => {
    clearMoveFundsErrors()(dispatch);
    updateMoneyTransferStep(1)(dispatch);
  };
  useEffect(() => {
    setForm({ ...form, isRecurring: false });
    setForm({ ...form, sendNow: true });
  }, [confirmationData]);

  const { digit0, digit1, digit2, digit3 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;

  const pinIsValid = () => PIN.length === 4;
  const moveFundsToToUWallet = () => {
    const Amount = form?.Amount.replace(/,/g, '');
    const data = {
      PIN,
      CountryCode: countryCode,
      Amount: Amount.toString(),
      ContactPID: locateUser?.PID,
      UseDefaultWallet: isUsingDefaultWallet() ? 'YES' : 'No',
      TargetWallet: form?.AccountNumber,
      SourceWallet: form.SourceWallet,
      DateFrom: (form.isRecurring && form.startDate) || '',
      DateTo: (form.isRecurring && form.endDate) || '',
      Day: form.isRecurring ? form.day && form.day.toString() : '0',
      Reccurent: form.isRecurring ? 'YES' : 'No',
      SendNow: form.sendNow ? 'YES' : 'No',
      Reference: form.reference || '',
      Description: form.description || '',
    };

    if (!pinIsValid()) {
      setErrors(
        global.translate('Please provide your PIN number.', 543),
      );
      return;
    }
    if (form.isRecurring) {
      if (form.day === '' || !form.day) {
        setErrors(
          global.translate(
            'Please provide the payment day of the month.',
            1290,
          ),
        );
        return;
      }
      if (form.startDate === '' || !form.startDate) {
        setErrors(
          global.translate('Please provide the starting date', 1288),
        );
        return;
      }
      if (form.endDate === '' || !form.endDate) {
        setErrors(
          global.translate('Please provide the ending date', 1289),
        );
        return;
      }

      if (form.endDate <= form.startDate) {
        setErrors(
          global.translate(
            'Please choose an end date thats later than the start date',
            2076,
          ),
        );
        return;
      }
    }
    setErrors(null);
    moveFunds(data)(dispatch);
  };
  useEffect(() => {
    if (data && data[0]) {
      setForm({
        ...form,
        Amount: '',
        digit0: '',
        digit1: '',
        digit2: '',
        digit3: '',
      });
      setErrors(null);
      setOpenModal(false);
      resetState();
      clearFoundUser()(dispatch);
      setResult(null);
    }
  }, [data]);
  return {
    form,
    confirmationData,
    openModal,
    setOpenModal,
    step,
    onOptionsChange,
    moveFundsToToUWallet,
    resetState,
    loading,
    errors,
    moveFundError,
  };
};
