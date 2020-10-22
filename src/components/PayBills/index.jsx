import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
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
          suppliersCountriesError={suppliersCountries.error}
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
              {global.translate('Successful', 1196)}
            </span>
            <span className="message">
              {global.translate(
                'Your transaction has been completed successfully',
                2004,
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
              if (isAppDisplayedInWebView()) {
                history.push(
                  `${history.location.pathname}?redirect_back=1`,
                );
              } else {
                history.push('/money-transfer?prev=pay-bills');
              }
              setOpen(false);
            }}
            basic
            color="red"
            content={global.translate('Cancel', 86)}
          />
          <Button
            onClick={() => {
              screen1.handleNext();
            }}
            positive
            content={global.translate('Next', 10)}
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
            content={global.translate('Back', 174)}
          />
          <Button
            onClick={() => {
              screen2.handleNext();
            }}
            positive
            content={global.translate('Next', 10)}
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

            if (isAppDisplayedInWebView()) {
              history.push(
                `${history.location.pathname}?redirect_back=1`,
              );
            } else {
              history.push('/money-transfer?prev=pay-bills');
            }
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
          content={global.translate('Back', 174)}
        />
        <Button
          loading={transferFund.loading}
          onClick={() =>
            !transferFund.loading &&
            !transferConfirmation.loading &&
            screen3.handleNext()
          }
          positive={!transferFund.loading}
          disabled={transferFund.loading}
          content={global.translate('Proceed', 1752)}
        />
      </>
    );
  };

  return (
    <Modal
      closeOnDocumentClick={false}
      open={open}
      onClose={() => {
        if (isAppDisplayedInWebView()) {
          history.push(
            `${history.location.pathname}?redirect_back=1`,
          );
        }
      }}
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
          global.translate('Pay Bills', 67)
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
