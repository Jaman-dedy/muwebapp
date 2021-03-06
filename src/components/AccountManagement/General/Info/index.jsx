import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';
import './Info.scss';

const EditGeneralInfo = ({ userData, setInfoOrEdit }) => {
  const { data } = userData;
  return (
    <div className="general-info">
      <div className="information">
        <div className="first-name">
          <span>{global.translate('First Name')}: </span>
          <span>{data && data.FirstName}</span>
        </div>
        <div className="first-name">
          <span>{global.translate('Last Name')}: </span>
          <span>{data && data.LastName}</span>
        </div>
        <div className="country">
          <span>{global.translate('Country')}: </span>
          <span>{data && data.CountryName}</span>
        </div>
        <div className="city">
          <span>{global.translate('City')}: </span>
          <span>{data && data.City}</span>
        </div>
        {data && data.State && (
          <div className="state">
            <span>{global.translate('State')}: </span>
            <span>{data.State}</span>
          </div>
        )}
        <div className="address">
          <span>{global.translate('Address')}: </span>
          <span>{data && data.Address1}</span>
        </div>
        <div className="description">
          <span>{global.translate('Bio')}: </span>
          <span>{data && data.Address2}</span>
        </div>
      </div>
      <Button
        secondary
        color="gray"
        onClick={() => setInfoOrEdit('edit')}
      >
        {global.translate('Edit')}
      </Button>
    </div>
  );
};

EditGeneralInfo.propTypes = {
  userData: PropTypes.instanceOf(Object),
  setInfoOrEdit: PropTypes.func.isRequired,
};

EditGeneralInfo.defaultProps = {
  userData: {
    data: {},
  },
};

export default EditGeneralInfo;
