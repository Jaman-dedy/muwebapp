/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import SelectProvidersImg from 'assets/images/provider-select.svg';
import SelectedProvidersImg from 'assets/images/selectedProvider.svg';

const DisplayProviders = ({
  providerLogo,
  title,
  subTitle,
  onClick,
  ticked,
}) => {
  return (
    <div
      className="dis-container"
      onClick={onClick}
      style={
        ticked
          ? {
              border: '1px solid #EA5726',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            }
          : { border: '1px solid #c9c9c9' }
      }
    >
      <div className="left-img">
        <Image src={providerLogo} />
      </div>
      <div className="middle-text">
        <h3>{title}</h3>
        <div>{subTitle}</div>
      </div>
      <div className="wrap-check">
        {ticked ? (
          <Image src={SelectedProvidersImg} />
        ) : (
          <Image src={SelectProvidersImg} />
        )}
      </div>
    </div>
  );
};

DisplayProviders.propTypes = {
  providerLogo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  ticked: PropTypes.bool.isRequired,
};

export default DisplayProviders;
