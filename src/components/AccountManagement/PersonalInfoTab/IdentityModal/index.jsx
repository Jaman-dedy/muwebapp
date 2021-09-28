/* eslint-disable react-hooks/exhaustive-deps */
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
import ReactFlagsSelect from 'react-flags-select';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

import validateImg from 'helpers/image/validateImg';
import ZoomDocIcon from 'assets/images/profile/zoom-doc.svg';
import EditDoc from 'assets/images/profile/edit-doc.svg';

import './style.scss';
import Img from 'components/common/Img';
import DangerMessage from 'components/common/Alert/DangerMessage';
import PreviewImgModal from 'components/common/PreviewImgModal';
import UploadImgButton from 'components/common/UploadImgButton';

const IdentityModal = ({
  open,
  setOpen,
  userData,
  identityConfirmation,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [isImgCorrect, setIsImgCorrect] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const queryParams = queryString.parse(location.search);
  useEffect(() => {
    switch (queryParams.tab) {
      case 'personalInfo':
        setOpen(true);
        break;

      default:
        break;
    }
  }, []);

  const {
    options,
    formData,
    onInputChange,
    selectedDateOfIssue,
    setSelectedDateOfIssue,
    selectedExpiryDate,
    setSelectedExpiryDate,
    selectedCurrentType,
    setSelectedCurrentType,
    handleSubmit,
    loading,
    onImageChange,
    userIdUrlData,
    countryIssue,
    setCountryIssue,
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

  const dismissModal = () => {
    setOpen(false);
    history.replace({});
  };

  return (
    <Modal
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
      className="update-id-info-container"
    >
      <Modal.Content>
        <div className="edit-info-form">
          <h3>{global.translate('Identity confirmation')}</h3>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={global.translate('Identification number')}
                placeholder={global.translate(
                  'Identification number',
                )}
                name="IDNumber"
                value={formData?.IDNumber}
                onChange={onInputChange}
              />
              <Form.Input
                className="type-input"
                control={Select}
                fluid
                label={global.translate('Select type')}
                placeholder={global.translate('Select type')}
                options={options}
                value={formData?.selectedCurrentType}
                defaultValue={selectedCurrentType}
                onChange={(target, { name, value }) => {
                  setSelectedCurrentType(value);
                }}
              />
            </Form.Group>
            <Form.Group widths="equal display-date">
              <div className="date-of-birth">
                <div className="date-label">
                  {global.translate('Date of issue')}
                </div>
                <DatePicker
                  selected={selectedDateOfIssue}
                  maxDate={new Date()}
                  onChange={date => setSelectedDateOfIssue(date)}
                  placeholderText={global.translate(
                    'Provide date of issue',
                  )}
                  className="date-issue"
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
                  placeholderText={global.translate(
                    'Provide the expiry date',
                  )}
                  className="expiry-date"
                />
              </div>
            </Form.Group>
            <Form.Group className="country-issue-dropdown">
              <div className="info-nationality">
                <div className="nationality-label">
                  {global.translate('Country of issue')}
                </div>
                <ReactFlagsSelect
                  selected={countryIssue?.toUpperCase()}
                  onSelect={code => setCountryIssue(code)}
                  searchable
                  placeholder={global.translate(
                    'Select the country of issue',
                  )}
                />
              </div>
            </Form.Group>
          </Form>
        </div>
        <div className="display-doc-img">
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
                  uploadedImg={
                    userIdUrlData?.MediaSourceURL ||
                    userData?.UserIDURL
                  }
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
              <DangerMessage
                description={global.translate(
                  'You haven’t upload a photo of your identity yet.',
                )}
              />
              <UploadImgButton
                name="UserIDURL"
                onChooseFile={onImageChange}
                uploadedImg={
                  userIdUrlData?.MediaSourceURL || userData?.UserIDURL
                }
              />
            </div>
          )}
        </div>
        <div className="update-info-actions">
          <Button className="cancel-button" onClick={dismissModal}>
            {global.translate('Cancel')}
          </Button>

          <Button
            disabled={
              !(
                formData?.IDNumber &&
                selectedCurrentType &&
                selectedDateOfIssue &&
                selectedExpiryDate &&
                userIdUrlData
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
