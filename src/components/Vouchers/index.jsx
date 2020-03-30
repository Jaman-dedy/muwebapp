import React, { useEffect, useState } from 'react';

import DashboardLayout from 'components/common/DashboardLayout';

import ContactsPage from './ContactsPage';
import SearchStores from './SearchStores';

import './Vouchers.scss';

const Vouchers = ({
  screenNumber,
  setScreenNumber,
  userData,
  walletList,
  countries,
  stores,
  form,
  onChange,
  contactsPage,
  searchStores,
}) => {
  const renderForm = () => {
    switch (screenNumber) {
      case 1:
        return (
          <ContactsPage
            userData={userData}
            walletList={walletList}
            countries={countries}
            stores={stores}
            form={form}
            onChange={onChange}
            contactsPage={contactsPage}
          />
        );
      case 2:
        return (
          <SearchStores
            userData={userData}
            walletList={walletList}
            countries={countries}
            stores={stores}
            form={form}
            onChange={onChange}
            searchStores={searchStores}
          />
        );
      /*  case 3:
        return (
          <PasswordForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            setResetPasswordData={setResetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenThree={screenThree}
          />
        );
      case 4:
        return (
          <PINForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenFour={screenFour}
          />
        );
      case 5:
        return (
          <OTPForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenFive={screenFive}
          />
        );
      case 6:
        return (
          <Congratulation
            resetPasswordData={resetPasswordData}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenSix={screenSix}
          />
        ); */
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="voucher-page">{renderForm()}</div>
    </DashboardLayout>
  );
};

export default Vouchers;
