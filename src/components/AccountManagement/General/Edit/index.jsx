/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Icon, Label } from 'semantic-ui-react';

import './Edit.scss';
import PositionPickerModal from 'components/common/PositionPicker';
import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import rawCountries from 'utils/countries';

const EditGeneralInfo = ({ general }) => {
  const { userLocationData } = useSelector(({ user }) => user);
  const {
    handleInputChange,
    errors,
    generalData,
    handleSubmit,
    saveUserData,
  } = general;

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));

  const [selectedCountry, setSelectedCountry] = useState({});

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
      setSelectedCountry(selectedCountry);
    }
  }, [generalData]);

  return (
    <div className="edit-general-info">
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
            // addStoreData={addStoreData}
          />
          <Form.Input
            name="Address1"
            value={generalData.Address1}
            onChange={handleInputChange}
            error={errors.Address1 || false}
            placeholder={global.translate('Street')}
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
                  size="big"
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
            placeholder={global.translate('Description')}
            className="description"
            type="text"
            required
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            name="City"
            value={generalData.City}
            onChange={handleInputChange}
            error={errors.City || false}
            placeholder={global.translate('City')}
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
              placeholder={global.translate('State')}
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
              placeholder={global.translate('Zip Code')}
              className="zip-code"
              type="text"
            />
          </Form.Field>
        </Form.Group>
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
          primary
          loading={saveUserData.loading}
          onClick={() => !saveUserData.loading && handleSubmit()}
        >
          {global.translate('Update')}
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
