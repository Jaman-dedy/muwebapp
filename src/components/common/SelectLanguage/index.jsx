/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { Dropdown, Image, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './SelectLanguage.scss';
import languageIcon from 'assets/images/language-icon.png';
import languageIconOrange from 'assets/images/language-icon-orange.png';
import changeLanguage from 'redux/actions/users/changeLanguage';
import replaceCountryFlag from 'helpers/replaceCountryFlag';
import useWindowSize from 'utils/useWindowSize';
import LoaderComponent from '../Loader';

const SelectLanguage = ({
  iconClass,
  pointing,
  white,
  hasLabel,
  position,
}) => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const wrapperId = `input-${Math.ceil(Math.random() * 10000)}`;
  const {
    language: {
      supported: { data = [] } = {},
      preferred = 'en',
    } = {},
  } = useSelector(({ user }) => user);

  const {
    language: {
      loading: getLanguageLoading,
      supported: { loading: getSupportedLanguagesLoading },
    } = {},
  } = useSelector(({ user }) => user);

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [open, setOpen] = useState(false);

  const checkClickInput = event => {
    const { target = {} } = event || {};
    if (target.classList && target.id === wrapperId) {
      return setOpen(false);
    }
    return null;
  };

  useEffect(() => {
    setCountries(replaceCountryFlag(data));
    setFilteredCountries(replaceCountryFlag(data));
  }, [data]);

  useEffect(() => {
    document.addEventListener('mousedown', checkClickInput);
    return () => {
      document.removeEventListener('mousedown', checkClickInput);
    };
  });

  const { width } = useWindowSize();

  return (
    <>
      <div
        id={wrapperId}
        style={{
          display: open ? 'block' : 'none',
          background: 'transparent',
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
        }}
      />
      <span className="SelectLanguage" style={{ position }}>
        <Dropdown
          trigger={
            <div className="language-trigger">
              <Image
                onClick={() => {
                  setOpen(!open);
                }}
                src={white ? languageIcon : languageIconOrange}
                className={iconClass}
                title={global.translate('Select language')}
              />
              <span className="lang-text">
                {hasLabel &&
                  (countries.length === 0
                    ? ''
                    : countries.find(
                        ({ value }) => value === preferred,
                      ).text)}
              </span>
            </div>
          }
          icon={null}
          open={open}
          pointing={width > 600 ? pointing : false}
        >
          <Dropdown.Menu>
            <Input
              icon="search"
              focus
              iconPosition="left"
              onChange={({ target: { value } }) => {
                setFilteredCountries(
                  countries.filter(({ text }) =>
                    text.toLowerCase().includes(value.toLowerCase()),
                  ),
                );
              }}
            />
            <Dropdown.Menu scrolling>
              {getLanguageLoading ||
                (getSupportedLanguagesLoading && (
                  <LoaderComponent loaderContent />
                ))}
              {filteredCountries.map(({ key, value, text, flag }) => (
                <Dropdown.Item
                  key={key}
                  value={value}
                  flag={flag}
                  text={text}
                  onClick={() => {
                    changeLanguage(key)(dispatch);
                    setOpen(false);
                  }}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </span>
    </>
  );
};

SelectLanguage.propTypes = {
  iconClass: PropTypes.string,
  pointing: PropTypes.string,
  white: PropTypes.bool,
  hasLabel: PropTypes.bool,
  position: PropTypes.oneOf(['absolute', 'static']),
};

SelectLanguage.defaultProps = {
  iconClass: 'language-icon',
  pointing: 'top right',
  white: true,
  hasLabel: true,
  position: 'absolute',
};

export default SelectLanguage;
