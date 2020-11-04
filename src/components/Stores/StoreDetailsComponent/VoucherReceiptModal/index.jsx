import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition, Modal, Button } from 'semantic-ui-react';

import ReactToPrint from 'react-to-print';
import './ReceiptModal.scss';

import VoucherReceipt from './VoucherReceipt';

const VoucherReceiptModal = ({ data, isOpened, onClose }) => {
  const receiptRef = useRef(null);

  return (
    <Transition
      visible={isOpened}
      animation="fade in"
      duration={1000}
    >
      <Modal
        className="receipt-modal"
        // basic
        open={isOpened}
        size="small"
      >
        <Modal.Header className="text-light-black">
          {global.translate('Voucher receipt')}
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-column receipt-modal__container">
            <div className="large-h-padding">
              <div className="receipt-modal__container__message">
              {data?.VoucherAlreadyUsed === 'YES'
                  ? data?.Description
                  : global.translate(
                      'This transaction has been completed successfully.',
                    )}

              </div>
              <VoucherReceipt
                data={data}
                receiptRef={receiptRef}
                id="voucherReceipt"
              />
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="cancel-btn-redeem-v"
            basic
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>

          <ReactToPrint
            trigger={() => (
              <Button.Group>
                <Button className="print-btn-redeem-v">
                  {global.translate('Print receipt (PDF)')}
                </Button>
              </Button.Group>
            )}
            content={() => receiptRef.current}
          />
        </Modal.Actions>
      </Modal>
    </Transition>
  );
};

VoucherReceiptModal.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isOpened: PropTypes.func,
  onClose: PropTypes.func,
};
VoucherReceiptModal.defaultProps = {
  data: {},
  isOpened: () => {},
  onClose: () => {},
};
export default VoucherReceiptModal;
