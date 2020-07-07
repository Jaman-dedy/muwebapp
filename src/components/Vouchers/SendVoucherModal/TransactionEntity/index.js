import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import './TransactionEntity.scss';
import PropTypes from 'prop-types';
import CustomDropdown from 'components/common/Dropdown/WalletDropdown';

function TransactionEntity({
  onChange,
  name,
  form,
  isSendingCash,
  walletList,
  DefaultWallet,
}) {
  const walletOptions =
    walletList &&
    walletList.map(el => {
      return {
        id: el.AccountNumber,
        text: el.AccountNumber,
        value: el.AccountNumber,
        Flag: el.Flag,
        AccountName: el.AccountName,
        AccountNumber: el.AccountNumber,
        Balance: el.Balance,
        CurrencyCode: el.CurrencyCode,
        content: (
          <div className="flag-wrapper" key={el.AccountName}>
            <Image src={el.Flag} width={30} />
            <div className="left">
              <h5 className="account">{el.AccountNumber}</h5>
              <small>({el.AccountName})</small>
            </div>
          </div>
        ),
      };
    });

  const changeWallet = item => {
    onChange(item);
  };

  const defaultOption =
    walletOptions &&
    walletOptions.find(item => item.id === DefaultWallet);

  const [currentOption, setCurrentOption] = useState(defaultOption);

  const setCurrentWalletOption = item => {
    setCurrentOption(item);
  };

  const renderLabel = label => {
    return {
      content: (
        <div className="flag-wrapper">
          <Image src={label.dp} width={30} />
          <div className="left">
            <h4 className="account">{label.AccountNumber}</h4>
            <small>({label.AccountName})</small>
          </div>
        </div>
      ),
    };
  };
  return (
    <>
      <div
        className="entity-wrapper"
        style={
          isSendingCash
            ? {
                display: 'flex',
                margin: 'auto',
                flexDirection: 'column',
                alignItems: 'center',
              }
            : {}
        }
      >
        <div className="rightItems">
          <p
            className="choose-wallet"
            style={isSendingCash ? { textAlign: 'center' } : {}}
          >
            {global.translate('Choose a wallet', 1222)}
          </p>

          <CustomDropdown
            options={walletOptions}
            currentOption={currentOption}
            setCurrentOption={setCurrentWalletOption}
            onChange={changeWallet}
            className="custom-dropdown"
            name={name}
            keyName={name}
            value={form[name]}
            renderLabel={renderLabel}
          />
        </div>
      </div>
    </>
  );
}

TransactionEntity.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  form: PropTypes.objectOf(PropTypes.any),
  isSendingCash: PropTypes.bool,
  walletList: PropTypes.arrayOf(PropTypes.any),
  DefaultWallet: PropTypes.objectOf(PropTypes.any),
};

TransactionEntity.defaultProps = {
  onChange: () => {},
  name: null,
  isSendingCash: false,
  form: {},
  walletList: [],
  DefaultWallet: {},
};
export default TransactionEntity;
