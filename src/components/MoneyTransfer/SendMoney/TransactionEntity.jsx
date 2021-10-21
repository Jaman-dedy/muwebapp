import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import './entity-wrapper.scss';
import Thumbnail from 'components/common/Thumbnail';
import CustomDropdown from 'components/common/Dropdown/WalletDropdown';
import Wrapper from 'hoc/Wrapper';
import Img from 'components/common/Img';

const TransactionEntity = ({
  onChange,
  name,
  form,
  data,
  isSendingCash,
  walletList,
  currentOption,
  setCurrentOption,
  walletTitle,
  destinationContact,
  isSelfBuying,
}) => {
  const { isSendingMoney } = useSelector(
    state => state.dashboard.contactActions,
  );
  const { userData } = useSelector(({ user }) => user);
  const [hasError, setHasError] = useState(false);

  const location = useLocation();
  const queryParams = queryString?.parse(location.search);
  const { ref } = queryParams;

  useEffect(() => {
    if (Array.isArray(walletList)) {
      const defaultWallet = walletList?.filter(
        wallet => wallet.Default === 'YES',
      );
      if (!currentOption) {
        setCurrentOption(defaultWallet[0]);
      }
    }
  }, []);

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
        Currency: el.CurrencyCode,
        Balance: el.Balance,
        content: (
          <div className="flag-wrapper" key={el.AccountName}>
            <Img
              format="png"
              compress
              src={el.Flag}
              width="50px"
              height="50px"
            />
            <div className="left">
              <h5 className="account">{el.AccountNumber}</h5>
            </div>
          </div>
        ),
      };
    });

  const renderLabel = label => {
    return {
      content: (
        <div className="flag-wrapper">
          <Img
            format="png"
            compress
            src={label.dp}
            width={30}
            height={30}
          />
          <div className="left">
            <h4 className="account">{label.AccountNumber}</h4>
            <small>({label.AccountName})</small>
          </div>
        </div>
      ),
    };
  };
  return (
    <div
      className={`entity-wrapper ${ref === 'send-cash' &&
        'send-cash'}`}
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
      {data && data.data && (
        <div className="transacters">
          {' '}
          <Thumbnail
            name={userData?.data?.FirstName || ''}
            avatar={userData?.data?.PictureURL || ''}
            secondName={userData?.data?.LastName || ''}
            width={75}
            height={75}
            style={{
              height: 75,
              width: 75,
              marginLeft: isSendingCash ? '24px' : '0px',
              alignSelf: isSendingCash ? 'center' : 'flex-end',
              borderRadius: '50%',
            }}
            hasError={hasError}
            setHasError={setHasError}
          />
          {!isSendingMoney && !isSelfBuying && (
            <Wrapper>
              {destinationContact &&
                Object.keys(destinationContact).length > 0 && (
                  <>
                    <span className="destination">
                      {global.translate('To')}{' '}
                    </span>
                    <Thumbnail
                      width={75}
                      height={75}
                      style={{
                        width: 75,
                        height: 75,
                        marginLeft:
                          isSendingCash || ref === 'send-cash'
                            ? '24px'
                            : '0px',
                        alignSelf: isSendingCash
                          ? 'center'
                          : 'flex-end',
                        borderRadius: '50%',
                      }}
                      name={destinationContact.FirstName}
                      avatar={destinationContact.PictureURL}
                      secondName={destinationContact.LastName}
                      hasError={hasError}
                      setHasError={setHasError}
                    />
                  </>
                )}
            </Wrapper>
          )}
        </div>
      )}

      <div className="rightItems">
        <CustomDropdown
          options={walletOptions}
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
          onChange={onChange}
          className="custom-dropdown"
          name={name}
          keyName={name}
          value={form[name]}
          renderLabel={renderLabel}
        />
      </div>
    </div>
  );
};

TransactionEntity.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  form: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.objectOf(PropTypes.any),
  isSendingCash: PropTypes.bool,
  walletTitle: PropTypes.string,
  walletList: PropTypes.arrayOf(PropTypes.any),
  currentOption: PropTypes.objectOf(PropTypes.any),
  setCurrentOption: PropTypes.func.isRequired,
  destinationContact: PropTypes.objectOf(PropTypes.any),
  isSelfBuying: PropTypes.bool,
};

TransactionEntity.defaultProps = {
  onChange: () => {},
  name: null,
  isSendingCash: false,
  form: {},
  currentOption: null,
  data: {},
  walletList: [],
  walletTitle: '',
  destinationContact: {},
  isSelfBuying: false,
};
export default TransactionEntity;
