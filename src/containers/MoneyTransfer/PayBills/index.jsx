/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import getMyWallets from 'redux/actions/users/getMyWallets';
import getSuppliersCountries from 'redux/actions/payBills/getSuppliersCountries';
import getSuppliers from 'redux/actions/payBills/getSuppliers';
import clearTransferFundAction from 'redux/actions/payBills/clearTransferFund';
import screen1 from './screen1';
import screen2 from './screen2';
import screen3 from './screen3';

export default () => {
  const { userData, myWallets, userLocationData } = useSelector(
    ({ user }) => user,
  );
  const { suppliersCountries, suppliers } = useSelector(
    ({ payBills }) => payBills,
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [openPayBills, setOpenPayBills] = useState(false);
  const [listOfWallet, setListOfWallet] = useState(null);
  const [screenNumber, setScreenNumber] = useState(1);
  const [payBillsData, setPayBillsData] = useState({
    Amount: '',
    WalletNumber: '',
    Currency: '',
    Country: '',
    InvoiceDate: '',
    Description: '',
    Reference: '',
    Supplier: '',
    SupplierName: '',
  });

  const handleInputChange = ({
    target: { name, value },
    Currency,
    SupplierName,
  }) => {
    return setPayBillsData({
      ...payBillsData,
      [name]: value,
      Currency: Currency || payBillsData.Currency,
      SupplierName: SupplierName || payBillsData.SupplierName,
    });
  };

  const clearPayBillsData = () => {
    setPayBillsData({
      Amount: '',
      WalletNumber: '',
      Currency: '',
      Country: '',
      InvoiceDate: '',
      Description: '',
      Reference: '',
      Supplier: '',
      SupplierName: '',
    });
    setScreenNumber(1);
    clearTransferFundAction()(dispatch);
  };
  useEffect(() => {
    setListOfWallet(myWallets?.walletList);
  }, []);

  useEffect(() => {
    if (queryParams.ref === 'pay-bills') {
      setOpenPayBills(true);
    }
  }, [queryParams]);

  useEffect(() => {
    if (myWallets.walletList) {
      getMyWallets()(dispatch);
    }
    getSuppliersCountries()(dispatch);

    const defaultWallet = myWallets.walletList.find(
      ({ Default }) => Default === 'YES',
    );
    setPayBillsData({
      ...payBillsData,
      Currency: defaultWallet && defaultWallet.CurrencyCode,
      WalletNumber: defaultWallet && defaultWallet.AccountNumber,
    });
  }, [listOfWallet]);

  useEffect(() => {
    if (
      suppliersCountries.countries.length !== 0 &&
      !suppliersCountries.loading
    ) {
      const Country = suppliersCountries.countries.find(
        ({ CountryCode }) =>
          CountryCode === userLocationData.CountryCode,
      );

      setPayBillsData({
        ...payBillsData,
        CountryCode: Country
          ? Country.CountryCode
          : suppliersCountries.countries[0].CountryCode,
      });

      getSuppliers(
        Country
          ? Country.CountryCode
          : suppliersCountries.countries[0].CountryCode,
      )(dispatch);
    }
  }, [suppliersCountries]);

  useEffect(() => {
    getSuppliers(payBillsData.CountryCode)(dispatch);
  }, [payBillsData.CountryCode]);

  return {
    screen1: screen1({ payBillsData, setScreenNumber }),
    screen2: screen2({ payBillsData, setScreenNumber }),
    screen3: screen3({ payBillsData }),
    openPayBills,
    setOpenPayBills,
    screenNumber,
    setScreenNumber,
    payBillsData,
    clearPayBillsData,
    handleInputChange,
    userData,
    myWallets,
    suppliersCountries,
    suppliers,
  };
};
