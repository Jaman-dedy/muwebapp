/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

import Map from './Map';

const PositionPickerModal = ({
  open,
  setOpen,
  handleInputChange,
  google,
  addStoreData,
}) => {
  const [position, setPosition] = useState({
    lat: '',
    lng: '',
  });

  useEffect(() => {
    handleInputChange({
      target: {
        name: 'position',
        value: {
          Latitude: position.lat || addStoreData.Latitude,
          Longitude: position.lng || addStoreData.Longitude,
          CountryCode:
            position.CountryCode || addStoreData.CountryCode,
          City: position.City || addStoreData.City,
          PhoneNumberCode:
            position.PhoneNumberCode || addStoreData.PhoneNumberCode,
        },
      },
    });
  }, [position]);

  const handleLocationChange = ({ position }) => {
    setPosition(position);
  };
  return (
    <Modal open={open} size="large">
      <Modal.Content className="modal-map-content">
        <Map
          google={google}
          onChange={handleLocationChange}
          height="600px"
          zoom={15}
          handleInputChange={handleInputChange}
          addStoreData={addStoreData}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          positive
          content={global.translate('Done', 55)}
        />
      </Modal.Actions>
    </Modal>
  );
};

PositionPickerModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleInputChange: PropTypes.func,
  google: PropTypes.instanceOf(PropTypes.any),
  addStoreData: PropTypes.instanceOf(Object),
};

PositionPickerModal.defaultProps = {
  open: false,
  setOpen: () => null,
  handleInputChange: () => null,
  google: {},
  addStoreData: {},
};

export default PositionPickerModal;
