import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import WalletCountryAndSupplier from './WalletCountryAndSupplier';
import Invoice from './Invoice';
import ConfirmPayingBills from './ConfirmPayingBills';

import './PayBills.scss';

const AddMoneyModal = ({ open, setOpen, payBills }) => {
  const history = useHistory();
  const {
    screenNumber,
    setScreenNumber,
    screen1,
    screen2,
    screen3,
    payBillsData,
    handleInputChange,
    userData,
    clearPayBillsData,
    myWallets,
    suppliersCountries,
    suppliers,
  } = payBills;

  const { transferConfirmation, transferFund } = useSelector(
    ({ payBills }) => payBills,
  );

  const displayContent = () => {
    if (screenNumber === 1)
      return (
        <WalletCountryAndSupplier
          screen1={screen1}
          payBillsData={payBillsData}
          handleInputChange={handleInputChange}
          userData={userData}
          myWallets={myWallets.walletList}
          suppliersCountries={suppliersCountries.countries}
          suppliers={suppliers}
          clearError={screen1.clearError}
        />
      );

    if (screenNumber === 2)
      return (
        <Invoice
          screen2={screen2}
          payBillsData={payBillsData}
          handleInputChange={handleInputChange}
        />
      );

    if (screenNumber === 3) {
      if (transferFund.success) {
        return (
          <div className="success-message">
            <Icon name="checkmark" color="green" size="massive" />
            <span className="successful">
              {global.translate('Successful')}
            </span>
            <span className="message">
              {global.translate(
                'Your transaction has been completed successfully',
              )}
            </span>
          </div>
        );
      }

      return (
        <ConfirmPayingBills
          payBillsData={payBillsData}
          handleInputChange={handleInputChange}
          transferConfirmation={transferConfirmation}
          transferFund={transferFund}
          screen3={screen3}
        />
      );
    }
    return false;
  };

  const displayActions = () => {
    if (screenNumber === 1) {
      return (
        <>
          <Button
            onClick={() => {
              clearPayBillsData();
              history.push('/money-transfer?prev=pay-bills');
              setOpen(false);
            }}
            basic
            color="red"
            content={global.translate('Cancel')}
          />
          <Button
            onClick={() => {
              screen1.handleNext();
            }}
            positive
            content={global.translate('Next')}
          />
        </>
      );
    }
    if (screenNumber === 2) {
      return (
        <>
          <Button
            onClick={() => {
              setScreenNumber(1);
            }}
            basic
            color="red"
            content={global.translate('Back')}
          />
          <Button
            onClick={() => {
              screen2.handleNext();
            }}
            positive
            content={global.translate('Next')}
          />
        </>
      );
    }
    if (transferFund.success) {
      return (
        <Button
          onClick={() => {
            clearPayBillsData();
            setOpen(false);
            history.push('/money-transfer?prev=pay-bills');
          }}
          positive
          content={global.translate('Done', 55)}
        />
      );
    }
    return (
      <>
        <Button
          onClick={() => !transferFund.loading && setScreenNumber(2)}
          basic
          color="red"
          content={global.translate('Back')}
        />
        <Button
          loading={transferFund.loading}
          onClick={() =>
            !transferFund.loading &&
            !transferConfirmation.loading &&
            screen3.handleNext()
          }
          positive
          content={global.translate('Proceed')}
        />
      </>
    );
  };

  return (
    <Modal
      closeOnDocumentClick={false}
      open={open}
      size={`${screenNumber === 3 ? 'small' : 'medium'}`}
      className="pay-bills-modal"
    >
      <Modal.Header>
        {payBillsData.SupplierName ? (
          <span>
            {global.translate('Pay Bills to')}{' '}
            <span className="supplier-name">
              {payBillsData.SupplierName}
            </span>
          </span>
        ) : (
          global.translate('Pay Bills')
        )}
      </Modal.Header>
      <Modal.Content>{displayContent()}</Modal.Content>
      <Modal.Actions>{displayActions()}</Modal.Actions>
    </Modal>
  );
};

AddMoneyModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  payBills: PropTypes.instanceOf(Object),
  suppliersCountries: PropTypes.instanceOf(Object),
  suppliers: PropTypes.instanceOf(Object),
};

AddMoneyModal.defaultProps = {
  open: false,
  setOpen: () => null,
  payBills: {},
  suppliers: {},
  suppliersCountries: {},
};

export default AddMoneyModal;
