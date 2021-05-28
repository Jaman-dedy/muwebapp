import React from 'react';
import { Table, Button, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';
import moment from 'moment';
import ChangePinModal from '../ChangePinModal';

const TableDetails = ({
  card,
  setIsActivatingCard,
  setIsEnablingCard,
  setIsChangingPwd,
  openPinModal,
  setOpenPinModal,
  pinDigit,
  setPinDigit,
  setError,
  error,
  setConfirmPinDigit,
  confirmPinDigit,
  setUserPinDigit,
  userPinDigit,
  handleChangeCreditCardPin,
  disabled,
  loadOnChangePwd,
  setIsDeletingCard,
  getCreditCardLoading,
  loadOnActivate,
}) => {
  const creationDate = moment(card.CreationDate).format('ll');

  return (
    <div>
      <Table unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <span className="table-heading">
                {global.translate('Status')}
              </span>
              {loadOnActivate ||
                (getCreditCardLoading && (
                  <Loader active inline size="tiny" />
                ))}
              {!getCreditCardLoading && card?.Activated === 'NO' && (
                <Button
                  onClick={() => {
                    setIsActivatingCard(true);
                    setIsEnablingCard(false);
                    setIsChangingPwd(false);
                  }}
                  style={{
                    backgroundColor: '#343657',
                    color: '#ffff',
                  }}
                  className="table-button"
                >
                  {global.translate('I have received my M-Card')}
                </Button>
              )}
              {!getCreditCardLoading &&
                card?.Enabled === 'YES' &&
                card?.Activated === 'YES' && (
                  <Button
                    onClick={() => {
                      setIsActivatingCard(false);
                      setIsEnablingCard(true);
                      setIsChangingPwd(false);
                    }}
                    style={{
                      backgroundColor: '#343657',
                      color: '#ffff',
                    }}
                    className="table-button"
                  >
                    {global.translate('Disable this card')}
                  </Button>
                )}
              {!getCreditCardLoading &&
                card?.Enabled === 'NO' &&
                card?.Activated === 'YES' && (
                  <Button
                    onClick={() => {
                      setIsActivatingCard(false);
                      setIsEnablingCard(true);
                      setIsChangingPwd(false);
                    }}
                    style={{
                      backgroundColor: '#343657',
                      color: '#ffff',
                    }}
                    className="table-button"
                  >
                    {global.translate('Enable this card')}
                  </Button>
                )}
            </Table.Cell>
            <Table.Cell textAlign="right">
              {!getCreditCardLoading &&
                card?.Activated === 'NO' &&
                global.translate('Card is inactive')}
              {!getCreditCardLoading &&
                card?.Activated === 'YES' &&
                card?.Enabled === 'YES' &&
                global.translate('Card is enabled')}
              {!getCreditCardLoading &&
                card?.Activated === 'YES' &&
                card?.Enabled === 'NO' &&
                global.translate('Card is disabled')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="table-wallet-section">
                {global.translate('Wallet')}
              </span>
              <span className="table-wallet-number">
                {card?.WalletNumber}
              </span>
            </Table.Cell>
            <Table.Cell textAlign="right" />
          </Table.Row>
          <Table.Row>
            <Table.Cell>{global.translate('CVV')}</Table.Cell>
            <Table.Cell textAlign="right">{card?.CVV}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Expiration date')}
            </Table.Cell>
            <Table.Cell textAlign="right">{`${card?.MM}-${card?.YYYY}`}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Creation date')}
            </Table.Cell>
            <Table.Cell textAlign="right">{creationDate}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{card?.MonthlyLImitText}</Table.Cell>
            <Table.Cell textAlign="right">
              {card?.MonthlyLimit}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{card?.MonthlyFeesText}</Table.Cell>
            <Table.Cell textAlign="right">
              {card?.MonthlyFees}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{global.translate('Card type')}</Table.Cell>
            <Table.Cell textAlign="right">
              {card?.CardType === 1 ? 'Visa' : 'Master card'}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="action-heading">
                {global.translate('PIN')}
              </span>
              <span>{global.translate('Change card PIN')}</span>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                style={{ backgroundColor: '#343657', color: '#ffff' }}
                onClick={() => setOpenPinModal(true)}
              >
                {global.translate('Change')}
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <span className="action-heading">
                {global.translate('Lost this card?')}
              </span>
              <span>
                {global.translate('Disable and delete the card')}
              </span>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                style={{ backgroundColor: '#343657', color: '#ffff' }}
                onClick={setIsDeletingCard}
              >
                {global.translate('Delete')}
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <ChangePinModal
        openPinModal={openPinModal}
        setOpenPinModal={setOpenPinModal}
        pinDigit={pinDigit}
        setPinDigit={setPinDigit}
        setError={setError}
        error={error}
        setConfirmPinDigit={setConfirmPinDigit}
        confirmPinDigit={confirmPinDigit}
        setUserPinDigit={setUserPinDigit}
        userPinDigit={userPinDigit}
        handleChangeCreditCardPin={handleChangeCreditCardPin}
        disabled={disabled}
        loadOnChangePwd={loadOnChangePwd}
      />
    </div>
  );
};

TableDetails.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  setIsActivatingCard: PropTypes.func.isRequired,
  setIsEnablingCard: PropTypes.func.isRequired,
  setIsChangingPwd: PropTypes.func.isRequired,
  openPinModal: PropTypes.bool,
  setOpenPinModal: PropTypes.func,
  pinDigit: PropTypes.objectOf(PropTypes.any),
  setPinDigit: PropTypes.func,
  setError: PropTypes.func,
  error: PropTypes.objectOf(PropTypes.any),
  setConfirmPinDigit: PropTypes.func,
  confirmPinDigit: PropTypes.bool,
  setUserPinDigit: PropTypes.func,
  userPinDigit: PropTypes.objectOf(PropTypes.any),
  handleChangeCreditCardPin: PropTypes.func,
  disabled: PropTypes.bool,
  loadOnChangePwd: PropTypes.bool,
  setIsDeletingCard: PropTypes.func,
};
TableDetails.defaultProps = {
  openPinModal: false,
  setOpenPinModal: () => {},
  pinDigit: {},
  setPinDigit: () => {},
  setError: () => {},
  error: {},
  setConfirmPinDigit: () => {},
  confirmPinDigit: false,
  setUserPinDigit: () => {},
  userPinDigit: {},
  handleChangeCreditCardPin: () => {},
  disabled: false,
  loadOnChangePwd: false,
  setIsDeletingCard: () => {},
};

export default TableDetails;
