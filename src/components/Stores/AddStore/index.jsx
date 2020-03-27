/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Image,
  Form,
  TextArea,
  Dropdown,
  Label,
  Icon,
} from 'semantic-ui-react';

import './AddStore.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import MyWallets from 'components/common/WalletCarousselSelector';
import PREVIOUS_ICON from 'assets/images/back.png';
import addStoreImage from 'assets/images/add-store.png';
import inputImage from 'assets/images/input-image.png';
import cityImage from 'assets/images/city-image.png';
import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import ToggleSwitch from 'components/common/ToggleButton';
import PhoneNumberInput from 'components/common/PhoneNumberInput';
import rawCountries from 'utils/countries';
import PositionPickerModal from './PositionPickerModal';

const AddStore = ({
  userData,
  myWallets,
  storeCategories,
  addStoreData,
  handleInputChange,
  selectWallet,
  errors,
  handleSubmit,
  addUpdateStore,
  imageLoading,
}) => {
  const logoImageInput = useRef(null);
  const bannerImageInput = useRef(null);
  const [storeImages, setStoreImages] = useState({
    LogoURL: {},
    BannerURL: {},
  });
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const { userLocationData } = useSelector(({ user }) => user);

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));

  const selectedCountry = countries.find(({ CountryCode }) => {
    if (addStoreData.CountryCode) {
      return (
        CountryCode.toLocaleLowerCase() ===
        addStoreData.CountryCode.toLocaleLowerCase()
      );
    }

    if (userLocationData.CountryCode) {
      handleInputChange({
        target: {
          name: 'CountryCode',
          value: userLocationData.CountryCode,
        },
      });
    }

    return CountryCode === userLocationData.CountryCode;
  });

  const handleSearch = (options, query) => {
    return options.filter(opt =>
      opt.text.split(':')[0].includes(query),
    );
  };

  const hours = Array(24)
    .fill('*')
    .map((_, hour) => {
      const arr = [];
      for (let minute = 0; minute < 60; minute += 5) {
        arr.push({
          key: `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`,
          value: `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`,
          text: `${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`,
        });
      }

      return arr;
    });

  const options = !storeCategories.success
    ? []
    : storeCategories.categoryList
        .filter(({ Category }) => Category)
        .map(({ Category, CategoryName }) => ({
          key: Category,
          text: CategoryName,
          value: Category,
        }));

  const onImageChange = ({ target }) => {
    const { name, files } = target;
    if (target.files[0]) {
      setStoreImages({ ...storeImages, [name]: files[0] });
      handleInputChange({
        target: {
          name,
          value: files[0],
        },
      });
    }
  };

  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <span className="lighter">
            Hey{' '}
            <span className="bold">
              {userData.data && userData.data.FirstName}
            </span>
            , {global.translate('create a new store')}
          </span>
        </WelcomeBar>
        <div className="add-store-container">
          <Image
            src={PREVIOUS_ICON}
            height={30}
            className="goBack"
            onClick={() => history.goBack()}
          />
          <div className="add-store-image">
            <Image src={addStoreImage} size="medium" centered />
          </div>

          <MyWallets
            myWallets={myWallets}
            selectWallet={selectWallet}
            selectedWalletNumber={addStoreData.WalletNumber}
          />

          <Form className="add-store-form" autoComplete="off">
            <Form.Input
              placeholder={global.translate('Store name', 837)}
              className="store-name-input"
              error={errors.StoreName || false}
              name="StoreName"
              value={addStoreData.StoreName}
              onChange={handleInputChange}
              type="text"
              required
              width={16}
            />
            <Form.Input
              placeholder={global.translate(
                'Short description or leading words',
                358,
              )}
              name="ShortDesc"
              value={addStoreData.ShortDesc}
              error={errors.ShortDesc || false}
              onChange={handleInputChange}
              type="text"
              required
              width={16}
            />
            <Form.Group widths="equal">
              <Form.Field>
                <span>{global.translate('Upload the logo')}</span>
                <input
                  name="LogoURL"
                  type="file"
                  accept="image/*"
                  ref={logoImageInput}
                  onChange={onImageChange}
                  style={{ display: 'none' }}
                />
                <Form.Input
                  value={
                    imageLoading.LogoURL
                      ? global.translate('Working...', 412)
                      : storeImages.LogoURL.name || ''
                  }
                  error={errors.StoreLogo || false}
                  className="input-image"
                  placeholder={global.translate('choose an image')}
                  onClick={() => logoImageInput.current.click()}
                  action={<Image src={inputImage} />}
                />
              </Form.Field>
              <Form.Field>
                <span>
                  {global.translate('Upload a cover photo')}
                </span>
                <input
                  name="BannerURL"
                  type="file"
                  accept="image/*"
                  ref={bannerImageInput}
                  onChange={onImageChange}
                  style={{ display: 'none' }}
                />
                <Form.Input
                  value={
                    imageLoading.BannerURL
                      ? global.translate('Working...', 412)
                      : storeImages.BannerURL.name || ''
                  }
                  error={errors.BannerURL || false}
                  className="input-image"
                  placeholder={global.translate('choose an image')}
                  onClick={() => bannerImageInput.current.click()}
                  action={<Image src={inputImage} />}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <span>{global.translate('Select a category')}</span>
              <Form.Select
                error={errors.Category || false}
                onChange={(_, { name, value }) => {
                  handleInputChange({ target: { name, value } });
                }}
                search
                name="Category"
                className="category-selector"
                placeholder="select a category"
                defaultValue={addStoreData.Category}
                options={options}
                actionPosition="left"
              ></Form.Select>
            </Form.Field>
            <TextArea
              rows={2}
              value={addStoreData.Description}
              error={errors.Description || ''}
              placeholder={global.translate('Full description', 354)}
              name="Description"
              onChange={handleInputChange}
              style={{ minHeight: 60 }}
            />
            {errors.Description && (
              <Form.Field style={{ marginTop: '-7px' }}>
                <Label pointing prompt>
                  {global.translate(errors.Description)}
                </Label>
              </Form.Field>
            )}
            <div className="programme">
              <div className="isOpenWeekend">
                <span className="toggle-label">
                  {global.translate('Open in weekends')}
                </span>
                <ToggleSwitch
                  id="isOpenWeekend"
                  name="isOpenWeekend"
                  currentValue={addStoreData.OpenOnWE === 'YES'}
                  onChange={value =>
                    handleInputChange({
                      target: {
                        name: 'OpenOnWE',
                        value: value ? 'YES' : 'NO',
                      },
                    })
                  }
                />
              </div>
              <div className="opening-hours">
                <span>{global.translate('Opening hours')}</span>
                <Dropdown
                  name="OpeningHour"
                  className="hours from"
                  selection
                  search={handleSearch}
                  placeholder="hour"
                  value={addStoreData.OpeningHour}
                  error={errors.OpeningHour || false}
                  onChange={(_, { name, value }) => {
                    handleInputChange({ target: { name, value } });
                  }}
                  options={hours.flat()}
                />
                <span>{global.translate('to')}</span>
                <Dropdown
                  name="ClosingHour"
                  className="hours to"
                  selection
                  search={handleSearch}
                  placeholder="hour"
                  value={addStoreData.ClosingHour}
                  error={errors.ClosingHour || false}
                  onChange={(_, { name, value }) => {
                    handleInputChange({ target: { name, value } });
                  }}
                  options={hours.flat()}
                />
              </div>
            </div>

            <span>
              {global.translate('Store address and contacts', 868)}
            </span>
            <PositionPickerModal
              open={open}
              setOpen={setOpen}
              handleInputChange={handleInputChange}
              defaultLatitude={addStoreData.Latitude}
              defaultLongitude={addStoreData.Longitude}
              addStoreData={addStoreData}
            />
            <Form.Input
              name="Address"
              onChange={handleInputChange}
              value={addStoreData.Address}
              error={errors.Address || errors.position || false}
              type="text"
              required
              width={16}
              action={
                <button
                  className="pick-position"
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  <Icon
                    name="map marker alternate"
                    inverted
                    size="big"
                  />
                </button>
              }
            />
            <PhoneNumberInput
              onChange={handleInputChange}
              value={
                addStoreData.PhoneNumber &&
                addStoreData.PhoneNumber.split(
                  addStoreData.PhoneNumberCode,
                )[1]
              }
              PhoneNumberCode={addStoreData.PhoneNumberCode}
              defaultCountryCode={
                selectedCountry ? selectedCountry.CountryCode : ''
              }
            />
            <div className="country-input">
              <span>
                {global.translate('Select your country', 558)}
                <CountryDropdown
                  options={countries}
                  currentOption={selectedCountry || {}}
                  onChange={handleInputChange}
                  search
                />
              </span>
            </div>

            <span>{global.translate('City', 294)}</span>
            <Form.Input
              name="City"
              value={addStoreData.City}
              onChange={handleInputChange}
              error={errors.City || false}
              className="input-image city"
              type="text"
              actionPosition="left"
              action={<Image src={cityImage} />}
              required
            />

            {addUpdateStore.error && (
              <Form.Field>
                <Label
                  prompt
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {global.translate(addUpdateStore.error.Description)}
                </Label>
              </Form.Field>
            )}
            <Form.Button
              type="button"
              primary
              loading={addUpdateStore.loading}
              onClick={() =>
                !imageLoading.LogoURL &&
                !imageLoading.BannerURL &&
                !addUpdateStore.loading &&
                handleSubmit()
              }
            >
              {global.translate(
                addStoreData.StoreID === '' ? 'Create' : 'Update',
              )}
            </Form.Button>
          </Form>
        </div>
      </DashboardLayout>
    </>
  );
};

AddStore.propTypes = {
  userData: PropTypes.instanceOf(Object),
  myWallets: PropTypes.instanceOf(Object).isRequired,
  storeCategories: PropTypes.instanceOf(Object),
  addStoreData: PropTypes.instanceOf(Object).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  selectWallet: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func.isRequired,
  addUpdateStore: PropTypes.instanceOf(Object),
  imageLoading: PropTypes.instanceOf(Object),
};

AddStore.defaultProps = {
  userData: {
    data: {},
  },
  storeCategories: {
    data: {},
  },

  errors: {},
  addUpdateStore: {
    success: false,
  },
  imageLoading: {},
};
export default AddStore;
