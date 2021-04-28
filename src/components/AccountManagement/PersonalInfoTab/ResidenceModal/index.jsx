/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Image, Form } from 'semantic-ui-react';

import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import './style.scss';
import validateImg from 'helpers/image/validateImg';
import DangerMessage from 'components/common/Alert/DangerMessage';
import UploadImgButton from 'components/common/UploadImgButton';
import Img from 'components/common/Img';
import ZoomDocIcon from 'assets/images/profile/zoom-doc.svg';
import EditDoc from 'assets/images/profile/edit-doc.svg';
import PreviewImgModal from 'components/common/PreviewImgModal';

const ResidenceModal = ({
  open,
  setOpen,
  residenceData,
  userData,
}) => {
  const {
    onCountryChange,
    formData,
    countries,
    selectedCountry,
    onInputChange,
    onImageChange,
    loading,
    handleSubmit,
    userIdUrlData,
  } = residenceData;
  const [isImgCorrect, setIsImgCorrect] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    if (userData?.UserProofOfAddressURL) {
      validateImg(userData?.UserProofOfAddressURL).then(
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
          <h3>{global.translate('Proof of residence')}</h3>
          <Form>
            <Form.Group widths="equal">
              <div className="info-nationality">
                <div className="nationality-label">
                  {global.translate('Country')}
                </div>
                <CountryDropdown
                  options={countries}
                  currentOption={selectedCountry}
                  onChange={onCountryChange}
                  search
                  fluid
                />
              </div>
              <Form.Input
                fluid
                label="State"
                placeholder="State"
                onChange={onInputChange}
                name="Address1"
                value={formData?.Address1}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="City"
                placeholder="City"
                onChange={onInputChange}
                name="City"
                value={formData?.City}
              />
              <Form.Input
                fluid
                label="Postal code"
                placeholder="Zip code"
                onChange={onInputChange}
                name="POBox"
                value={formData?.POBox}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Street address"
                placeholder="Street address"
                onChange={onInputChange}
                name="Address2"
                value={formData?.Address2}
              />
            </Form.Group>
          </Form>
        </div>
        <div>
          <div className="copy-title">
            {global.translate('Proof of residence')}
          </div>
          {isImgCorrect || userIdUrlData ? (
            <>
              <div className="id-copy">
                <div
                  className="images-doc-actions"
                  onClick={() => setOpenPreview(true)}
                >
                  <Image src={ZoomDocIcon} />
                </div>
                <div className="edit-delete-doc">
                  <UploadImgButton
                    name="UserProofOfAddressURL"
                    onChooseFile={onImageChange}
                    img
                    src={EditDoc}
                  />
                </div>
                <div className="overlay" />
                <Img
                  className="user-doc-img"
                  src={
                    userIdUrlData?.MediaSourceURL ||
                    userData?.UserProofOfAddressURL
                  }
                  compress
                  format="png"
                  not_rounded
                  style={{ width: '100%', height: '217px' }}
                />
              </div>
            </>
          ) : (
            <div>
              <DangerMessage description="You haven’t upload a photo of your identity yet." />
              <UploadImgButton
                name="UserProofOfAddressURL"
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
            className="change-button"
            loading={loading}
            onClick={handleSubmit}
          >
            {global.translate('Change')}
          </Button>
        </div>
      </Modal.Content>
      <PreviewImgModal
        setOpen={setOpenPreview}
        open={openPreview}
        imgToPreview={
          userIdUrlData?.MediaSourceURL ||
          userData?.UserProofOfAddressURL
        }
      />
    </Modal>
  );
};

ResidenceModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  selectedCountry: PropTypes.func,
  onCountryChange: PropTypes.func,
  residenceData: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any),
};
ResidenceModal.defaultProps = {
  open: false,
  setOpen: () => {},
  selectedCountry: () => {},
  onCountryChange: () => {},
  residenceData: {},
  userData: {},
};

export default ResidenceModal;
