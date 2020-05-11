import React from 'react';

import DashboardLayout from 'components/common/DashboardLayout';

import ContactsPage from './ContactsPage';
import SearchStores from './SearchStores';

import './Vouchers.scss';

const Vouchers = ({
  screenNumber,
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
