import React from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';

import DetailHeading from './DetailHeading';
import DetailTypeAction from './DetailTypAction';
import './style.scss';
import DisplayWallet from './DisplayWallet';
import DetailsBody from './DetailsBody';

const TransactionDetails = ({
  item,
  selectedCard,
  setPhoneValue,
  phoneValue,
  onOptionChange,
  form,
  modifyOneTransaction,
  updating,
  updatingData,
  updatingError,
  openEditTransaction,
  setOpenEditTransaction,
}) => {
  const history = useHistory();
  const onClickHandler = () => history.goBack();
  const walletInfos = () => {
    if (selectedCard === 1) {
      return {
        sourceWallet: item.WalletNumber,
        sourceCurrency: item.SourceCurrencyFlag,
        targetWallet: item.TargetAccount,
        targetCurrency: item.TargetCurrencyFlag,
      };
    }
    if (selectedCard === 2) {
      return {
        sourceWallet: item.SourceAccountNumber,
        sourceCurrency: item.SourceCurrencyFlag,
        targetWallet: `${item.PhonePrefix} ${item.Phone}`,
        targetCurrency: item.DestCurrencyFlag,
      };
    }
    if (selectedCard === 3) {
      return {
        sourceWallet: item.SourceAccountNumber,
        sourceCurrency: item.CurrencyFlag,
        targetWallet: `${item.Recipient.Prefix} ${item.Recipient.Phone}`,
        targetCurrency: item.Recipient.CountryFlag,
      };
    }
    if (selectedCard === 4) {
      return {
        sourceWallet: item.SourceAccountNumber,
        sourceCurrency: item.SourceCurrencyFlag,
        targetWallet: `${item.PhonePrefix} ${item.Phone}`,
        targetCurrency: item.DestCurrencyFlag,
      };
    }
  };
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Transaction details')}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="transaction-detail-container">
        <Segment>
          <DetailHeading item={item} selectedCard={selectedCard} />
          <DetailTypeAction
            item={item}
            selectedCard={selectedCard}
            phoneValue={phoneValue}
            setPhoneValue={setPhoneValue}
            onOptionChange={onOptionChange}
            form={form}
            modifyOneTransaction={modifyOneTransaction}
            updating={updating}
            updatingData={updatingData}
            updatingError={updatingError}
            openEditTransaction={openEditTransaction}
            setOpenEditTransaction={setOpenEditTransaction}
          />
          <div className="display-wallets">
            <DisplayWallet
              title={global.translate('Source account')}
              walletNumber={walletInfos().sourceWallet}
              walletFlag={walletInfos().sourceCurrency}
            />
            <DisplayWallet
              title={global.translate('Target account')}
              walletNumber={walletInfos().targetWallet}
              walletFlag={walletInfos().targetCurrency}
            />
          </div>
          <DetailsBody
            item={item}
            selectedCard={selectedCard}
            updatingData={updatingData}
          />
        </Segment>
        <div className="goto-transactions">
          <Button onClick={() => history.push('/transactions')}>
            {global.translate('Go to all transactions')}
          </Button>
          {(selectedCard === 2 || selectedCard === 4) && (
            <Button onClick={() => history.push('/transactions')}>
              {global.translate('Cancel transaction')}
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
TransactionDetails.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  selectedCard: PropTypes.number,
  setPhoneValue: PropTypes.func,
  phoneValue: PropTypes.string,
};
TransactionDetails.defaultProps = {
  item: {},
  selectedCard: 1,
  setPhoneValue: () => {},
  phoneValue: '',
};

export default TransactionDetails;
