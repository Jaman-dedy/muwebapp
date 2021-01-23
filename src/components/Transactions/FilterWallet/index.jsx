import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';
import WalletDropDown from './WalletDropDown';

const FilterDropDown = ({
  walletList,
  setTargetWallet,
  setSourceWallet,
  targetWallet,
  sourceWallet,
  onFilterWallet,
  fetchAllTransaction,
  allTransactionData,
}) => (
  <div>
    <Dropdown
      closeOnBlur={false}
      text="Filter wallets"
      pointing
      className="custom-dropdown-box"
    >
      <Dropdown.Menu className="wallet-select">
        <div>Source account</div>
        <WalletDropDown
          source
          setSourceWallet={setSourceWallet}
          walletList={walletList}
          wallet={sourceWallet}
          allTransactionData={allTransactionData}
        />
        <div>Target account</div>
        <WalletDropDown
          target
          setTargetWallet={setTargetWallet}
          walletList={walletList}
          wallet={targetWallet}
          allTransactionData={allTransactionData}
        />
        <div className="wallet-action-button">
          <Button onClick={fetchAllTransaction}>
            {global.translate('Reset')}
          </Button>
          <Button onClick={onFilterWallet}>
            {global.translate('Apply')}
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

FilterDropDown.propTypes = {
  walletList: PropTypes.func,
  setTargetWallet: PropTypes.func,
  setSourceWallet: PropTypes.func,
  targetWallet: PropTypes.objectOf(PropTypes.any),
  sourceWallet: PropTypes.objectOf(PropTypes.any),
  onFilterWallet: PropTypes.func,
  fetchAllTransaction: PropTypes.func,
  allTransactionData: PropTypes.arrayOf(PropTypes.any),
};
FilterDropDown.defaultProps = {
  walletList: () => {},
  setTargetWallet: () => {},
  setSourceWallet: () => {},
  targetWallet: {},
  sourceWallet: {},
  onFilterWallet: () => {},
  fetchAllTransaction: () => {},
  allTransactionData: [],
};

export default FilterDropDown;
