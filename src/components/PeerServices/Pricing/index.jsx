import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import getCurrenciesList from 'redux/actions/users/getCurrenciesList';
import getUserData from 'redux/actions/users/getUserData';

const Pricing = ({ form, onChange, service, setForm }) => {
  const {
    currenciesList: { data },
    userData,
  } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      getCurrenciesList()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!userData.data) {
      getUserData()(dispatch);
    }
  }, [userData]);

  const [walletsNumber, setWalletsNumber] = useState(1);
  const inputRows = new Array(walletsNumber);

  useEffect(() => {
    if (data && userData.data && !service) {
      onChange(
        {},
        { name: 'Currency0', value: userData.data.Currency },
      );
    }
  }, [data, userData]);

  useEffect(() => {
    if (service) {
      setWalletsNumber(service.PriceList.length);

      if (service?.PriceList.length > 0) {
        const magicForm = {};

        for (let i = 0; i <= service?.PriceList.length - 1; i++) {
          const element = service.PriceList[i];
          const titleKey = `Title${i}`;
          const currencyKey = `Currency${i}`;
          const priceKey = `Price${i}`;

          magicForm[titleKey] = element.Title;
          magicForm[currencyKey] = element.Currency;
          magicForm[priceKey] = element.Price;
        }

        setForm({ ...form, ...magicForm });
      } else {
        setWalletsNumber(1);
      }
    }
  }, [service]);

  const addFormInput = () => {
    const newNumber = walletsNumber + 1;
    setWalletsNumber(newNumber);
    const rowNumber = newNumber - 1;

    onChange(
      {},
      {
        name: `Currency${rowNumber}`,
        value: userData.data?.Currency,
      },
    );
  };

  const removeFormInput = () => {
    if (walletsNumber > 1) {
      const newNumber = walletsNumber - 1;
      setWalletsNumber(newNumber);
      onChange(
        {},
        {
          name: `Currency${newNumber}`,
          value: userData.data.Currency,
        },
      );
    }
  };

  const currencyOptions =
    data &&
    data.map(el => {
      return {
        id: el.Code,
        text: `${el.Name} (${el.Code})`,
        value: el.Code,
        image: { avatar: false, src: el.Flag },
      };
    });

  return (
    <>
      {' '}
      <Form>
        {inputRows.fill().map((value, idx) => {
          return (
            <span
              className="wallet_input_row"
              key={Math.random() * Date.now()}
            >
              <Form.Group widths="equal" className="FormInputs">
                <Form.Input
                  className="input"
                  placeholder={global.translate('Item')}
                  name={`Title${idx}`}
                  value={form[`Title${idx}`] || ''}
                  onChange={onChange}
                />
                <Form.Input
                  className="input"
                  placeholder={global.translate('Price')}
                  name={`Price${idx}`}
                  value={form[`Price${idx}`] || ''}
                  onChange={onChange}
                />
                <Dropdown
                  fluid
                  search
                  selection
                  options={currencyOptions}
                  name={`Currency${idx}`}
                  value={form[`Currency${idx}`] || ''}
                  onChange={onChange}
                  selected={currencyOptions?.[3]}
                  placeholder={global.translate('Select a currency')}
                />
                <Form.Field>
                  <span className="wallet-row-actions">
                    {`Title${idx}` !== 'Title0' && (
                      <Icon
                        name="times circle"
                        className="circle-remove cursor-pointer"
                        size="big"
                        onClick={() => removeFormInput(idx)}
                      />
                    )}
                    {idx === inputRows.length - 1 && (
                      <Icon
                        name="add circle"
                        className="circle-add cursor-pointer"
                        size="big"
                        onClick={() => addFormInput()}
                      />
                    )}
                  </span>
                </Form.Field>
              </Form.Group>
            </span>
          );
        })}
      </Form>
    </>
  );
};

Pricing.propTypes = {
  service: PropTypes.objectOf(PropTypes.any).isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};
export default Pricing;
