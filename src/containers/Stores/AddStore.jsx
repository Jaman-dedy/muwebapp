/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';

import AddStore from 'components/Stores/AddStore';

const AddStoreContainer = ({ currentStore }) => {
  return <AddStore currentStore={currentStore} />;
};

AddStoreContainer.propTypes = {
  currentStore: PropTypes.instanceOf(PropTypes.object),
};

AddStoreContainer.defaultProps = {
  currentStore: null,
};

export default AddStoreContainer;
