import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Image } from 'semantic-ui-react';

import './style.scss';

const ModalInfo = ({
  title,
  body,
  icon,
  isEligible,
  open,
  setOpen,
  buttonText,
}) => {
  const history = useHistory();
  return (
    <Modal size="tiny" open={open} className="container-modal">
      <Modal.Content>
        <div className="modal-container">
          {!isEligible && (
            <div className="modal-img">
              <Image src={icon} />
            </div>
          )}
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </div>

        <Button
          className="action-button"
          onClick={() => {
            setOpen(false);
            if (isEligible) {
              history.push('/apply-loan');
            }
          }}
        >
          {buttonText}
        </Button>
        {isEligible && (
          <Button basic color="red" onClick={() => setOpen(false)}>
            {global.translate('Cancel')}
          </Button>
        )}
      </Modal.Content>
    </Modal>
  );
};
ModalInfo.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  icon: PropTypes.string,
  isEligible: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  buttonText: PropTypes.string,
};
ModalInfo.defaultProps = {
  title: '',
  body: '',
  icon: '',
  isEligible: false,
  open: false,
  setOpen: () => {},
  buttonText: '',
};

export default ModalInfo;
