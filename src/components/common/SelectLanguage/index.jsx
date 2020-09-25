/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { Dropdown, Input, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './SelectLanguage.scss';
import changeLanguage from 'redux/actions/users/changeLanguage';
import replaceCountryFlag from 'helpers/replaceCountryFlag';
import useWindowSize from 'utils/useWindowSize';
import languageIcon from 'assets/images/translation.svg';
import LoaderComponent from '../Loader';

const SelectLanguage = ({
  pointing,
  hasLabel,
  position,
  noColorStyle,
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
      <span className="SelectLanguage">
        <Dropdown
          trigger={
            <div className="display-language-icon">
              <Image
                onClick={() => {
                  setOpen(!open);
                }}
                width={20}
                src={languageIcon}
                title={global.translate('Select a language')}
              />

              <span
                className="lang-text"
                style={noColorStyle ? {} : { color: '#333556' }}
              >
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
  pointing: PropTypes.string,
  noColorStyle: PropTypes.bool,
  hasLabel: PropTypes.bool,
  position: PropTypes.oneOf(['absolute', 'static']),
};

SelectLanguage.defaultProps = {
  pointing: 'top right',

  hasLabel: true,
  position: 'absolute',
  noColorStyle: false,
};

export default SelectLanguage;
