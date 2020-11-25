import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown, Icon, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import myServices from 'containers/PeerServices/myServices';
import './style.scss';

const EditPricing = ({ service }) => {
  const [form, setForm] = useState([
    {
      Currency: '',
      Price: '',
      Title: '',
    },
  ]);
  const onChange = (index, event) => {
    const values = [...form];
    if (event.target.name === 'Title') {
      values[index].Title = event.target.value;
    } else if (event.target.name === 'Price') {
      values[index].Price = event.target.value.toString();
    } else {
      values[index].Currency = event.target.value;
    }

    setForm(values);
  };

  const { handleupdateService } = myServices();

  const { data: updateServiceData, loading } = useSelector(
    state => state.peerServices.updateService,
  );

  useEffect(() => {
    if (updateServiceData) {
      setForm([
        {
          Currency: '',
          Price: '',
          Title: '',
        },
      ]);
    }
  }, [updateServiceData]);

  const {
    currenciesList: { data },
    userData,
  } = useSelector(state => state.user);

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

  const handleAddFields = () => {
    const values = [...form];
    values.push({
      Title: '',
      Currency: userData.data?.Currency,
      Price: '',
    });
    setForm(values);
  };

  const handleRemoveFields = index => {
    const values = [...form];
    values.splice(index, 1);
    setForm(values);
  };

  useEffect(() => {
    if (data && userData.data && !service) {
      onChange(0, {
        target: { name: 'Currency', value: userData.data?.Currency },
      });
    }
  }, [data, userData]);

  useEffect(() => {
    if (service) {
      if (service?.PriceList.length > 0) {
        const magicForm = [];

        for (let i = 0; i <= service?.PriceList.length - 1; i++) {
          const element = service.PriceList[i];
          magicForm.push({
            Title: element.Title,
            Currency: element.Currency,
            Price: element.Price,
          });
        }
        setForm(magicForm);
      }
    }
  }, [service]);

  return (
    <>
      {' '}
      <Form className="edit-pricing-form">
        {form.map((inputField, index) => (
          <Form.Group widths="equal" key={`${inputField}~${index}`}>
            <Form.Field className="form-group col-sm-6">
              <Form.Input
                type="text"
                className="form-control"
                id="Title"
                name="Title"
                placeholder={global.translate('Item')}
                onChange={event => {
                  event.persist();
                  onChange(index, event);
                }}
                value={inputField.Title}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="number"
                className="form-control"
                id="Price"
                onChange={event => {
                  event.persist();
                  onChange(index, event);
                }}
                name="Price"
                placeholder={global.translate('Price')}
                value={inputField.Price}
              />
            </Form.Field>

            <Form.Field>
              <Dropdown
                fluid
                search
                selection
                options={currencyOptions}
                name="Currency"
                value={inputField.Currency}
                onChange={(event, data) => {
                  event.persist();
                  onChange(index, {
                    target: { name: 'Currency', value: data.value },
                  });
                }}
                selected={currencyOptions?.[3]}
                placeholder={global.translate('Select a currency')}
              />
            </Form.Field>

            <Form.Field>
              {index !== 0 && (
                <Icon
                  name="times circle"
                  className="circle-remove cursor-pointer"
                  size="big"
                  onClick={() => handleRemoveFields(index)}
                />
              )}
              {index === form.length - 1 && (
                <Icon
                  name="add circle"
                  className="circle-add cursor-pointer"
                  size="big"
                  onClick={() => handleAddFields()}
                />
              )}
            </Form.Field>
          </Form.Group>
        ))}
        <Button
          disabled={loading}
          loading={loading}
          onClick={() => {
            form.forEach((item, index) => {
              if (item.Title === '' || item.Price === '') {
                form.splice(index, form.length);
              }
            });
            handleupdateService(form, service);
          }}
          content={global.translate('Save')}
          className="bg-orange"
          style={{ color: 'white' }}
        />
      </Form>
    </>
  );
};

EditPricing.propTypes = {
  service: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default EditPricing;
