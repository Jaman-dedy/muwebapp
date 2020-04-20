import React from 'react';
import { Modal, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './WalletOptionsModal.scss';

const OptionsDialog = ({ open, setOpen, options }) => {
  return (
    <>
      <Modal
        size="tiny"
        open={open}
        className="options_modal"
        onClose={() => setOpen()}
      >
        <div className="options">
          {options.map(item => (
            <Button
              fluid
              onClick={item.onItemClick}
              className="option"
            >
              <span>
                <Image src={item.image} height={20} />
              </span>
              <span className="desc">{item.name}</span>
            </Button>
          ))}
        </div>
      </Modal>
    </>
  );
};
OptionsDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
};

OptionsDialog.defaultProps = {
  open: false,
  setOpen: () => {},
};
export default OptionsDialog;
