/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Icon, Label, Input, Image } from 'semantic-ui-react';

import './Edit.scss';
import PositionPickerModal from 'components/common/PositionPicker';
import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import rawCountries from 'utils/countries';
import useWindowSize from 'utils/useWindowSize';
import imagePlaceholder from 'assets/images/image-placeholder.png';
import Img from 'components/common/Img';
import ImagePreviewModal from 'components/common/ImagePreviewModal';
import ImageCroper from 'components/common/ImageCroper/CropImage';

const EditGeneralInfo = ({ general }) => {
  const { userLocationData } = useSelector(({ user }) => user);
  const {
    handleInputChange,
    errors,
    generalData,
    handleSubmit,
    saveUserData,
    userDocs,
    onImageChange,
    userData,
    cropImgState,
    setCropImgState,
    loadingImg,
    imgFile,
    uploadProofImages,
  } = general;
  const logoImageInput = useRef(null);
  const { data } = userData;
  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));
  const { width } = useWindowSize();
  const [selectedCountry, setSelectedCountry] = useState({});
  const [hasError, setHasError] = useState(false);
  const [imagePreviewSrc, setImagePreviewSrc] = useState('');
  const [openImgPreview, setOpenImgPreview] = useState(false);

  const [open, setOpen] = useState(false);

  const onCountryChange = ({ target: { value } }) => {
    const selectedCountry = countries.find(({ CountryCode }) => {
      return CountryCode === value;
    });

    if (selectedCountry)
      handleInputChange({
        target: {
          name: 'CountryName',
          value: selectedCountry.CountryName,
        },
      });
  };

  useEffect(() => {
    if (generalData.CountryName) {
      const selectedCountry = countries.find(({ CountryName }) => {
        return (
          CountryName.includes(generalData.CountryName) ||
          generalData.CountryName.includes(CountryName)
        );
      });
      setSelectedCountry(selectedCountry);
    } else {
      const selectedCountry = countries.find(({ CountryCode }) => {
        return CountryCode === userLocationData.CountryCode;
      });

      handleInputChange({
        target: {
          name: 'CountryName',
          value: selectedCountry ? selectedCountry.CountryName : '',
        },
      });
      setSelectedCountry(selectedCountry);
    }
  }, [generalData]);

  const chooseImage = () => {
    logoImageInput.current.click();
  };

  return (
    <div className="edit-general-info">
      <ImagePreviewModal
        open={openImgPreview}
        setOpen={setOpenImgPreview}
        src={imagePreviewSrc}
      />
      <ImageCroper
        open={cropImgState}
        setOpen={setCropImgState}
        loading={loadingImg}
        file={imgFile}
        uploadImage={uploadProofImages}
        chooseImage={chooseImage}
      />
      <Form>
        <Form.Field>
          <Form.Input
            name="FirstName"
            value={generalData.FirstName}
            onChange={handleInputChange}
            error={errors.FirstName || false}
            placeholder={global.translate('First Name', 8)}
            className="first-name"
            type="text"
            required
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            name="LastName"
            value={generalData.LastName}
            onChange={handleInputChange}
            error={errors.LastName || false}
            placeholder={global.translate('Last Name', 9)}
            className="last-name"
            type="text"
            required
          />
        </Form.Field>
        <Form.Field>
          <span>{global.translate('Select the country', 558)}</span>
          <CountryDropdown
            options={countries}
            currentOption={selectedCountry}
            onChange={onCountryChange}
            search
          />
        </Form.Field>
        <Form.Field>
          <PositionPickerModal
            open={open}
            setOpen={setOpen}
            handleInputChange={handleInputChange}
          />
          <Form.Input
            name="Address1"
            value={generalData.Address1}
            onChange={handleInputChange}
            error={errors.Address1 || false}
            placeholder={global.translate('Street', 298)}
            className="last-name"
            type="text"
            required
            action={
              <button
                className="pick-position"
                type="button"
                onClick={() => setOpen(true)}
              >
                <Icon
                  name="map marker alternate"
                  inverted
                  size={width > 500 ? 'big' : 'small'}
                />
              </button>
            }
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            name="Address2"
            value={generalData.Address2}
            onChange={handleInputChange}
            error={errors.Address2 || false}
            placeholder={global.translate('Bio')}
            className="description"
            type="text"
            required
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            name="City"
            value={generalData.City || ''}
            onChange={handleInputChange}
            error={errors.City || false}
            placeholder={global.translate('City', 294)}
            className="city"
            type="text"
            required
          />
        </Form.Field>
        <Form.Group>
          <Form.Field width={10}>
            <Form.Input
              name="State"
              value={generalData.State}
              onChange={handleInputChange}
              error={errors.State || false}
              placeholder={global.translate('State', 296)}
              className="state"
              type="text"
            />
          </Form.Field>
          <Form.Field width={6}>
            <Form.Input
              name="POBox"
              value={generalData.POBox}
              error={errors.POBox || false}
              onChange={handleInputChange}
              placeholder={global.translate('Zip Code', 295)}
              className="zip-code"
              type="text"
            />
          </Form.Field>
        </Form.Group>
        <br />
        <Form.Field>
          <span>
            {global.translate('Upload your proof of residence', 2186)}
          </span>
          <input
            name="UserProofOfAddressURL"
            type="file"
            accept="image/jpeg, image/png"
            ref={logoImageInput}
            onChange={onImageChange}
            style={{ display: 'none' }}
          />
          <div className="preview-proof-img">
            <Img
              width="100%"
              height={135}
              style={{
                objectFit: 'cover',
                borderRadius: 5,
                width: '100%',
                height: 135,
                marginTop: '-32px',
              }}
              src={
                (userDocs.UserProofOfAddressURL &&
                  userDocs.UserProofOfAddressURL.imageUrl) ||
                (data && data.UserProofOfAddressURL)
              }
              not_rounded
              compress
              hasError={hasError}
              setHasError={setHasError}
              alt={
                <div className="img-placeholder">
                  <Image
                    className="image-self"
                    width={35}
                    alt=""
                    src={imagePlaceholder}
                    onClick={() => logoImageInput.current.click()}
                  />
                  <span>
                    {global.translate(
                      'No proof of residence yet',
                      2187,
                    )}
                  </span>
                </div>
              }
              onClick={() => {
                setOpenImgPreview(true);
                setImagePreviewSrc(
                  (userDocs.UserProofOfAddressURL &&
                    userDocs.UserProofOfAddressURL.imageUrl) ||
                    (data && data.UserProofOfAddressURL),
                );
              }}
            />
          </div>
          <div className="upload-proof">
            <Form.Input
              className="input-image"
              placeholder={global.translate('Choose an image', 1245)}
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

        {saveUserData.error && (
          <Form.Field style={{ marginTop: '7px', width: '100%' }}>
            <Label
              prompt
              style={{ width: '100%', textAlign: 'center' }}
            >
              {global.translate(saveUserData.error.Description)}
            </Label>
          </Form.Field>
        )}

        <Form.Button
          type="button"
          secondary
          className="update-btn"
          color="gray"
          loading={saveUserData.loading}
          onClick={() => !saveUserData.loading && handleSubmit()}
        >
          {global.translate('Update', 1842)}
        </Form.Button>
      </Form>
    </div>
  );
};

EditGeneralInfo.propTypes = {
  general: PropTypes.instanceOf(Object),
};

EditGeneralInfo.defaultProps = {
  general: {},
};

export default EditGeneralInfo;
