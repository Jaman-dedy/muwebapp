import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import formatNumber from 'utils/formatNumber';
import Message from 'components/common/Message';
import Loader from 'components/common/Loader';
import Thumbnail from 'components/common/Thumbnail';
import DropdownWallet from '../../common/Dropdown/WalletDropdown';
import DropdownCountries from '../../common/Dropdown/CountryDropdown';
import Suppliers from './Suppliers/Suppliers';
import './WalletCountryAndSupplier.scss';

const WalletCountryAndSupplier = ({
  screen1,
  myWallets,
  payBillsData,
  userData,
  handleInputChange,
  suppliersCountries,
  suppliers,
  clearError,
}) => {
  const {
    language: { preferred } = {},
    userLocationData,
  } = useSelector(({ user }) => user);

  const currentWalletOption = myWallets.find(
    ({ AccountNumber, Default }) => {
      if (payBillsData.WalletNumber) {
        return AccountNumber === payBillsData.WalletNumber;
      }
      return Default === 'YES';
    },
  );

  const currentCountryOption = suppliersCountries.find(
    ({ CountryCode }) => {
      if (payBillsData.CountryCode) {
        return CountryCode === payBillsData.CountryCode;
      }

      const Country = suppliersCountries.find(
        ({ CountryCode }) =>
          CountryCode === userLocationData.CountryCode,
      );

      handleInputChange({
        target: {
          name: 'CountryCode',
          value: Country
            ? Country.CountryCode
            : suppliersCountries[0].CountryCode,
        },
      });

      return Country
        ? CountryCode === Country.CountryCode
        : CountryCode === suppliersCountries[0].CountryCode;
    },
  );
  return (
    <div className="WalletCountryAndSupplier">
      <div className="sender-details">
        <Thumbnail
          name={userData.data && userData.data.FirstName}
          secondName={userData.data && userData.data.LastName}
          height={75}
          width={75}
          style={{ height: 75, width: 75, borderRadius: '50%' }}
          avatar={userData.data && userData.data.PictureURL}
          circular
          size="tiny"
          className="avatar"
        />
        <div className="wallet-details">
          <span>{global.translate('Choose a wallet')}</span>
          <DropdownWallet
            options={myWallets}
            currentOption={currentWalletOption}
            onChange={handleInputChange}
          />
          <div className="balance">
            <p>
              {global.translate(
                'Available Balance in the selected wallet',
              )}
            </p>
            <span>
              {currentWalletOption &&
                formatNumber(currentWalletOption.Balance, {
                  locales: preferred,
                })}{' '}
              {currentWalletOption &&
                currentWalletOption.CurrencyCode}
            </span>
          </div>
        </div>
      </div>
      <div className="destination-details">
        <span>{global.translate('Destination Country')}</span>
        <DropdownCountries
          options={suppliersCountries}
          currentOption={currentCountryOption}
          onChange={handleInputChange}
        />
        <div className="supplier-details">
          <span className="supplier-label">
            {global.translate('Select your supplier', 690)}
          </span>
          <div className="suppliers">
            {suppliers.loading ? (
              <div style={{ padding: '10px' }}>
                <Loader
                  loaderContent={global.translate('Working...', 412)}
                />
              </div>
            ) : (
              <Suppliers
                payBillsData={payBillsData}
                onChange={handleInputChange}
                suppliers={suppliers.suppliers}
                clearError={clearError}
              />
            )}
          </div>
        </div>
        {screen1.errors.Supplier && (
          <Message error message={screen1.errors.Supplier} />
        )}
      </div>
    </div>
  );
};

WalletCountryAndSupplier.defaultProps = {
  userData: {},
};

WalletCountryAndSupplier.propTypes = {
  screen1: PropTypes.instanceOf(Object).isRequired,
  userData: PropTypes.instanceOf(Object),
  handleInputChange: PropTypes.func.isRequired,
  myWallets: PropTypes.arrayOf(PropTypes.instanceOf(Object))
    .isRequired,
  payBillsData: PropTypes.instanceOf(Object).isRequired,
  suppliersCountries: PropTypes.arrayOf(PropTypes.instanceOf(Object))
    .isRequired,
  suppliers: PropTypes.instanceOf(Object).isRequired,
  clearError: PropTypes.func.isRequired,
};

export default WalletCountryAndSupplier;
