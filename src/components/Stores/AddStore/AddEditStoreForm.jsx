import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  Form,
  TextArea,
  Image,
  Label,
  Icon,
  Input,
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import phoneCodes from 'utils/phoneCodes';
import 'react-phone-input-2/lib/style.css';

import cityImage from 'assets/images/city-image.png';
import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import ToggleSwitch from 'components/common/ToggleButton';
import rawCountries from 'utils/countries';
import Img from 'components/common/Img';
import ImagePreviewModal from 'components/common/ImagePreviewModal';
import PositionPickerModal from 'components/common/PositionPicker';
import imagePlaceholder from 'assets/images/image-placeholder.png';

import PhoneNumberInput from 'components/common/PhoneNumberInput';
import ConfirmImageModal from './ConfirmImageModal';

const AddEditStoreForm = ({
  errors,
  handleSubmit,
  addUpdateStore,
  handleInputChange,
  handleImageUpload,
  handleLocation,
  imageLoading,
  addStoreData,
  currentStore,
  isEditing,
  logoUrl,
  bannerUrl,
}) => {
  const logoImageInput = useRef(null);
  const bannerImageInput = useRef(null);
  const [storeImages, setStoreImages] = useState({
    LogoURL: {},
    BannerURL: {},
  });

  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [confirmImageModalOpen, setConfirmImageModalOpen] = useState(
    false,
  );
  const [modalImage, setModalImage] = useState('');
  const [imagePreviewSrc, setImagePreviewSrc] = useState('');
  const [hasLogoError, setHasLogoError] = useState(false);
  const [hasBannerError, setHasBannerError] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const { userLocationData } = useSelector(({ user }) => user);
  const { storeCategories } = useSelector(({ stores }) => stores);

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: flag,
    CountryCode: key,
  }));
  useEffect(() => {
    const foundSelectedCountry = countries.find(({ CountryCode }) => {
      if (addStoreData.CountryCode) {
        return (
          CountryCode.toLocaleLowerCase() ===
          addStoreData.CountryCode.toLocaleLowerCase()
        );
      }

      return CountryCode === userLocationData.CountryCode;
    });

    handleInputChange({
      target: {
        name: 'CountryCode',
        value:
          addStoreData.CountryCode || userLocationData.CountryCode,
      },
    });

    setSelectedCountry(foundSelectedCountry || null);
  }, [userLocationData.CountryCode, addStoreData.CountryCode]);

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
    if (files[0]) {
      setStoreImages({ ...storeImages, [name]: files[0] });
      setModalImage(name);
      setConfirmImageModalOpen(true);
    }
    target.value = '';
  };

  const uploadImage = ({ name, value }) => {
    handleImageUpload({
      target: {
        name,
        value,
      },
    });
  };

  const chooseLogoImage = () => {
    logoImageInput.current.click();
  };
  const chooseBannerImage = () => {
    bannerImageInput.current.click();
  };
  useEffect(() => {
    if (addStoreData?.CountryCode) {
      const phoneCode = phoneCodes.find(
        record =>
          record.countryCode.toLocaleLowerCase() ===
          addStoreData?.CountryCode?.toLocaleLowerCase(),
      );

      if (phoneCode) {
        handleInputChange({
          target: {
            name: 'PhoneNumberCode',
            value: phoneCode.phoneCode,
          },
        });
      }
    }
  }, [addStoreData?.CountryCode]);

  const phoneInput = useMemo(() => {
    if (!isEditing) {
      return (
        <PhoneNumberInput
          onChange={handleInputChange}
          value={
            addStoreData.PhoneNumber &&
            addStoreData.PhoneNumber.split(
              addStoreData.PhoneNumberCode,
            )[1]
          }
          PhoneNumberCode={addStoreData?.PhoneNumberCode}
          defaultCountryCode={addStoreData?.CountryCode}
        />
      );
    }

    return (
      <PhoneNumberInput
        onChange={handleInputChange}
        value={addStoreData.PhoneNumber?.split(
          addStoreData.PhoneNumberCode,
        )[1]?.replace(/ /g, '')}
        PhoneNumberCode={`+${addStoreData.PhoneNumberCode}`}
        defaultCountryCode={addStoreData.CountryCode}
      />
    );
  }, [addStoreData, isEditing]);

  return (
    <>
      <ImagePreviewModal
        open={openPreview}
        setOpen={setOpenPreview}
        src={imagePreviewSrc}
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
            <span>{global.translate('Upload the logo', 1244)}</span>
            <input
              name="LogoURL"
              type="file"
              accept="image/jpeg, image/png"
              ref={logoImageInput}
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
            <div
              className="image-preview"
              style={{ borderRadius: 5 }}
            >
              <Img
                className="image-self"
                width="100%"
                height={135}
                style={{
                  objectFit: 'cover',
                  borderRadius: 5,
                  width: '100%',
                  height: 135,
                }}
                not_rounded
                compress
                src={
                  logoUrl ||
                  addStoreData.LogoURL ||
                  currentStore.StoreLogo
                }
                hasError={hasLogoError}
                setHasError={setHasLogoError}
                alt={
                  <div className="img-placeholder">
                    <Image
                      className="image-self"
                      width={35}
                      alt=""
                      src={imagePlaceholder}
                      hasError={hasLogoError}
                      setHasError={setHasLogoError}
                      onClick={() => logoImageInput.current.click()}
                    />
                    <span>
                      {global.translate('No logo yet', 2024)}
                    </span>
                  </div>
                }
                onClick={() => {
                  setImagePreviewSrc(
                    logoUrl || currentStore.StoreLogo,
                  );
                  setOpenPreview(true);
                }}
              />
            </div>
            <div
              className="input-image"
              onClick={() => logoImageInput.current.click()}
            >
              <Input
                error={errors.StoreLogo || false}
                className="input-button"
                placeholder={
                  hasLogoError
                    ? global.translate('Choose an image', 1245)
                    : global.translate('Choose the image', 2025)
                }
                onClick={() => logoImageInput.current.click()}
                actionPosition="left"
                action={<Image src={imagePlaceholder} />}
                disabled
              />
            </div>
          </Form.Field>
          <ConfirmImageModal
            open={confirmImageModalOpen}
            setOpen={setConfirmImageModalOpen}
            loading={imageLoading.BannerURL || imageLoading.LogoURL}
            uploadImage={uploadImage}
            modalImage={modalImage}
            storeImages={storeImages}
            chooseLogoImage={chooseLogoImage}
            chooseBannerImage={chooseBannerImage}
          />
          <Form.Field>
            <span>
              {global.translate('Upload a cover photo', 1226)}
            </span>
            <input
              name="BannerURL"
              type="file"
              accept="image/jpeg, image/png"
              ref={bannerImageInput}
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
            <div
              className="image-preview"
              style={{ borderRadius: 5 }}
            >
              <Img
                className="image-self"
                width="100%"
                height={135}
                style={{
                  objectFit: 'cover',
                  borderRadius: 5,
                  width: '100%',
                  height: 135,
                }}
                not_rounded
                compress
                src={bannerUrl || currentStore.StoreBanner}
                hasError={hasBannerError}
                setHasError={setHasBannerError}
                alt={
                  <div className="img-placeholder">
                    <Image
                      className="image-self"
                      width={35}
                      alt=""
                      src={imagePlaceholder}
                      hasError={hasLogoError}
                      onClick={() => bannerImageInput.current.click()}
                      setHasError={setHasLogoError}
                    />
                    <span>
                      {global.translate('No cover photo yet', 2026)}
                    </span>
                  </div>
                }
                onClick={() => {
                  setImagePreviewSrc(
                    bannerUrl || currentStore.StoreBanner,
                  );
                  setOpenPreview(true);
                }}
              />
            </div>
            <div
              className="input-image"
              onClick={() => bannerImageInput.current.click()}
            >
              <Input
                error={errors.BannerURL || false}
                className="input-button"
                placeholder={
                  hasBannerError
                    ? global.translate('choose an image', 1245)
                    : global.translate('Choose the image', 2025)
                }
                actionPosition="left"
                action={
                  <Image
                    src={imagePlaceholder}
                    onClick={() => bannerImageInput.current.click()}
                  />
                }
                disabled
              />
            </div>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <p className="labelStyle">
            {global.translate('Select a category', 1227)}
          </p>
          <Form.Select
            error={errors.Category || false}
            onChange={(_, { name, value }) => {
              handleInputChange({ target: { name, value } });
            }}
            search
            name="Category"
            className="category-selector"
            placeholder={global.translate('Select a category', 1227)}
            selectedLabel={addStoreData.CategoryText}
            options={options}
            value={addStoreData.Category}
            actionPosition="left"
          />
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
              {global.translate('Open on weekends', 866)}
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
          <Form.Group className="opening-hours-group">
            <span className="opening-hours-group-label">
              {global.translate('Opening hours', 867)}
            </span>
            <div className="dropdowns">
              <Form.Dropdown
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
              <span className="to-label">
                {global.translate('to')}
              </span>
              <Form.Dropdown
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
          </Form.Group>
        </div>
        <p className="labelStyle">
          {global.translate('Store address and contacts', 868)}
        </p>
        <PositionPickerModal
          open={open}
          setOpen={setOpen}
          handleInputChange={handleLocation}
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
                size="small"
              />
            </button>
          }
        />

        <Form.Group widths="equal">
          <Form.Field>
            <span>{global.translate('Select your country')} </span>
            <CountryDropdown
              options={countries}
              currentOption={selectedCountry}
              onChange={handleInputChange}
              className="full-width"
              search
            />
          </Form.Field>
          <Form.Field>
            <span>{global.translate('City')}</span>
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
          </Form.Field>
        </Form.Group>

        {phoneInput}
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
          {addStoreData.StoreID === ''
            ? global.translate('Create')
            : global.translate('Update')}
        </Form.Button>
      </Form>
    </>
  );
};

AddEditStoreForm.propTypes = {
  errors: PropTypes.objectOf(PropTypes.any),
  handleSubmit: PropTypes.func,
  addUpdateStore: PropTypes.objectOf(PropTypes.any),
  handleInputChange: PropTypes.func,
  handlePhoneChange: PropTypes.func,
  handleLocation: PropTypes.func,
  handleImageUpload: PropTypes.func,
  imageLoading: PropTypes.bool,
  addStoreData: PropTypes.objectOf(PropTypes.any),
  currentStore: PropTypes.objectOf(PropTypes.any),
  isEditing: PropTypes.bool,
  logoUrl: PropTypes.string,
  bannerUrl: PropTypes.string,
};
AddEditStoreForm.defaultProps = {
  errors: null,
  handleSubmit: () => {},
  addUpdateStore: null,
  handleInputChange: () => {},
  handlePhoneChange: () => {},
  handleLocation: () => {},
  handleImageUpload: () => {},
  imageLoading: false,
  addStoreData: null,
  currentStore: {},
  isEditing: false,
  logoUrl: '',
  bannerUrl: '',
};

export default AddEditStoreForm;
