/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Label, Icon, Checkbox, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Loader from 'components/common/Loader';
import WalletDropdown from 'components/common/Dropdown/WalletDropdown';
import CountryDropdown from 'components/common/Dropdown/CountryDropdown';
import rawCountries from 'utils/countries';
import calcPublicityCostAction from 'redux/actions/publicity/calcPublicityCost';
import ConfirmExecutePublicity from './ConfirmExecutePublicity';

const CustomisedAudienceTab = ({
  userData: { data = {} },
  currentPublicity,
  executePublicityData,
  errors,
  handleInputChange,
  customAudience,
  handleSubmit,
  executeCampaing,
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [selectedWallet, setSellectedWallet] = useState({});

  const {
    sample,
    addSampleForm,
    removeSampleForm,
    handleSampleInputChange,
  } = customAudience;
  const { calcPublicityCost } = useSelector(
    ({ publicity }) => publicity,
  );

  useEffect(() => {
    if (
      calcPublicityCost &&
      !calcPublicityCost.loading &&
      calcPublicityCost.success
    ) {
      if (calcPublicityCost.changed) {
        handleInputChange({
          target: {
            name: calcPublicityCost.changed,
            value: calcPublicityCost[
              calcPublicityCost.changed
            ].replace(/,/g, ''),
          },
        });
      }
    }
  }, [calcPublicityCost]);

  useEffect(() => {
    handleInputChange({
      target: {
        name: 'ContactsOnly',
        value: 'No',
      },
    });
    if (data && data.Wallets && data.Wallets.length >= 0) {
      const { Wallets = [] } = data;
      const defaulWallet = Wallets.find(
        ({ Default }) => Default === 'YES',
      );
      handleInputChange({
        target: {
          name: 'SourceWallet',
          value: defaulWallet.AccountNumber,
        },
      });

      setSellectedWallet(defaulWallet || Wallets[0]);
    }
  }, [data]);

  const countries = rawCountries.map(({ text, flag, key }) => ({
    CountryName: text,
    Flag: `https://www.countryflags.io/${flag}/flat/32.png`,
    CountryCode: key,
  }));

  return (
    <div className="customised-audience-form-container">
      <ConfirmExecutePublicity
        open={open}
        setOpen={setOpen}
        item={currentPublicity}
        onPositiveConfirm={executeCampaing}
        executePublicityData={executePublicityData}
      />
      <Form className="customised-audience-form">
        <div className="form-label">
          {global.translate('Select a wallet', 1286)}
        </div>
        <WalletDropdown
          keyName="SourceWallet"
          placeholder={global.translate('Select a wallet', 1286)}
          options={(data && data.Wallets) || []}
          currentOption={selectedWallet}
          onChange={e => handleInputChange(e)}
          setCurrentOption={setSellectedWallet}
        />
        <br />
        <div className="form-label">
          {global.translate('What is your budget?', 1562)}
        </div>
        <Form.Input
          placeholder={global.translate(
            'Provide your budget here',
            1568,
          )}
          value={executePublicityData.Budget || ''}
          error={errors.Budget || false}
          className="input-image"
          type="number"
          name="Budget"
          actionPosition="right"
          onKeyDown={e => {
            if (
              e.key === 'Enter' &&
              executePublicityData.SourceWallet &&
              executePublicityData.Budget
            ) {
              calcPublicityCostAction({
                SourceWallet: executePublicityData.SourceWallet,
                Budget: executePublicityData.Budget,
                Audience: '',
              })(dispatch);
            }
          }}
          onBlur={() => {
            if (
              executePublicityData.Budget &&
              executePublicityData.SourceWallet
            ) {
              calcPublicityCostAction({
                SourceWallet: executePublicityData.SourceWallet,
                Budget: executePublicityData.Budget,
                Audience: '',
              })(dispatch);
            }
          }}
          onChange={({ target: { name, value } }) =>
            handleInputChange({
              target: { name, value },
            })
          }
          action={
            <Label
              className="input-action-percent"
              style={{ fontSize: '1rem' }}
            >
              {calcPublicityCost.loading ? (
                <Loader />
              ) : executePublicityData.SourceWallet ? (
                executePublicityData.SourceWallet.split('-')[0]
              ) : (
                selectedWallet.AccountNumber &&
                selectedWallet.AccountNumber.split('-')[0]
              )}
            </Label>
          }
        />
        <div className="form-label">
          {global.translate(
            'The number of people (Audience) to be reached',
            1563,
          )}
        </div>
        <Form.Input
          placeholder={global.translate(
            'Provide the audience here',
            1567,
          )}
          value={executePublicityData.Audience || ''}
          error={errors.Audience || false}
          className="input-image"
          type="number"
          name="Audience"
          actionPosition="right"
          onKeyDown={e => {
            if (
              e.key === 'Enter' &&
              executePublicityData.SourceWallet &&
              executePublicityData.Audience
            ) {
              calcPublicityCostAction({
                SourceWallet: executePublicityData.SourceWallet,
                Audience: executePublicityData.Audience,
                Budget: '',
              })(dispatch);
            }
          }}
          onBlur={() => {
            if (
              executePublicityData.Audience &&
              executePublicityData.SourceWallet
            ) {
              calcPublicityCostAction({
                SourceWallet: executePublicityData.SourceWallet,
                Audience: executePublicityData.Audience,
                Budget: '',
              })(dispatch);
            }
          }}
          onChange={({ target: { name, value } }) =>
            handleInputChange({
              target: { name, value },
            })
          }
        />
        <div className="form-label">
          {global.translate(
            'Select the countries you are targeting',
            1564,
          )}
        </div>
        {sample.map(
          ({ CountryCode: countryCode = '', Percent, index }) => {
            const selectedCountry = countries.find(
              ({ CountryCode }) => {
                return (
                  CountryCode.toLowerCase() ===
                  countryCode.toLowerCase()
                );
              },
            );
            return (
              <Form.Group
                key={index}
                className="country-target flex relative"
              >
                <Form.Field width={11}>
                  <CountryDropdown
                    options={countries}
                    currentOption={selectedCountry}
                    onChange={({ target: { name, value } }) =>
                      handleSampleInputChange({
                        target: { name, value, index },
                      })
                    }
                    keyName={`CountryCode${index}`}
                    search
                  />
                </Form.Field>
                <Form.Field width={5}>
                  <Form.Input
                    value={Number(Percent || 0)}
                    className="input-percentage"
                    type="number"
                    name={`Percentage${index}`}
                    max={100}
                    min={0}
                    actionPosition="left"
                    action={
                      <Label className="input-action-percent">
                        %
                      </Label>
                    }
                    onChange={({ target: { name, value } }) =>
                      handleSampleInputChange({
                        target: { name, value, index },
                      })
                    }
                  />
                </Form.Field>
                <div className="action-icons flex">
                  <Icon
                    name="add circle"
                    className="circle-add cursor-pointer"
                    size="big"
                    onClick={() => addSampleForm()}
                  />
                  {index !== 0 && (
                    <Icon
                      name="times circle"
                      className="circle-remove cursor-pointer"
                      size="big"
                      onClick={() => removeSampleForm(index)}
                    />
                  )}
                </div>
              </Form.Group>
            );
          },
        )}
        {errors.Sample && (
          <Form.Field style={{ marginTop: '7px', width: '100%' }}>
            <Label
              prompt
              style={{ width: '100%', textAlign: 'center' }}
            >
              {errors.Sample}
            </Label>
          </Form.Field>
        )}
        <fieldset className="xxlarge-h-padding">
          <legend>
            {global.translate('Customize your audience', 1565)}
          </legend>
          <Grid stackable columns={2}>
            <Grid.Column width={8}>
              <div>{global.translate('Age', 2009)}</div>
              <div>
                <Checkbox
                  value="1"
                  label="18 - 25"
                  name="Age"
                  checked={executePublicityData.Age.includes('1')}
                  className="checkbox"
                  onChange={(e, { name, value }) => {
                    handleInputChange({
                      target: {
                        name,
                        value,
                        checked: executePublicityData.Age.includes(
                          '1',
                        ),
                      },
                    });
                  }}
                />
              </div>
              <div>
                <Checkbox
                  value="2"
                  label="26 - 35"
                  name="Age"
                  checked={executePublicityData.Age.includes('2')}
                  className="checkbox"
                  onChange={(e, { name, value }) => {
                    handleInputChange({
                      target: {
                        name,
                        value,
                        checked: executePublicityData.Age.includes(
                          '2',
                        ),
                      },
                    });
                  }}
                />
              </div>
              <div>
                <Checkbox
                  value="3"
                  label="36 - 50"
                  name="Age"
                  checked={executePublicityData.Age.includes('3')}
                  className="checkbox"
                  onChange={(e, { name, value }) => {
                    handleInputChange({
                      target: {
                        name,
                        value,
                        checked: executePublicityData.Age.includes(
                          '3',
                        ),
                      },
                    });
                  }}
                />
              </div>
              <div>
                <Checkbox
                  value="4"
                  label={`50 ${global.translate(
                    'and',
                  )} ${global.translate('more', 1556)}`}
                  name="Age"
                  checked={executePublicityData.Age.includes('4')}
                  className="checkbox"
                  onChange={(e, { name, value }) => {
                    handleInputChange({
                      target: {
                        name,
                        value,
                        checked: executePublicityData.Age.includes(
                          '4',
                        ),
                      },
                    });
                  }}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div>{global.translate('Gender', 1346)}</div>
              <div>
                <Checkbox
                  value="2"
                  label="M"
                  name="Gender"
                  checked={executePublicityData.Gender.includes('2')}
                  className="checkbox"
                  onChange={(e, { name, value }) => {
                    handleInputChange({
                      target: {
                        name,
                        value,
                        checked: executePublicityData.Gender.includes(
                          '2',
                        ),
                      },
                    });
                  }}
                />
              </div>
              <div>
                <Checkbox
                  value="1"
                  label="F"
                  name="Gender"
                  checked={executePublicityData.Gender.includes('1')}
                  className="checkbox"
                  onChange={(e, { name, value }) => {
                    handleInputChange({
                      target: {
                        name,
                        value,
                        checked: executePublicityData.Gender.includes(
                          '1',
                        ),
                      },
                    });
                  }}
                />
              </div>
              <div>
                <Checkbox
                  value="0"
                  label={global.translate('Any', 2010)}
                  name="Gender"
                  checked={executePublicityData.Gender.includes('0')}
                  className="checkbox"
                  onChange={(e, { name, value }) => {
                    handleInputChange({
                      target: {
                        name,
                        value,
                        checked: executePublicityData.Gender.includes(
                          '0',
                        ),
                      },
                    });
                  }}
                />
              </div>
            </Grid.Column>
          </Grid>
        </fieldset>
        {(errors.Age || errors.Gender) && (
          <Form.Field style={{ marginTop: '7px', width: '100%' }}>
            <Label
              prompt
              style={{ width: '100%', textAlign: 'center' }}
            >
              {errors.Age && <div>{errors.Age}</div>}
              {errors.Gender && <div>{errors.Gender}</div>}
            </Label>
          </Form.Field>
        )}
        <Form.Button
          onClick={() => !calcPublicityCost.loading && handleSubmit()}
          primary
          content={global.translate('Execute', 55)}
        />
      </Form>
    </div>
  );
};

CustomisedAudienceTab.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any),
  currentPublicity: PropTypes.objectOf(PropTypes.any),
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  executeCampaing: PropTypes.func,
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  executePublicityData: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
  customAudience: PropTypes.objectOf(PropTypes.any),
};

CustomisedAudienceTab.defaultProps = {
  userData: {},
  currentPublicity: {},
  handleInputChange: () => {},
  handleSubmit: () => {},
  executeCampaing: () => {},
  setOpen: () => false,
  open: false,
  executePublicityData: {},
  errors: {},
  customAudience: {},
};

export default CustomisedAudienceTab;
