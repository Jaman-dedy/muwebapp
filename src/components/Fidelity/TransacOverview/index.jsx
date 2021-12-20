import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import CustomDropdown from 'components/common/Dropdown/ReusableDropdown';
import ContactListCaroussel from 'components/common/ContactCaroussel';
import getContactList from 'redux/actions/contacts/getContactList';
import WalletCharts from './WalletCharts';
import WalletNumberTrans from './WalletNumberTrans';
import PieChart from './PieChart';
import ChartPlaceholder from './ChartPlaceholder';

import './TransacOverview.scss';

const TransacOverview = ({ transactionOverview }) => {
  const {
    allContacts,
    selectedContact,
    setSelectedContact,
    currencies,
    handleInputChange,
    filterData,
    myWallets,
    walletsNumberOfTransactions,
    walletsAmountOfTransactions,
    cashInCashOutOfTransactions,
    walletsAmountOfTransactionsWithContact,
    transactionsOverview,
    transactionsOverviewWithContact,
    refreshGraphs,
  } = transactionOverview;
  const dispatch = useDispatch();
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const { data } = allContacts;
  const { walletList } = myWallets;

  useEffect(() => {
    if (currencies.data) {
      const newCurrencyOptions =
        currencies.data &&
        currencies.data.map(({ CurrencyCode, Flag }) => {
          return {
            Flag,
            CountryName: CurrencyCode,
            Currency: CurrencyCode,
            CountryCode: CurrencyCode,
            PhoneAreaCode: CurrencyCode,
          };
        });
      setCurrencyOptions(newCurrencyOptions || {});
    }
  }, [currencies]);

  useEffect(() => {
    setFilteredContacts(data);
  }, [data]);

  useEffect(() => {
    const newSelectedCurrency =
      currencyOptions &&
      currencyOptions.find(
        ({ Currency }) => Currency === filterData.Currency,
      );

    setSelectedCurrency(newSelectedCurrency || {});
  }, [filterData.Currency, currencyOptions]);

  const filterContacts = ({ target: { value } }) => {
    const newContacts =
      data &&
      data.filter(
        ({ ContactPID = '', FirstName = '', LastName = '' }) =>
          ContactPID.toLocaleLowerCase().includes(
            value.toLocaleLowerCase(),
          ) ||
          FirstName.toLocaleLowerCase().includes(
            value.toLocaleLowerCase(),
          ) ||
          LastName.toLocaleLowerCase().includes(
            value.toLocaleLowerCase(),
          ),
      );

    setFilteredContacts(newContacts || []);
  };

  const retry = () => {
    getContactList()(dispatch);
  };

  const filterUi = (
    <div className="table-header">
      <div className="from-to">
        <div className="from">
          <span>{global.translate('From', 114)}</span>
          <DateInput
            name="DateFrom"
            onChange={(_, { name, value }) =>
              handleInputChange({ target: { name, value } })
            }
            closable
            className="date-picker"
            icon="dropdown"
            popupPosition="top left"
            animation="fade"
            placeholder={global.translate('From', 114)}
            iconPosition="left"
            dateFormat="YYYY-MM-DD"
            maxDate={moment().format('YYYY-MM-DD')}
            value={filterData.DateFrom}
          />
        </div>
        <div className="to">
          <span>{global.translate('To')}</span>
          <DateInput
            name="DateTo"
            onChange={(_, { name, value }) =>
              handleInputChange({ target: { name, value } })
            }
            closable
            className="date-picker"
            icon="dropdown"
            popupPosition="top left"
            animation="fade"
            placeholder={global.translate('To', 115)}
            iconPosition="left"
            dateFormat="YYYY-MM-DD"
            maxDate={moment().format('YYYY-MM-DD')}
            value={filterData.DateTo}
          />
          &nbsp;
          <Button
            icon="refresh"
            color="orange"
            onClick={() => {
              refreshGraphs();
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="transcoverview-container">
      <div className="select-overview-currency flex align-item-center">
        <span>{global.translate('Reference currency', 1971)}: </span>{' '}
        <div>
          <CustomDropdown
            options={currencyOptions || []}
            currentOption={selectedCurrency || {}}
            onChange={({ target: { value } }) =>
              handleInputChange({
                target: { name: 'Currency', value },
              })
            }
          />
        </div>
      </div>
      <div className="period-selector">{filterUi}</div>
      <div className="wallet-charts-container flex">
        <div className="wallet-balance">
          <span>
            {global.translate('Wallet', 1931)} /{' '}
            {global.translate('Balance', 95)}
          </span>
          {(walletList.length === 0 ||
            transactionsOverview.loading) && (
            <ChartPlaceholder width={440} height={280} />
          )}
          {walletList.length !== 0 &&
            !transactionsOverview.loading && (
              <WalletCharts
                walletList={walletList}
                Currency={filterData.Currency}
              />
            )}
        </div>
        <div className="wallet-balance">
          <span>
            {global.translate('Wallet', 1931)} /{' '}
            {global.translate('Number of transactions', 1972)}
          </span>
          {(walletsNumberOfTransactions.length === 0 ||
            transactionsOverview.loading) && (
            <ChartPlaceholder width={440} height={280} />
          )}
          {walletsNumberOfTransactions.length !== 0 &&
            !transactionsOverview.loading && (
              <WalletNumberTrans data={walletsNumberOfTransactions} />
            )}
        </div>
        <div className="wallet-balance">
          <span>
            {global.translate('Wallet', 1931)} /{' '}
            {global.translate('Transactions amount')}
          </span>
          {(walletsAmountOfTransactions.length === 0 ||
            transactionsOverview.loading) && (
            <ChartPlaceholder width={440} height={280} />
          )}
          {walletsAmountOfTransactions.length !== 0 &&
            !transactionsOverview.loading && (
              <WalletNumberTrans data={walletsAmountOfTransactions} />
            )}
        </div>
        <div className="wallet-balance">
          <span>
            {global.translate(
              'Cash in and Cash out transactions',
              1973,
            )}
          </span>
          {(cashInCashOutOfTransactions.length === 0 ||
            transactionsOverview.loading) && (
            <ChartPlaceholder width={440} height={280} />
          )}
          {cashInCashOutOfTransactions.length !== 0 &&
            !transactionsOverview.loading && (
              <PieChart
                data={cashInCashOutOfTransactions}
                className="fidelity__pie-chart"
              />
            )}
        </div>
      </div>
      <div className="contact-transaction">
        <span>{global.translate('Select a contact', 485)}</span>
        <div className="contact-search large-v-margin">
          <Form>
            <Form.Input
              placeholder={global.translate(
                'Search for a contact',
                1974,
              )}
              icon="search"
              iconPosition="left"
              onChange={filterContacts}
            />
          </Form>
        </div>
        <div className="overview-contact-list">
          <ContactListCaroussel
            onItemClick={item => setSelectedContact(item)}
            items={{
              ...allContacts,
              data: filteredContacts,
            }}
            selectedItem={selectedContact || {}}
            retryFn={retry}
          />
        </div>
        {transactionsOverviewWithContact.loading && (
          <ChartPlaceholder width={440} height={280} />
        )}
        {walletsAmountOfTransactionsWithContact.length !== 0 &&
          !transactionsOverviewWithContact.loading && (
            <WalletNumberTrans
              data={walletsAmountOfTransactionsWithContact}
            />
          )}
      </div>
    </div>
  );
};

TransacOverview.propTypes = {
  transactionOverview: PropTypes.instanceOf(Object).isRequired,
};

export default TransacOverview;
