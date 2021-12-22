import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'semantic-ui-react';
import ReactFlagsSelect from 'react-flags-select';
import DatePicker from 'components/common/DatePicker';
import './style.scss';
import { getDateFromNow } from 'utils';

const UpdateInfoModal = ({ open, setOpen, personalInfo }) => {
  const {
    personalInfoData,
    setPersonalInfoData,
    handleSubmit,
    handleInputChange,
    currentOption,
    options,
    setCurrentOption,
    selectedDate,
    setSelectedDate,
    loading,
    disableButton,
    professionOptions,
    nationalityCountry,
    setNationalityCountry,
    setBornCountry,
    bornCountry,
  } = personalInfo;

  const minDate = useMemo(() => getDateFromNow(-100), []);
  const maxDate = useMemo(() => getDateFromNow(-13), []);

  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="small">
      <Modal.Content>
        <div className="edit-info-form">
          <h3>{global.translate('User information')}</h3>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={`${global.translate('First name')}*`}
                placeholder={global.translate('First name')}
                onChange={handleInputChange}
                name="FirstName"
                value={personalInfoData?.FirstName}
              />
              <Form.Input
                fluid
                label={`${global.translate('Last name')}*`}
                placeholder={global.translate('Last name')}
                onChange={handleInputChange}
                value={personalInfoData?.LastName}
                name="LastName"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                className="gender-input"
                fluid
                label={`${global.translate('Gender')}*`}
                placeholder={global.translate('Select your gender')}
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
                  {`${global.translate('Date of birth')}*`}
                </div>
                <DatePicker
                  maxDate={maxDate}
                  minDate={minDate}
                  date={selectedDate}
                  onDateChange={date => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label={global.translate("Father's name")}
                placeholder={global.translate("Father's name")}
                onChange={handleInputChange}
                value={personalInfoData?.FatherFName}
                name="FatherFName"
              />

              <Form.Input
                fluid
                label={global.translate("Mother's name")}
                placeholder={global.translate("Mother's name")}
                onChange={handleInputChange}
                value={personalInfoData?.MotherFName}
                name="MotherFName"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <div className="info-nationality">
                <div className="nationality-label">
                  {`${global.translate('Nationality')}`}
                </div>
                <ReactFlagsSelect
                  defaultCountry={nationalityCountry?.toUpperCase()}
                  selected={nationalityCountry?.toUpperCase()}
                  onSelect={code => setNationalityCountry(code)}
                  searchable
                  placeholder={global.translate(
                    'Select your country',
                  )}
                />
              </div>
              <div className="info-born-country">
                <div className="nationality-label">
                  {global.translate('Country of birth')}
                </div>
                <ReactFlagsSelect
                  defaultCountry={bornCountry?.toUpperCase()}
                  selected={bornCountry?.toUpperCase()}
                  onSelect={code => setBornCountry(code)}
                  searchable
                  placeholder={global.translate(
                    'Select your country',
                  )}
                />
              </div>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                search
                label={global.translate('City of birth')}
                placeholder={global.translate('City of birth')}
                value={personalInfoData?.CityOfBirth}
                name="CityOfBirth"
                onChange={handleInputChange}
              />
              <Form.Select
                className="gender-input"
                fluid
                label={global.translate('Profession')}
                placeholder={global.translate(
                  'Select your profession',
                )}
                options={professionOptions}
                onChange={(target, { name, value }) => {
                  setCurrentOption(value);
                  setPersonalInfoData({
                    ...personalInfoData,
                    [name]: value,
                  });
                }}
                defaultValue={currentOption}
                name="Profession"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={8}
                label={global.translate('Spouse name')}
                placeholder={global.translate('Spouse name')}
                value={personalInfoData?.SpouseName}
                name="SpouseName"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="update-info-actions">
          <Button
            className="btn--cancel"
            onClick={() => {
              setOpen(false);
            }}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            className="btn--confirm"
            onClick={handleSubmit}
            loading={loading}
            disabled={disableButton}
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
  personalInfo: PropTypes.objectOf(PropTypes.any),
};
UpdateInfoModal.defaultProps = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
  handleInputChange: () => {},
  personalInfo: {},
};

export default UpdateInfoModal;
