import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Item, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import { clearAddMoneyToWallet } from 'redux/actions/walletsAndBanks/addMoneyToWallet';

const ConfirmTopUpFromBank = ({
  step,
  setStep,
  addMoneyData,
  topUpFromBank,
  PIN,
  setPIN,
  openPINModal,
  setOpenPINModal,
}) => {
  const {
    amount,
    WalletNumber,
    WalletCurrency,
    bankAccount: { AccountNumber, AccountName, Currency },
  } = addMoneyData;
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, success } = useSelector(
    ({ walletsAndBanks: { addMoneyToWallet } }) => addMoneyToWallet,
  );

  useEffect(() => {
    if (success) {
      setOpenPINModal(false);
      clearAddMoneyToWallet()(dispatch);
      history.push({
        pathname: '/wallets',
        state: {
          activeTab: 0,
        },
      });
    }
  }, [success, dispatch, history]);

  return (
    <div className="transfer-summary">
      <h3>{global.translate('Top Up summary', 2222)}</h3>
      <Item.Group divided>
        <Item style={{ display: 'block' }}>
          <span>{global.translate('Top up amount', 2221)}</span>
          <span className="moneyAmount">
            {`${amount} ${Currency}`}
          </span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Bank account name`, 2223)}</span>
          <span className="moneyAmount">{`${AccountName}`}</span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Bank account number`, 2223)}</span>
          <span className="moneyAmount">{`${AccountNumber}`}</span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Wallet Number`, 493)}</span>
          <span className="moneyAmount">{`${WalletNumber}`}</span>
        </Item>
        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Wallet Currency`, 98)}</span>
          <span className="moneyAmount">{`${WalletCurrency ??
            ''}`}</span>
        </Item>

        <Item style={{ display: 'block' }}>
          <span>{global.translate(`Bank Currency`, 98)}</span>
          <span className="moneyAmount">{`${Currency}`}</span>
        </Item>
      </Item.Group>

      <Button
        className="btn--confirm"
        onClick={() => setOpenPINModal(true)}
      >
        {global.translate('Confirm & Top Up', 2224)}
      </Button>
      <Button
        onClick={() => {
          setStep(step - 1);
        }}
        basic
      >
        {global.translate('Back')}
      </Button>

      <PINConfirmationModal
        open={openPINModal}
        setOpen={setOpenPINModal}
        onPinConfirm={topUpFromBank}
        loading={loading}
        onClose={() => setOpenPINModal(false)}
        PIN={PIN}
        setPIN={setPIN}
      />
    </div>
  );
};

ConfirmTopUpFromBank.propTypes = {
  step: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired,
  addMoneyData: PropTypes.instanceOf(Object),
  topUpFromBank: PropTypes.func.isRequired,
};

ConfirmTopUpFromBank.defaultProps = {
  addMoneyData: {},
};

export default ConfirmTopUpFromBank;
