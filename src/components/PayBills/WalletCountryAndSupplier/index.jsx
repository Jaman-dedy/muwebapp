import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react';
import formatNumber from 'utils/formatNumber';
import Message from 'components/common/Message';
import Thumbnail from 'components/common/Thumbnail';
import SupplierPlaceholder from 'assets/images/placeholders/supplier-placeholder.svg';
import DropdownCountries from 'components/common/Dropdown/CountryDropdown';
import DropdownWallet from 'components/common/Dropdown/WalletDropdown';
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
  suppliersCountriesError,
  setPayBillsData,
}) => {
  const [hasError, setHasError] = useState(false);
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

  useEffect(() => {
    if (currentWalletOption) {
      handleInputChange({
        target: {
          name: 'WalletNumber',
          value: currentWalletOption.AccountNumber,
        },
      });
    }
  }, [currentWalletOption]);

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
          name={
            userData.data?.FirstName ? userData.data?.FirstName : ''
          }
          secondName={
            userData.data?.LastName ? userData.data?.LastName : ''
          }
          height={75}
          width={75}
          style={{ height: 75, width: 75, borderRadius: '50%' }}
          avatar={userData.data && userData.data?.PictureURL}
          circular
          size="tiny"
          className="avatar"
          hasError={hasError}
          setHasError={setHasError}
        />

        <div className="wallet-details">
          <h4>{global.translate('Choose a wallet')}</h4>
          <DropdownWallet
            options={myWallets}
            currentOption={currentWalletOption}
            onChange={handleInputChange}
          />
          <div className="balance">
            <div>
              {global.translate(
                'Available Balance in the selected wallet',
                1223,
              )}
            </div>
            <span className="bold">
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
        <h4>{global.translate('Destination Country')}</h4>

        {suppliersCountriesError?.Description &&
          suppliersCountries.length === 0 && (
            <Message
              error
              message={global.translate(
                suppliersCountriesError.Description,
              )}
            />
          )}

        {!suppliersCountriesError?.Description &&
          suppliersCountries.length !== 0 && (
            <DropdownCountries
              className="dropdown-menu"
              options={suppliersCountries}
              currentOption={currentCountryOption}
              onChange={handleInputChange}
            />
          )}
        {suppliersCountries.length !== 0 && (
          <div className="supplier-details">
            <h4 className="supplier-label">
              {global.translate('Select your supplier')}
            </h4>
            <div className="suppliers">
              {suppliers.loading ? (
                <div style={{ padding: '10px' }}>
                  <Image
                    src={SupplierPlaceholder}
                    className="animate-placeholder fluid"
                  />
                </div>
              ) : (
                <Suppliers
                  suppliers={suppliers.suppliers}
                  payBillsData={payBillsData}
                  setPayBillsData={setPayBillsData}
                />
              )}
            </div>
          </div>
        )}
        {screen1.errors.Supplier &&
          suppliersCountries.length !== 0 && (
            <Message error message={screen1.errors.Supplier} />
          )}
      </div>
    </div>
  );
};

WalletCountryAndSupplier.defaultProps = {
  userData: {},
  setPayBillsData: () => {},
  suppliersCountriesError: {},
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
  setPayBillsData: PropTypes.func,
  suppliersCountriesError: PropTypes.instanceOf(Object),
};

export default WalletCountryAndSupplier;
