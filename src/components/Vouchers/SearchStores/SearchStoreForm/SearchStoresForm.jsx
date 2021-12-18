/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Image,
  Icon,
  Grid,
  Dropdown,
  Form,
  Button,
} from 'semantic-ui-react';

import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import CityIcon from 'assets/images/city-image.png';
import CategoryIcon from 'assets/images/category-list.png';
import StoresIcon from 'assets/images/cartIcon.png';
import ToggleSwitch from 'components/common/ToggleButton';
import rawCountries from 'utils/countries';
import './SearchStoresForm.scss';

const SearchStoresForm = ({
  form,
  handleInputChange,
  storeCategories,
  searchStoresFx,
  setHasSearched,
}) => {
  const { userLocationData } = useSelector(({ user }) => user);

  const { searchStore } = useSelector(state => state.voucher);

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://flagcdn.com/h20/${flag}.png`,
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

  return (
    <div className="searchStores">
      <div className="add-money-container">
        <Grid stackable columns={2}>
          <Grid.Column>
            <div className="form-compo">
              <span className="form-labels">
                {global.translate(
                  'Select a destination country',
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
            <div className="form-labels">
              {global.translate('City')}
            </div>
            <Form.Input
              className="input"
              placeholder={global.translate('City')}
              name="City"
              onChange={e => handleInputChange(e)}
            />
          </Grid.Column>
        </Grid>

        <Grid stackable columns={2} className="form-compo2">
          <Grid.Column>
            <span className="form-labels">
              {global.translate('Category')}
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
              {global.translate('Store name')}
            </span>
            <Form.Input
              className="input"
              placeholder={global.translate('Store name')}
              name="StoreName"
              onChange={e => handleInputChange(e)}
            />
          </Grid.Column>
        </Grid>
        <Grid stackable columns={2} className="form-compo">
          <Grid.Column className="excl-toggle">
            <div className="flex flex-row align-items-center justify-content-space-between">
              <span>
                <div className="toggle-el">
                  {global.translate('Match all')}
                </div>
                <div className="toggle--switch">
                  <ToggleSwitch
                    id="Scope"
                    name="Scope"
                    onChange={value =>
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
                onClick={() => {
                  searchStoresFx();
                  setHasSearched();
                }}
                loading={searchStore.loading}
                disabled={!form.City && !form.Category}
              >
                <span style={{ marginLeft: 'auto' }}>
                  <span className="bold">
                    {global.translate('Search')}{' '}
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

export default SearchStoresForm;
