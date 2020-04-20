import React from 'react';
import PropTypes from 'prop-types';

import './EmailAndPhone.scss';
import Edit from './Edit';
import Info from './Info';

const General = ({ userData, emailAndPhone }) => {
  const { infoOrEdit, setInfoOrEdit } = emailAndPhone;

  return (
    <div className="email-and-phone">
      {infoOrEdit === 'info' && (
        <Info userData={userData} setInfoOrEdit={setInfoOrEdit} />
      )}
      {infoOrEdit === 'edit' && (
        <Edit userData={userData} emailAndPhone={emailAndPhone} />
      )}
    </div>
  );
};

General.propTypes = {
  userData: PropTypes.instanceOf(Object),
  emailAndPhone: PropTypes.instanceOf(Object).isRequired,
};

General.defaultProps = {
  userData: {
    data: {},
  },
};

export default General;
