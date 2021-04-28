/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Form,
  Select,
  Image,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import rawCountries from 'utils/countries';
import validateImg from 'helpers/image/validateImg';
import ZoomDocIcon from 'assets/images/profile/zoom-doc.svg';
import EditDoc from 'assets/images/profile/edit-doc.svg';

import './style.scss';
import Img from 'components/common/Img';
import DangerMessage from 'components/common/Alert/DangerMessage';
import UploadImgButton from 'components/common/UploadImgButton';
import PreviewImgModal from 'components/common/PreviewImgModal';

const IdentityModal = ({
  open,
  setOpen,
  userData,
  identityConfirmation,
}) => {
  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));
  const [isImgCorrect, setIsImgCorrect] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const {
    options,
    formData,
    onInputChange,
    selectedDateOfIssue,
    setSelectedDateOfIssue,
    selectedExpiryDate,
    setSelectedExpiryDate,
    onCountryChange,
    selectedCountry,
    selectedCurrentType,
    setSelectedCurrentType,
    handleSubmit,
    loading,
    onImageChange,
    userIdUrlData,
  } = identityConfirmation;

  useEffect(() => {
    if (userData?.UserIDURL) {
      validateImg(userData?.UserIDURL).then(
        function fulfilled(img) {
          setIsImgCorrect(true);
        },

        function rejected() {
          setIsImgCorrect(false);
        },
      );
    }
  }, [userData]);

  return (
    <Modal
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
      className="manage-phone-container"
    >
      <Modal.Content>
        <div className="edit-info-form">
          <h3>{global.translate('Identity confirmation')}</h3>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Identification number"
                placeholder="Identification number"
                name="IDNumber"
                value={formData?.IDNumber}
                onChange={onInputChange}
              />
              <Form.Input
                className="type-input"
                control={Select}
                fluid
                label="Select type"
                placeholder="Select type"
                options={options}
                value={formData?.selectedCurrentType}
                defaultValue={selectedCurrentType}
                onChange={(target, { name, value }) => {
                  setSelectedCurrentType(value);
                }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <div className="date-of-birth">
                <div className="date-label">
                  {global.translate('Date of issue')}
                </div>
                <DatePicker
                  selected={selectedDateOfIssue}
                  minDate={new Date()}
                  onChange={date => setSelectedDateOfIssue(date)}
                  placeholderText="Provide date of issue"
                />
              </div>
              <div className="date-of-birth">
                <div className="date-label">
                  {global.translate('Expiry date')}
                </div>
                <DatePicker
                  selected={selectedExpiryDate}
                  minDate={new Date()}
                  onChange={date => setSelectedExpiryDate(date)}
                  placeholderText="Provide the expiry date"
                />
              </div>
            </Form.Group>
            <Form.Group style={{ maxWidth: '51%' }}>
              <div className="info-nationality">
                <div className="nationality-label">
                  {global.translate('Country of issue')}
                </div>
                <CountryDropdown
                  options={countries}
                  currentOption={selectedCountry}
                  onChange={onCountryChange}
                  search
                  fluid
                />
              </div>
            </Form.Group>
          </Form>
        </div>
        <div>
          <div className="copy-title">
            {global.translate('Copy of identification')}
          </div>
          {isImgCorrect || userIdUrlData ? (
            <div className="id-copy">
              <div
                className="images-doc-actions"
                onClick={() => setOpenPreview(true)}
              >
                <Image src={ZoomDocIcon} />
              </div>
              <div className="edit-delete-doc">
                <UploadImgButton
                  name="UserIDURL"
                  onChooseFile={onImageChange}
                  img
                  src={EditDoc}
                />
              </div>
              <div className="overlay" />
              <Img
                src={
                  userIdUrlData?.MediaSourceURL || userData?.UserIDURL
                }
                not_rounded
                compress
                format="png"
                className="user-doc-img"
                style={{ width: '100%', height: '217px' }}
              />
            </div>
          ) : (
            <div>
              <DangerMessage description="You haven’t upload a photo of your identity yet." />
              <UploadImgButton
                name="UserIDURL"
                onChooseFile={onImageChange}
              />
            </div>
          )}
        </div>
        <div className="update-info-actions">
          <Button
            className="cancel-button"
            onClick={() => setOpen(false)}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            disabled={
              !(
                formData?.IDNumber &&
                selectedCurrentType &&
                selectedDateOfIssue &&
                selectedExpiryDate
              )
            }
            className="change-button"
            onClick={handleSubmit}
            loading={loading}
          >
            {global.translate('Change')}
          </Button>
        </div>
      </Modal.Content>
      <PreviewImgModal
        setOpen={setOpenPreview}
        open={openPreview}
        imgToPreview={
          userIdUrlData?.MediaSourceURL || userData?.UserIDURL
        }
      />
    </Modal>
  );
};

IdentityModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  selectedCountry: PropTypes.func,
  onCountryChange: PropTypes.func,
  userData: PropTypes.objectOf(PropTypes.any),
  identityConfirmation: PropTypes.objectOf(PropTypes.any),
};
IdentityModal.defaultProps = {
  open: false,
  setOpen: () => {},
  selectedCountry: () => {},
  onCountryChange: () => {},
  userData: {},
  identityConfirmation: {},
};

export default IdentityModal;
