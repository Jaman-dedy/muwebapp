import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import './style.scss';

const UpdateInfoModal = ({ open, setOpen, personalInfo }) => {
  const {
    personalInfoData,
    setPersonalInfoData,
    handleSubmit,
    handleInputChange,
    currentOption,
    options,
    selectedCountry,
    countries,
    setCurrentOption,
    selectedDate,
    setSelectedDate,
    loading,
    handleOnCountryChange,
    handleOnNationalityChange,
    nationality,
    nationalities,
    disableButton,
    professionOptions,
  } = personalInfo;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <Modal.Content>
        <div className="edit-info-form">
          <h3>{global.translate('User information')}</h3>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First name*"
                placeholder="First name"
                onChange={handleInputChange}
                name="FirstName"
                value={personalInfoData?.FirstName}
              />
              <Form.Input
                fluid
                label="Last name*"
                placeholder="Last name"
                onChange={handleInputChange}
                value={personalInfoData?.LastName}
                name="LastName"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                className="gender-input"
                fluid
                label="Gender*"
                placeholder="Select your gender"
                options={options}
                onChange={(target, { name, value }) => {
                  setCurrentOption(value);
                  setPersonalInfoData({
                    ...personalInfoData,
                    [name]: value,
                  });
                }}
                defaultValue={currentOption}
                name="Gender"
              />
              <div className="date-of-birth">
                <div className="date-label">
                  {global.translate('Date of birth*')}
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                />
              </div>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Father's name"
                placeholder="Father's name"
                onChange={handleInputChange}
                value={personalInfoData?.FatherFName}
                name="FatherFName"
              />

              <Form.Input
                fluid
                label="Mother's name"
                placeholder="Mother's name"
                onChange={handleInputChange}
                value={personalInfoData?.MotherFName}
                name="MotherFName"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <div className="info-nationality">
                <div className="nationality-label">
                  {global.translate('Nationality*')}
                </div>
                <CountryDropdown
                  options={nationalities}
                  currentOption={nationality}
                  onChange={handleOnNationalityChange}
                  search
                  fluid
                  name="CountryOfBirth"
                />
              </div>
              <div className="info-nationality">
                <div className="nationality-label">
                  {global.translate('Country of birth')}
                </div>
                <CountryDropdown
                  options={countries}
                  currentOption={selectedCountry}
                  onChange={handleOnCountryChange}
                  search
                  fluid
                  name="CountryOfBirth"
                />
              </div>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="City of birth"
                placeholder="City of birth"
                value={personalInfoData?.CityOfBirth}
                name="CityOfBirth"
                onChange={handleInputChange}
              />
              <Form.Select
                className="gender-input"
                fluid
                label="Profession"
                placeholder="Select your profession"
                options={professionOptions}
                onChange={(target, { name, value }) => {
                  setCurrentOption(value);
                  setPersonalInfoData({
                    ...personalInfoData,
                    [name]: value,
                  });
                }}
                search
                defaultValue={currentOption}
                name="Profession"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={8}
                label="Spouse name"
                placeholder="Spouse name"
                value={personalInfoData?.SpouseName}
                name="SpouseName"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="update-info-actions">
          <Button
            className="cancel-button"
            onClick={() => {
              setOpen(false);
            }}
            disabled={loading}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            className="change-button"
            onClick={handleSubmit}
            loading={loading}
            disabled={disableButton || loading}
          >
            {global.translate('Change')}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
UpdateInfoModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
  handleInputChange: PropTypes.func,
  selectedCountry: PropTypes.objectOf(PropTypes.any),
  onCountryChange: PropTypes.func,
  personalInfo: PropTypes.objectOf(PropTypes.any),
};
UpdateInfoModal.defaultProps = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
  handleInputChange: () => {},
  selectedCountry: {},
  onCountryChange: () => {},
  personalInfo: {},
};

export default UpdateInfoModal;
