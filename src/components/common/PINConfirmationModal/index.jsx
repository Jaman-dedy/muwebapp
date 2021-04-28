import React, { useState, useCallback } from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ShieldIcon from 'assets/images/shield-icon.svg';
import PINInput from 'components/common/PINInput';
import ResetPINModal from 'components/common/ResetPINModal';

import './styles.scss';
import useWindowSize from 'utils/useWindowSize';

const PINConfirmationModal = ({
  open,
  setOpen,
  onPinConfirm,
  loading,
  onClose,
  setPIN,
  PIN,
}) => {
  const windowSize = useWindowSize();

  const [openResetPIN, setOpenResetPIN] = useState(false);

  const handleOpenResetPIN = useCallback(() => {
    setOpenResetPIN(true);
    setPIN('');
  }, [setPIN]);

  return (
    <>
      <Modal
        onClose={() => {
          setOpen(false);
          onClose();
          setPIN('');
          setOpenResetPIN(false);
        }}
        onOpen={() => {
          setPIN('');
          setOpen(true);
        }}
        open={open}
        size={windowSize.width > 600 ? 'tiny' : 'mini'}
        className="pin-modal"
        closeOnDimmerClick={false}
      >
        <div className="pin-modal__content">
          <div className="pin-modal__left-side">
            <div className="pin-modal__image-container">
              <Image src={ShieldIcon} className="pin-modal__image" />
            </div>
            <p className="pin-modal__description">
              {global.translate(
                'We keep your account and transactions safe.',
              )}
            </p>
          </div>
          <div className="pin-modal__right-side">
            <h1 className="pin-modal__heading">
              {global.translate('Enter PIN to confirm')}
            </h1>
            <p className="pin-modal__label">
              {global.translate('PIN number')}
            </p>
            <form autoComplete="off">
              <PINInput value={PIN} onChange={setPIN} />
            </form>
            <p className="pin-modal__reset">
              {global.translate('Forgot your PIN ?')}
              <Button
                className="pin-modal__button pin-modal__button--reset"
                onClick={handleOpenResetPIN}
              >
                {global.translate('Reset')}
              </Button>
            </p>

            <div className="pin-modal__actions">
              <Button
                className="pin-modal__button pin-modal__button--cancel"
                onClick={() => {
                  setPIN('');
                  setOpen(false);
                  onClose();
                }}
                disabled={loading}
              >
                {global.translate('Cancel')}
              </Button>
              <Button
                className="pin-modal__button pin-modal__button--confirm"
                onClick={() => {
                  onPinConfirm();
                }}
                disabled={PIN?.length < 4 || loading}
                loading={loading}
              >
                {global.translate('Confirm')}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <ResetPINModal
        open={openResetPIN}
        setOpen={handleOpenResetPIN}
        close={() => setOpenResetPIN(false)}
      />
    </>
  );
};

PINConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onPinConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  PIN: PropTypes.string,
  setPIN: PropTypes.func.isRequired,
};

PINConfirmationModal.defaultProps = {
  loading: false,
  onClose: () => {},
  PIN: '',
};

export default PINConfirmationModal;
