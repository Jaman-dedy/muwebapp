import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import rawCountries from 'utils/countries';
import getBankList from 'redux/actions/walletsAndBanks/getBankList';
import linkBankAccountRequest from 'redux/actions/walletsAndBanks/linkBankAccountRequest';
import selfLinkBankAccount, {
  clearSelfLinkAccount,
} from 'redux/actions/walletsAndBanks/selfLinkBankAccount';
import getLinkedBankAccounts from 'redux/actions/walletsAndBanks/getLinkedBankAccounts';
import unlinkBankAccount from 'redux/actions/walletsAndBanks/unlinkBankAccount';
import linkBankAccount from 'redux/actions/walletsAndBanks/linkBankAccount';
import { bankAccountOptions } from 'constants/general';

const countries = rawCountries.map(({ text, flag, key }) => ({
  CountryName: text,
  Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
  CountryCode: key,
}));

const FORM_VALUES = {
  CountryCode: '',
  BankName: '',
  PhoneNumber: '',
  AccountNumber: '',
  Currency: '',
  AccountName: '',
  BankCode: '',
  BankAddress: '',
  IBAN: '',
  BranchName: '',
  BranchCode: '',
};

export default () => {
  // state declarations
  const [openLinkBankModal, setOpenLinkBankModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentBankOption, setCurrentBankOption] = useState({});
  const [currenciesList, setCurrenciesList] = useState([]);
  const [phones, setPhones] = useState([]);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);
  const [step, setStep] = useState(1);
  const [OTP, setOTP] = useState('');
  const [form, setForm] = useState({ ...FORM_VALUES });
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [currentAction, setCurrentAction] = useState(null);

  const [confirmationMessage, setConfirmationMessage] = useState({
    title: '',
    message: '',
  });

  // Other declarations
  const dispatch = useDispatch();
  const history = useHistory();

  // get data from redux store
  const { userLocationData, userData } = useSelector(
    ({ user }) => user,
  );

  const { data: bankList } = useSelector(
    ({ walletsAndBanks: { bankList } }) => bankList,
  );

  const linkBankAccountRequestData = useSelector(
    ({ walletsAndBanks: { linkBankAccountRequest } }) =>
      linkBankAccountRequest,
  );

  const linkedBankAccounts = useSelector(
    ({ walletsAndBanks: { linkedBankAccounts } }) =>
      linkedBankAccounts,
  );

  const selfLinkBankAccountData = useSelector(
    ({ walletsAndBanks: { selfLinkBankAccount } }) =>
      selfLinkBankAccount,
  );

  const unlinkBankAccountData = useSelector(
    ({ walletsAndBanks: { unlinkAccount } }) => unlinkAccount,
  );

  const linkBankAccountData = useSelector(
    ({ walletsAndBanks: { linkBankAccount } }) => linkBankAccount,
  );

  // FUNCTIONS
  const isEmpty = value => `${value}`.trim().length === 0;

  const resetOperationHandler = useCallback(() => {
    setStep(1);
    setOpenLinkBankModal(false);
    setForm({ ...FORM_VALUES });
    setOTP('');
    setSelectedPhoneNumber({});
    setSelectedCurrency({});
    setSelectedCountry();
    setCurrentBankOption({});
  }, []);

  const handleOpenConfirmModal = useCallback(
    (clickedItem, action) => {
      setCurrentItem(clickedItem);
      setOpenConfirmModal(true);
      setCurrentAction(action);
    },
    [],
  );
  useEffect(() => {
    if (openLinkBankModal) {
      setStep(1);
      setOTP('');
    }
  }, [openLinkBankModal]);

  const handleCloseConfirmModal = useCallback(() => {
    setCurrentItem({});
    setOpenConfirmModal(false);
    setCurrentAction(null);
  }, []);

  const submitLinkAccountRequestHandler = () => {
    const {
      CountryCode,
      PhoneNumber,
      AccountNumber,
      BankCode,
    } = form;

    linkBankAccountRequest({
      CountryCode,
      PhoneNumber,
      AccountNumber,
      BankCode,
      Testing: 'Yes',
    })(dispatch);
  };

  const handleAddMoneyToWallet = item => {
    history.push({
      pathname: '/add-money',
      state: {
        bankItem: item,
        activeTab: 1,
      },
    });
  };

  const handleSendMoneyToBank = item => {
    history.push({
      pathname: '/send-money-to-bank',
      state: {
        bankItem: item,
        goBack: true,
      },
    });
  };

  const approveLinkingAccountHandler = useCallback(
    ({ AccountNumber, BankCode }) => {
      linkBankAccount({
        AccountNumber,
        BankCode,
      })(dispatch);
    },
    [dispatch],
  );

  const valueChangeHandler = useCallback((e, { value, name }) => {
    setForm(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const countryChangeHandler = value => {
    valueChangeHandler(null, {
      value,
      name: 'CountryCode',
    });

    setSelectedCountry(value);
  };

  const unlinkBankAccountHandler = useCallback(
    bankAccount => {
      const { BankCode, AccountNumber } = bankAccount;
      unlinkBankAccount({ BankCode, AccountNumber })(dispatch);
    },
    [dispatch],
  );

  const bankOptionActionConfirmedHandler = () => {
    if (currentAction === bankAccountOptions.APPROVE) {
      approveLinkingAccountHandler(currentItem);
    } else if (
      currentAction === bankAccountOptions.REJECT ||
      currentAction === bankAccountOptions.UNLINK
    ) {
      unlinkBankAccountHandler(currentItem);
    }
  };

  // LIFE CYCLE HOOKS

  // fetch data
  useEffect(() => {
    getBankList()(dispatch);
    getLinkedBankAccounts()(dispatch);
  }, []);

  useEffect(() => {
    if (form?.CountryCode) {
      getBankList({
        CountryCode: form?.CountryCode,
      })(dispatch);
    }
  }, [form?.CountryCode]);

  useEffect(() => {
    setCurrentBankOption({});
  }, [bankList]);

  // other Hooks

  useEffect(() => {
    switch (currentAction) {
      case bankAccountOptions.APPROVE:
        setConfirmationMessage({
          title: global.translate('Link bank account'),
          message: global.translate(
            'This bank account will be linked to your 2UMoney account.',
          ),
        });
        break;
      case bankAccountOptions.UNLINK:
        setConfirmationMessage({
          title: global.translate('Unlink bank account'),
          message: global.translate(
            `Are you sure you want to unlink this bank account? This operation is irreversible.`,
          ),
        });
        break;
      case bankAccountOptions.REJECT:
        setConfirmationMessage({
          title: global.translate('Reject linking bank account'),
          message: global.translate(
            'Are you sure you want to reject this request? This operation is irreversible.',
          ),
        });
        break;

      case bankAccountOptions.FREEZE:
        setConfirmationMessage({
          title: global.translate('Freeze your bank account'),
          message: global.translate(
            'Are you sure you want to freeze this bank account?. No transactions can be made to or from a freezed account.',
          ),
        });
        break;
      default:
        setConfirmationMessage({});
    }
  }, [currentAction]);
  useEffect(() => {
    if (
      selfLinkBankAccountData?.error?.Description &&
      OTP.length !== 6
    ) {
      clearSelfLinkAccount()(dispatch);
    }
  }, [OTP, step, dispatch, selfLinkBankAccountData]);

  useEffect(() => {
    if (unlinkBankAccountData?.success) {
      handleCloseConfirmModal();
    }
  }, [unlinkBankAccountData]);

  useEffect(() => {
    if (linkBankAccountData?.success) {
      handleCloseConfirmModal();
    }
  }, [linkBankAccountData]);

  useEffect(() => {
    if (step === 2 && OTP.length === 6) {
      selfLinkBankAccount({
        OTP,
        ...form,
        SwiftCode: currentBankOption?.SwiftCode,
        Testing: 'Yes',
        Logo: currentBankOption.Logo,
      })(dispatch);
    }
  }, [OTP, form, currentBankOption, step, dispatch]);

  useEffect(() => {
    if (selfLinkBankAccountData?.success) {
      resetOperationHandler();
    }
  }, [selfLinkBankAccountData, resetOperationHandler]);

  useEffect(() => {
    if (linkBankAccountRequestData?.success) {
      setStep(2);
    }
  }, [linkBankAccountRequestData]);

  useEffect(() => {
    const {
      CountryCode,
      PhoneNumber,
      AccountNumber,
      BankCode,
      Currency,
    } = form;

    if (
      step === 1 &&
      [
        CountryCode,
        PhoneNumber,
        AccountNumber,
        BankCode,
        Currency,
      ].some(value => isEmpty(value))
    ) {
      setIsValidForm(false);
    } else if (step === 2 && OTP.length === 6) {
      setIsValidForm(true);
    } else {
      setIsValidForm(true);
    }
  }, [form, step, OTP]);
  useEffect(() => {
    if (step === 1) {
      setOTP('');
    }
  }, [step]);

  useEffect(() => {
    if (openLinkBankModal && Array.isArray(userData?.data?.Phones)) {
      const primaryPhone =
        userData?.data?.Phones.filter(
          phone => phone.Primary === 'YES',
        ) || {};
      setSelectedPhoneNumber(primaryPhone);
      setForm(form => ({
        ...form,
        PhoneNumber: primaryPhone?.Phone,
      }));
      setPhones(userData?.data?.Phones);
    }
  }, [userData?.data?.Phones, openLinkBankModal]);

  useEffect(() => {
    const { Currencies } = currentBankOption;

    if (Currencies) {
      const currenciesList = Currencies.map(({ Currency }) => ({
        Key: Currency,
        text: Currency,
        value: Currency,
      }));

      setCurrenciesList(currenciesList);
    }
  }, [currentBankOption]);

  useEffect(() => {
    valueChangeHandler(null, {
      name: 'BankName',
      value: currentBankOption.BankName,
    });
  }, [currentBankOption, valueChangeHandler]);

  useEffect(() => {
    if (openLinkBankModal && userLocationData?.CountryCode) {
      const selectedCountry = countries.find(
        ({ CountryCode }) =>
          CountryCode === userLocationData?.CountryCode,
      );

      if (selectedCountry) {
        valueChangeHandler(null, {
          value: selectedCountry.CountryCode,
          name: 'CountryCode',
        });

        setSelectedCountry(selectedCountry?.CountryCode);
      }
    }
  }, [
    userLocationData?.CountryCode,
    valueChangeHandler,
    openLinkBankModal,
  ]);

  return {
    openLinkBankModal,
    setOpenLinkBankModal,
    selectedCountry,
    countryChangeHandler,
    form,
    valueChangeHandler,
    bankList,
    setCurrentBankOption,
    currentBankOption,
    currenciesList,
    phones,
    selectedPhoneNumber,
    setSelectedPhoneNumber,
    submitLinkAccountRequestHandler,
    isValidForm,
    linkBankAccountRequestData,
    step,
    setStep,
    OTP,
    setOTP,
    linkedBankAccounts,
    selfLinkBankAccountData,
    unlinkBankAccountHandler,
    approveLinkingAccountHandler,
    selectedCurrency,
    setSelectedCurrency,
    handleOpenConfirmModal,
    handleCloseConfirmModal,
    openConfirmModal,
    setOpenConfirmModal,
    bankOptionActionConfirmedHandler,
    linkBankAccountData,
    unlinkBankAccountData,
    confirmationMessage,
    handleAddMoneyToWallet,
    handleSendMoneyToBank,
    currentItem,
  };
};
