import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Icon,
  Grid,
  Dropdown,
  Form,
  Button,
} from 'semantic-ui-react';

import CountryDropdown from 'components/common/Dropdown/CountryDropdown';

import ToggleSwitch from 'components/common/ToggleButton';
import rawCountries from 'utils/countries';
import './SearchStoresForm.scss';

const SearchStoresForm = ({
  form,
  handleInputChange,
  storeCategories,
  searchStoresFx,
}) => {
  const { userLocationData } = useSelector(({ user }) => user);

  const { searchStore } = useSelector(state => state.voucher);

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));

  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    const thisCountry = countries.find(({ CountryCode }) => {
      if (form.CountryCode) {
        return CountryCode === form.CountryCode;
      }
      const Country = countries.find(
        ({ CountryCode }) =>
          CountryCode === userLocationData.CountryCode,
      );

      handleInputChange({
        target: {
          name: 'CountryCode',
          value: Country
            ? Country.CountryCode
            : userLocationData.CountryCode,
        },
      });

      return Country
        ? CountryCode === Country.CountryCode
        : CountryCode === userLocationData.CountryCode;
    });

    setSelectedCountry(thisCountry);
  }, [form.CountryCode, userLocationData]);

  const categoriesOptions = !storeCategories.success
    ? []
    : storeCategories.categoryList
        .filter(({ Category }) => Category)
        .map(({ Category, CategoryName }) => ({
          key: Category,
          text: CategoryName,
          value: Category,
        }));

  const changeStoreName = e => {
    handleInputChange(e);
  };

  useEffect(() => {
    categoriesOptions.unshift({
      key: '',
      text: 'All categories',
      value: '',
    });
  }, [categoriesOptions]);

  return (
    <div className="searchStores">
      <div className="add-money-container">
        <Grid stackable columns={2}>
          <Grid.Column>
            <div className="form-compo">
              <span className="form-labels">
                {global.translate(
                  'Select a destination country',
                  1628,
                )}
              </span>
              <CountryDropdown
                className="country-dropdwn-search-store"
                options={countries}
                currentOption={selectedCountry}
                onChange={handleInputChange}
                search
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            <span className="form-labels">
              {global.translate('City', 294)}
            </span>
            <Form.Input
              className="input"
              placeholder={global.translate('City', 294)}
              name="City"
              onChange={e => handleInputChange(e)}
            />
          </Grid.Column>
        </Grid>

        <Grid stackable columns={2} className="form-compo2">
          <Grid.Column>
            <span className="form-labels">
              {global.translate('Category', 343)}
            </span>
            <div className="icon-form-el">
              <Dropdown
                name="Category"
                className="custom-forms-el"
                placeholder="Category"
                fluid
                search
                selection
                options={categoriesOptions}
                onChange={(_, { name, value }) => {
                  handleInputChange({ target: { name, value } });
                }}
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            <span className="form-labels">
              {global.translate('Store name', 837)}
            </span>
            <Form.Input
              className="input"
              placeholder={global.translate('Store name', 837)}
              name="StoreName"
              onChange={e => changeStoreName(e)}
            />
          </Grid.Column>
        </Grid>
        <Grid stackable columns={2} className="form-compo">
          <Grid.Column className="excl-toggle">
            <div className="flex flex-row align-items-center justify-content-space-between">
              <span>
                <div className="toggle-el">
                  {global.translate('Match all', 1442)}
                </div>
                <div className="toggle--switch">
                  <ToggleSwitch
                    id="Scope"
                    name="Scope"
                    onChange={() =>
                      handleInputChange({
                        target: {
                          name: 'Scope',
                          value: form.Scope === 'AND' ? 'OR' : 'AND',
                        },
                      })
                    }
                  />
                </div>
              </span>
            </div>
          </Grid.Column>

          <Grid.Column className="excl-toggle">
            <span>
              <Button
                className="searchStoresBtn"
                onClick={() => searchStoresFx()}
                loading={searchStore.loading}
                disabled={!form.City && !form.Category}
              >
                <span style={{ marginLeft: 'auto' }}>
                  <span className="bold">
                    {global.translate('Search', 278)}{' '}
                  </span>
                  &nbsp;
                  <Icon name="search" />
                </span>
              </Button>
            </span>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

SearchStoresForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  handleInputChange: PropTypes.func,
  storeCategories: PropTypes.objectOf(PropTypes.any),
  searchStoresFx: PropTypes.func,
};

SearchStoresForm.defaultProps = {
  form: null,
  handleInputChange: () => {},
  storeCategories: null,
  searchStoresFx: () => {},
};

export default SearchStoresForm;
