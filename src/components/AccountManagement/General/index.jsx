import React from 'react';
import PropTypes from 'prop-types';

import Edit from './Edit';
import Info from './Info';

const General = ({ userData, general }) => {
  const { infoOrEdit, setInfoOrEdit } = general;

  return (
    <>
      {infoOrEdit === 'info' && (
        <Info userData={userData} setInfoOrEdit={setInfoOrEdit} />
      )}
      {infoOrEdit === 'edit' && (
        <Edit
          userData={userData}
          setInfoOrEdit={setInfoOrEdit}
          general={general}
        />
      )}
    </>
  );
};

General.propTypes = {
  userData: PropTypes.instanceOf(Object),
  general: PropTypes.instanceOf(Object).isRequired,
};

General.defaultProps = {
  userData: {
    data: {},
  },
};

export default General;
