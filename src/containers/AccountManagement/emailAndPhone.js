import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import restoreUpdateUserEmailAndPhoneAction from 'redux/actions/userAccountManagement/restoreUserEmailAndPhoneList';
import updateUserEmailListAction from 'redux/actions/userAccountManagement/updateUserEmailList';
import updateUserPhoneListAction from 'redux/actions/userAccountManagement/updateUserPhoneList';
import isEmailValid from 'helpers/checkEmail';
import rawCountries from 'utils/countryCodes';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const { updateUserPhoneList, updateUserEmailList } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );
  const dispatch = useDispatch();

  const [phoneData, setPhoneData] = useState({
    Phones: [
      {
        PhoneNumber: '',
        CategoryCode: '1',
        Category: 'Private',
        CountryCode: '',
        PhonePrefix: '',
        index: 0,
      },
    ],
  });
  const [emailData, setEmailData] = useState({
    Emails: [
      {
        Email: '',
        CategoryCode: '1',
        index: 0,
      },
    ],
  });

  const [phoneErrors, setPhoneErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState(false);

  const [infoOrEdit, setInfoOrEdit] = useState('info');

  const clearPhoneError = () => {
    setPhoneErrors(false);
  };
  const clearEmailError = () => {
    setEmailErrors(false);
  };

  const handlePhoneInputChange = async ({
    target: { name, value },
  }) => {
    clearPhoneError();

    if (name.includes('Category')) {
      const newPhones = phoneData.Phones.map(el => {
        if (name.split('Category')[1] === `${el.index}`)
          return {
            ...el,
            CategoryCode: value,
          };
        return el;
      });
      return setPhoneData({
        ...phoneData,
        Phones: newPhones,
      });
    }
    if (name.includes('PhoneNumberCode')) {
      const newPhones = phoneData.Phones.map(el => {
        if (name.split('PhoneNumberCode')[1] === `${el.index}`)
          return {
            ...el,
            PhonePrefix: value,
          };
        return el;
      });
      return setPhoneData({
        ...phoneData,
        Phones: newPhones,
      });
    }
    if (name.includes('PhoneNumber')) {
      const newPhones = phoneData.Phones.map(el => {
        if (name.split('PhoneNumber')[1] === `${el.index}`)
          return {
            ...el,
            PhoneNumber: value,
          };
        return el;
      });
      return setPhoneData({
        ...phoneData,
        Phones: newPhones,
      });
    }

    return setPhoneData({
      ...phoneData,
      [name]: value,
    });
  };
  const handleEmailInputChange = async ({
    target: { name, value },
  }) => {
    clearEmailError();

    if (name.includes('Email')) {
      const newEmails = emailData.Emails.map(el => {
        if (name.split('Email')[1] === `${el.index}`)
          return {
            ...el,
            Email: value,
          };
        return el;
      });
      return setEmailData({
        ...emailData,
        Emails: newEmails,
      });
    }

    if (name.includes('Category')) {
      const newEmails = emailData.Emails.map(el => {
        if (name.split('Category')[1] === `${el.index}`)
          return {
            ...el,
            CategoryCode: value,
          };
        return el;
      });
      return setEmailData({
        ...emailData,
        Emails: newEmails,
      });
    }

    return setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const addPhoneNumberForm = () => {
    setPhoneData({
      ...phoneData,
      Phones: [
        ...phoneData.Phones,
        {
          PhoneNumber: '',
          Category: 'Private',
          CategoryCode: '1',
          CountryCode: '',
          PhonePrefix: '',
          index: phoneData.Phones.length,
        },
      ],
    });
  };
  const removePhoneNumberForm = i => {
    if (phoneData.Phones.length > 1 && i !== 0) {
      const newForm = phoneData.Phones.filter(
        ({ index }) => index !== i,
      );
      setPhoneData({
        ...phoneData,
        Phones: [...newForm],
      });
    }
  };

  const addEmailForm = () => {
    setEmailData({
      ...emailData,
      Emails: [
        ...emailData.Emails,
        {
          Email: '',
          CategoryCode: '1',
          index: emailData.Emails.length,
        },
      ],
    });
  };
  const removeEmailForm = i => {
    if (emailData.Emails.length > 1 && i !== 0) {
      const newForm = emailData.Emails.filter(
        ({ index }) => index !== i,
      );
      setEmailData({
        ...emailData,
        Emails: [...newForm],
      });
    }
  };

  const validatePhoneForm = () => {
    let hasError = false;
    phoneData.Phones.map(el => {
      if (!el.PhoneNumber || !el.PhonePrefix) {
        hasError = true;
        return setPhoneErrors(true);
      }
      return true;
    });

    return hasError;
  };

  const validateEmailForm = () => {
    let hasError = false;
    emailData.Emails.map(el => {
      if (!el.Email || !isEmailValid(el.Email)) {
        hasError = true;
        return setEmailErrors(true);
      }
      return true;
    });
    return hasError;
  };

  const handleSubmit = async () => {
    if (validateEmailForm() || validatePhoneForm()) {
      return false;
    }

    const findCountry = phoneCode =>
      rawCountries.find(({ value }) => {
        const newPhoneCode = `+${
          phoneCode.toString().split('+')[
            phoneCode.toString().split('+').length - 1
          ]
        }`;
        return value === newPhoneCode;
      });

    const newPhoneData = phoneData.Phones.map(el => {
      return {
        PhoneNumber: `${el.PhonePrefix}${el.PhoneNumber}`,
        Category: el.CategoryCode,
        CountryCode:
          findCountry(el.PhonePrefix) &&
          findCountry(el.PhonePrefix).key,
      };
    });

    const newEmailData = emailData.Emails.map(el => {
      const { Email, CategoryCode } = el;
      return {
        Email,
        Category: CategoryCode,
      };
    });

    updateUserPhoneListAction({ Phones: [...newPhoneData] })(
      dispatch,
    ); // send phone numbers
    updateUserEmailListAction({ Emails: [...newEmailData] })(
      dispatch,
    ); // send email addresses
    return true;
  };

  useEffect(() => {
    const { data } = userData;
    if (data) {
      const newPhoneData =
        data.Phones &&
        data.Phones.map((el, index) => {
          const {
            PhoneNumber,
            CategoryCode,
            NumberCountryCode,
            Category,
            PhonePrefix,
          } = el;

          return {
            PhoneNumber: Number(
              PhoneNumber.toString()
                .split(' ')
                .join(''),
            ),
            CategoryCode,
            Category,
            CountryCode: NumberCountryCode,
            PhonePrefix: Number(PhonePrefix),
            index,
          };
        });

      const newEmailData =
        data.Emails &&
        data.Emails.map((el, index) => {
          const { Email, CategoryCode, Category } = el;
          return {
            CategoryCode,
            Category,
            Email,
            index,
          };
        });

      if (newPhoneData && newPhoneData.length > 0)
        setPhoneData({
          Phones: newPhoneData,
        });

      if (newEmailData && newEmailData.length > 0)
        setEmailData({
          Emails: newEmailData,
        });
    }
  }, [userData]);

  useEffect(() => {
    if (updateUserPhoneList.success && updateUserEmailList.success) {
      setInfoOrEdit('info');
      restoreUpdateUserEmailAndPhoneAction({ phoneData, emailData })(
        dispatch,
      );
      toast.success(updateUserEmailList.Description);
    } else if (
      updateUserPhoneList.error ||
      updateUserEmailList.error
    ) {
      toast.error(
        updateUserEmailList.error.Description ||
          updateUserPhoneList.error.Description,
      );
      setInfoOrEdit('info');
      restoreUpdateUserEmailAndPhoneAction()(dispatch);
    }
  }, [updateUserPhoneList, updateUserEmailList]);

  return {
    phoneData,
    emailData,
    phoneErrors,
    emailErrors,
    handleSubmit,
    handlePhoneInputChange,
    handleEmailInputChange,
    infoOrEdit,
    setInfoOrEdit,
    addPhoneNumberForm,
    removePhoneNumberForm,
    addEmailForm,
    removeEmailForm,
    updateUserPhoneList,
    updateUserEmailList,
  };
};
