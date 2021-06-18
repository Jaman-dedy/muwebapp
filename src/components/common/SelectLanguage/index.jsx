/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-unresolved */
import './SelectLanguage.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Loader } from 'semantic-ui-react';
import changeLanguage from 'redux/actions/users/changeLanguage';
import useWindowSize from 'utils/useWindowSize';
import languageIcon from 'assets/images/h-languages.svg';
import replaceCountryFlag from 'helpers/replaceCountryFlag';
import LoaderComponent from '../Loader';

const SelectLanguage = ({ pointing, hasLabel, open, setOpen }) => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const {
    language: {
      loading: loadingLanguage = false,
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

  useEffect(() => {
    setCountries(replaceCountryFlag(data));
    setFilteredCountries(replaceCountryFlag(data));
  }, [data]);

  const { width } = useWindowSize();

  return (
    <>
      <span className="SelectLanguage">
        <Dropdown
          className="wrap-languages"
          trigger={
            <>
              {loadingLanguage ? (
                <Loader active inline />
              ) : (
                <div className="display-language-icon">
                  {hasLabel &&
                    (countries.length === 0 ? (
                      ''
                    ) : (
                      <span className="lang-text">
                        {
                          countries.find(
                            ({ value }) => value === preferred,
                          ).text
                        }
                      </span>
                    ))}
                  <img
                    onClick={() => {
                      setOpen(!open);
                    }}
                    className="h-language"
                    src={languageIcon}
                    title={global.translate('Select a language')}
                  />
                </div>
              )}
            </>
          }
          icon={null}
          open={open}
          pointing={width > 600 ? pointing : false}
          onBlur={() => setOpen(false)}
        >
          {/* right: !hasLabel && width < 375 ? '-20vw' : 0, */}
          {/* className="wrap-languages" */}
          {/* tabindex="1000000"
          style={{
            left: 'auto',
          }} */}
          <Dropdown.Menu>
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
  hasLabel: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

SelectLanguage.defaultProps = {
  pointing: 'top right',
  hasLabel: true,
};

export default SelectLanguage;
