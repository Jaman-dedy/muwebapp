import { CLEAR_UPDATE_USER_PHONE_LIST } from 'constants/action-types/userAccountManagement/updateUserPhoneList';
import { CLEAR_UPDATE_USER_EMAIL_LIST } from 'constants/action-types/userAccountManagement/updateUserEmailList';
import { UPDATE_USER_INFO_SUCCESS } from 'constants/action-types/users/getUserInfo';
import rawCountries from 'utils/countryCodes';

export default ({ phoneData, emailData }) => dispatch => {
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
    const PhonePrefix =
      el.PhonePrefix &&
      el.PhonePrefix.toString().split('+')[
        el.PhonePrefix.toString().split('+').length - 1
      ];
    return {
      Phone: `${el.PhonePrefix}${el.PhoneNumber}`,
      PhonePrefix,
      PhoneNumber: el.PhoneNumber,
      NumberCountryCode:
        findCountry(el.PhonePrefix) &&
        findCountry(el.PhonePrefix).key,
      CategoryCode: el.CategoryCode,
    };
  });

  const newEmailData = emailData.Emails.map(el => {
    const { Email, CategoryCode } = el;
    return {
      Email,
      CategoryCode,
    };
  });
  dispatch({
    type: CLEAR_UPDATE_USER_PHONE_LIST,
  });
  dispatch({
    type: CLEAR_UPDATE_USER_EMAIL_LIST,
  });
  dispatch({
    type: UPDATE_USER_INFO_SUCCESS,
    payload: {
      Phones: [...newPhoneData],
      Emails: [...newEmailData],
    },
  });
};
