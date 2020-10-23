import React, { useRef, useState } from 'react';

import {
  Form,
  TextArea,
  Dropdown,
  Image,
  Label,
  Icon,
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cityImage from 'assets/images/city-image.png';
import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import ToggleSwitch from 'components/common/ToggleButton';
import PhoneNumberInput from 'components/common/PhoneNumberInput';
import rawCountries from 'utils/countries';
import Img from 'components/common/Img';
import ImagePreviewModal from 'components/common/ImagePreviewModal';

import imagePlaceholder from 'assets/images/image-placeholder.png';
import PositionPickerModal from './PositionPickerModal';
import ConfirmImageModal from './ConfirmImageModal';

const AddEditStoreForm = ({
  errors,
  handleSubmit,
  addUpdateStore,
  handleInputChange,
  imageLoading,
  storeCategories,
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
      setModalImage(name);
      setConfirmImageModalOpen(true);
    }
  };

  const uploadImage = ({ name, value }) => {
    handleInputChange({
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
              accept="image/*"
              ref={logoImageInput}
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
            <div className="image-preview">
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
                src={logoUrl || currentStore.StoreLogo}
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
            <div className="img-input-wrapper">
              <Form.Input
                error={errors.StoreLogo || false}
                className="input-image"
                placeholder={
                  hasLogoError
                    ? global.translate('Choose an image', 1245)
                    : global.translate('Choose the image', 2025)
                }
                onClick={() => logoImageInput.current.click()}
                actionPosition="left"
                action={
                  <Image
                    src={imagePlaceholder}
                    onClick={() => logoImageInput.current.click()}
                  />
                }
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
              accept="image/*"
              ref={bannerImageInput}
              onChange={onImageChange}
              style={{ display: 'none' }}
            />
            <div className="image-preview">
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
            <div className="img-input-wrapper">
              <Form.Input
                error={errors.BannerURL || false}
                className="input-image"
                placeholder={
                  hasBannerError
                    ? global.translate('choose an image', 1245)
                    : global.translate('Choose the image', 2025)
                }
                onClick={() => bannerImageInput.current.click()}
                actionPosition="left"
                action={
                  <Image
                    src={imagePlaceholder}
                    onClick={() => bannerImageInput.current.click()}
                  />
                }
              />
            </div>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <span>{global.translate('Select a category', 1227)}</span>
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
          <div className="opening-hours">
            <span>{global.translate('Opening hours', 867)}</span>
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
            <span>{global.translate('to', 115)}</span>
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
                size="small"
              />
            </button>
          }
        />
        {!isEditing && (
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
        )}

        {isEditing && (
          <PhoneNumberInput
            onChange={handleInputChange}
            value={addStoreData.PhoneNumber?.split(
              addStoreData.PhoneNumberCode,
            )[1]?.replace(/ /g, '')}
            PhoneNumberCode={`+${addStoreData.PhoneNumberCode}`}
            defaultCountryCode={`+${addStoreData.PhoneNumberCode}`}
          />
        )}

        <div className="country-input">
          <span>
            {global.translate('Select your country', 558)}
            <CountryDropdown
              options={countries}
              currentOption={selectedCountry}
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
          {addStoreData.StoreID === ''
            ? global.translate('Create', 355)
            : global.translate('Update', 368)}
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
  imageLoading: PropTypes.bool,
  storeCategories: PropTypes.objectOf(PropTypes.any),
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
  imageLoading: false,
  storeCategories: null,
  addStoreData: null,
  currentStore: {},
  isEditing: false,
  logoUrl: '',
  bannerUrl: '',
};

export default AddEditStoreForm;
