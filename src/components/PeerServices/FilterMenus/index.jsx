/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Dropdown,
  Icon,
  List,
  Button,
  Checkbox,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

const CountryFilter = ({
  icon,
  text,
  options,
  many,
  onSelectionDone,
  direction,
}) => {
  const history = useHistory();
  const params = queryString.parse(history.location.search);

  const [form, setForm] = useState({});

  const onChange = (e, { name, value }) => {
    if (many) {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ [name]: value });
    }
  };

  useEffect(() => {
    if (params.countries) {
      const preselected = [];

      const paramArray = params.countries.split(',');

      for (let i = 0; i < paramArray.length; i += 1) {
        const element = paramArray[i];

        preselected.push({ [element.toUpperCase()]: true });
      }
      setForm(...preselected);
    }
  }, [params.countries]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    options.map(item => {
      if (item.selected) {
        setForm({ ...form, [item.key]: true });
      }
    });
  }, [options]);

  return (
    <div className="dropdown-holder">
      <div className="filter-trigger" onClick={() => setOpen(true)}>
        <span>
          <Icon name={icon} /> {text}
        </span>
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setOpen(false);
        }}
      >
        <Dropdown
          closeOnChange={false}
          closeOnBlur={false}
          floating
          pointing
          open={open}
          icon="dropdown"
        >
          <Dropdown.Menu
            id="dropdown-menu-items"
            direction={direction}
          >
            <Dropdown.Item as={List} divided verticalAlign="middle">
              {options.map(item => {
                const key = [item.key];
                return (
                  <List.Item key={item.key} className="filter-item">
                    <List.Content floated="left">
                      <Checkbox
                        checked={form[key] || false}
                        onChange={(e, data) => {
                          onChange(e, {
                            name: key,
                            value: data.checked,
                          });
                        }}
                        label={item.text}
                      />
                    </List.Content>
                  </List.Item>
                );
              })}
            </Dropdown.Item>

            <div className="filter-actions">
              <Button
                className=""
                content={global.translate('Cancel')}
                onClick={() => setOpen(false)}
              />

              <Button
                className="bg-orange"
                onClick={() => {
                  onSelectionDone(form);
                  setOpen(false);
                  setForm({});
                }}
                content={global.translate('Apply', 234)}
              />
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </OutsideClickHandler>
    </div>
  );
};

CountryFilter.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  many: PropTypes.bool.isRequired,
  onSelectionDone: PropTypes.func.isRequired,
  direction: PropTypes.string,
};

CountryFilter.defaultProps = {
  direction: 'left',
};

export default CountryFilter;
