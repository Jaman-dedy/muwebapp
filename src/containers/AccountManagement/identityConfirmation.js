import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';

import saveUserIdData from 'redux/actions/users/saveUserIdData';
import isFileImage from 'utils/isFileImage';
import {
  idID,
  idPassport,
  idDriverLicence,
  idOther,
} from 'constants/general';
import rawCountries from 'utils/countries';
import uploadDocs from 'helpers/uploadDocs';
import saveToBackend from 'helpers/uploadImages/saveToBackend';

export default () => {
  const dispatch = useDispatch();
  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));
  const {
    userData: { data },
    userIdData: { data: IdData, loading, error },
  } = useSelector(({ user }) => user);

  const [formData, setFormData] = useState(null);
  const [selectedDateOfIssue, setSelectedDateOfIssue] = useState(
    null,
  );
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCurrentType, setSelectedCurrentType] = useState(
    null,
  );
  const [openIdentityModal, setOpenIdentityModal] = useState(false);
  const [userIdUrlData, setUserIdUrlData] = useState(null);

  const options = [
    {
      key: idID,
      text: global.translate('ID card', 1143),
      value: idID,
    },
    {
      key: idPassport,
      text: global.translate('Passport', 1142),
      value: idPassport,
    },
    {
      key: idDriverLicence,
      text: global.translate("Driver's license", 1144),
      value: idDriverLicence,
    },
    {
      key: idOther,
      text: global.translate('Other', 1409),
      value: idOther,
    },
  ];

  const onInputChange = (target, { name, value }) => {
    setFormData({
      ...FormData,
      [name]: value,
    });
  };
  const onCountryChange = ({ target: { name, value } }) => {
    setSelectedCountry(
      countries.find(({ CountryCode }) => CountryCode === value),
    );
  };

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        IDNumber: data.IDCardInfo.IDNumber,
        IDCountryCode: data.IDCardInfo.IDCountryCode,
      });
      if (data.IDCardInfo?.ExpirationDate) {
        setSelectedExpiryDate(
          new Date(data.IDCardInfo?.ExpirationDate),
        );
      }
      if (data.IDCardInfo?.IssueDate) {
        setSelectedDateOfIssue(new Date(data.IDCardInfo?.IssueDate));
      }

      setSelectedCountry(
        countries.find(
          ({ CountryCode }) =>
            CountryCode === data.Country.toLowerCase(),
        ),
      );
      setSelectedCurrentType(data.IDCardInfo.IDType);
    }
  }, [data]);
  useEffect(() => {
    if (IdData) {
      setOpenIdentityModal(false);
    }
  }, [IdData]);

  const onImageChange = ({ target }) => {
    const { name, files, value } = target;

    const file = (files && files[0]) || (value && value[0]);

    if (file) {
      if (isFileImage(file)) {
        uploadDocs(name, file, data, '/UploadKYCDocs').then(res => {
          setUserIdUrlData(res);
        });
      } else
        toast.error(
          global.translate('Please, choose an image format', 2056),
        );
    }
  };

  const handleSubmit = async () => {
    const data = {
      IDNumber: formData.IDNumber,
      IDType: selectedCurrentType,
      ExpirationDate: moment(selectedExpiryDate).format('YYYY-MM-DD'),
      DOIssue: moment(selectedDateOfIssue).format('YYYY-MM-DD'),
      IDCountryCode: selectedCountry.CountryCode,
    };
    saveUserIdData(data)(dispatch);
    if (userIdUrlData) {
      const { status, data: dataImg } = await saveToBackend(
        userIdUrlData,
      );
      if (!status) {
        toast.error(data[0].Description);
      }
      toast.success(
        global.translate('Document uploaded successfully', 2055),
      );
    }
  };

  return {
    onInputChange,
    formData,
    options,
    selectedDateOfIssue,
    setSelectedDateOfIssue,
    selectedExpiryDate,
    setSelectedExpiryDate,
    selectedCountry,
    onCountryChange,
    selectedCurrentType,
    setSelectedCurrentType,
    handleSubmit,
    openIdentityModal,
    setOpenIdentityModal,
    loading,
    onImageChange,
    userIdUrlData,
  };
};
