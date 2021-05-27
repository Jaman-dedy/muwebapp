import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  Item,
  Flag,
  Radio,
  Icon,
  Loader,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import changeLanguage from 'redux/actions/users/changeLanguage';
import replaceCountryFlag from 'helpers/replaceCountryFlag';
import './style.scss';

const ChangeLanguageModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const {
    language: {
      supported: { data = [] } = {},
      preferred = 'en',
      loading,
    } = {},
  } = useSelector(({ user }) => user);

  useEffect(() => {
    setCountries(replaceCountryFlag(data));
    setFilteredCountries(replaceCountryFlag(data));
  }, [data]);
  const flagRenderer = item => <Flag name={item.flag} />;
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="mini"
      className="change-lg"
    >
      <Modal.Content>
        <h3>{global.translate('Change language')}</h3>
        <div className="change-lg__content">
          <Item.Group link>
            {countries.length !== 0 &&
              countries.map(item => (
                <Item
                  onClick={() => {
                    if (!loading) {
                      changeLanguage(item.key)(dispatch);
                      setSelectedLanguage(item.key);
                    }
                  }}
                  className={`${((selectedLanguage === item.key ||
                    (!loading && preferred === item.key)) &&
                    'active') ||
                    ''}`}
                >
                  <div className="item-content">
                    {flagRenderer(item)}
                    <Item.Content verticalAlign="middle">
                      {item.text}
                    </Item.Content>
                  </div>
                  <div className="radio-btn">
                    {((selectedLanguage === item.key ||
                      preferred === item.key) &&
                      ((loading && (
                        <Loader inline size="small" />
                      )) || (
                        <Icon
                          name="check circle outline"
                          size="large"
                        />
                      ))) || (
                      <Radio
                        name="radioGroup"
                        value={item.key}
                        checked={
                          selectedLanguage === item.key ||
                          preferred === item.key
                        }
                        onChange={() => {
                          if (!loading) {
                            changeLanguage(item.key)(dispatch);
                            setSelectedLanguage(item.key);
                          }
                        }}
                      />
                    )}
                  </div>
                </Item>
              ))}
          </Item.Group>
          <Item.Group>
            <div className="update-info-actions">
              <Button
                className="cancel-button"
                onClick={() => setOpen(false)}
              >
                {global.translate('Ok')}
              </Button>
            </div>
          </Item.Group>
        </div>
      </Modal.Content>
    </Modal>
  );
};

ChangeLanguageModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
ChangeLanguageModal.defaultProps = {
  open: false,
  setOpen: () => {},
};

export default ChangeLanguageModal;
