/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Header, Container } from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import deleteCreditCard from 'redux/actions/credit-card/deleteCreditCard';
import TextInput from 'components/common/TextField/FlatInput';
import GoBack from 'components/common/GoBack';
import './style.scss';
import './custmised-sematinc-style.scss';
import InfoMessage from 'components/common/InfoMessage';
import SingleCardView from '../creditCardList/SingleCardView';
import TableDetails from './TableDetails';
import ConfirmPinModal from './confirmPinModal';

const CreditCardDetails = ({ creditCardDetails }) => {
  const {
    wallet,
    handleChangeCreditCardPin,
    setForm,
    form,
    pinDigit,
    setUserPinDigit,
    userPinDigit,
    changeCreditCardPin,
    shouldClear,
    setShouldClear,
    handleActivateCard,
    setconfirmPinOpen,
    isActivatingCard,
    setIsActivatingCard,
    isEnablingCard,
    setIsEnablingCard,
    isChangingPwd,
    setIsChangingPwd,
    pinError,
    setPinError,
    handleEnableCard,
    loadOnEnable,
    loadOnActivate,
    openPinModal,
    setOpenPinModal,
    setPinDigit,
    setConfirmPinDigit,
    confirmPinDigit,
    error,
  } = creditCardDetails;
  const dispatch = useDispatch();

  const {
    loading: loadOnDelete,
    success: deleteCardSuccess,
  } = useSelector(
    ({ creditCard: { deleteCreditCard } }) => deleteCreditCard,
  );
  const [isDeletingCard, setIsDeletingCard] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const history = useHistory();
  const onClickHandler = () => history.goBack();

  const handleConfirmationTextChange = (e, { value }) => {
    setConfirmationText(value);
  };

  const handleDeleteCard = () => {
    deleteCreditCard({
      Wallet: wallet.WalletNumber,
      PIN: form.PIN,
      CardNumber: wallet.CardNumber,
      history,
    })(dispatch);
  };

  useEffect(() => {
    if (deleteCardSuccess) {
      setIsDeletingCard(false);
    }
  }, [deleteCardSuccess]);
  useEffect(() => {
    if (wallet) {
      setForm({
        ...form,
        CardNumber: wallet.CardNumber,
      });
    }
  }, [pinDigit]);
  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('My M-Card', 2150)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="CreditCard">
        <SingleCardView card={wallet} detail />
        <div className="all-details">
          {wallet?.Activated === 'NO' && (
            <InfoMessage
              description={global.translate(
                'This card is currently inactive. You will be able to activate it once your confirm that you have received it',
              )}
            />
          )}

          <div className="details-table">
            <TableDetails
              openPinModal={openPinModal}
              setOpenPinModal={setOpenPinModal}
              card={wallet}
              setIsActivatingCard={setIsActivatingCard}
              setIsEnablingCard={setIsEnablingCard}
              setIsChangingPwd={setIsChangingPwd}
              pinDigit={pinDigit}
              setPinDigit={setPinDigit}
              setError={setPinError}
              error={pinError}
              setConfirmPinDigit={setConfirmPinDigit}
              confirmPinDigit={confirmPinDigit}
              setUserPinDigit={setUserPinDigit}
              userPinDigit={userPinDigit}
              handleChangeCreditCardPin={handleChangeCreditCardPin}
              disabled={changeCreditCardPin.loading}
              loadOnChangePwd={changeCreditCardPin.loading}
              setIsDeletingCard={setIsDeletingCard}
            />
          </div>
        </div>
      </div>

      <ConfirmPinModal
        open={
          isActivatingCard ||
          isEnablingCard ||
          isChangingPwd ||
          isDeletingCard
        }
        isActivatingCard={isActivatingCard}
        isEnablingCard={isEnablingCard}
        isChangingPwd={isChangingPwd}
        setOpen={setconfirmPinOpen}
        handleActivateCard={handleActivateCard}
        setUserPinDigit={setUserPinDigit}
        shouldClear={shouldClear}
        setShouldClear={setShouldClear}
        handleChangeCreditCardPin={handleChangeCreditCardPin}
        setIsActivatingCard={setIsActivatingCard}
        setIsEnablingCard={setIsEnablingCard}
        setIsChangingPwd={setIsChangingPwd}
        error={pinError}
        setError={setPinError}
        userPinDigit={userPinDigit}
        loadOnChangePwd={changeCreditCardPin.loading}
        loadOnEnable={loadOnEnable}
        loadOnActivate={loadOnActivate}
        disabled={changeCreditCardPin.loading}
        setForm={setForm}
        handleEnableCard={handleEnableCard}
        loadOnDeleteCard={loadOnDelete}
        loading={
          loadOnActivate ||
          loadOnDelete ||
          loadOnEnable ||
          changeCreditCardPin.loading
        }
        modalTitle={
          isDeletingCard
            ? global.translate(
                'Remove this card from your wallet',
                2127,
              )
            : null
        }
        setIsDeletingCard={setIsDeletingCard}
        handleDeleteCard={handleDeleteCard}
        isDeletingCard={isDeletingCard}
        canProceed={
          confirmationText === wallet.Last4Digits &&
          form?.PIN?.length === 4
        }
      >
        {isDeletingCard && (
          <>
            <Header as="h4" color="red">
              {global.translate(
                'Deleting this card will permanently remove it from your wallet, Would you like to proceed?',
                2147,
              )}
            </Header>
            <p className="verification-message">
              {global.translate(
                'This action can lead to data loss. To prevent accidental actions we ask you to confirm your intention.',
                1856,
              )}
            </p>
            <p>
              {global.translate(
                'Please type the following text to proceed.',
                2148,
              )}{' '}
              <span className="ui label">{`${wallet.Last4Digits}`}</span>
            </p>
            <Container textAlign="center">
              <TextInput
                value={confirmationText}
                onChange={handleConfirmationTextChange}
                autoComplete="off"
              />
            </Container>
            <Divider />
          </>
        )}
      </ConfirmPinModal>
    </DashboardLayout>
  );
};
CreditCardDetails.propTypes = {
  creditCardDetails: propTypes.instanceOf(Object).isRequired,
  pinDigit: propTypes.instanceOf(Object),
  confirmPinDigit: propTypes.instanceOf(Object),
  setPinDigit: propTypes.func,
  pinError: propTypes.string.isRequired,
  setPinError: propTypes.func.isRequired,
  handleEnableCard: propTypes.func.isRequired,
  error: propTypes.instanceOf(Object).isRequired,
};
CreditCardDetails.defaultProps = {
  pinDigit: {},
  confirmPinDigit: {},
  setPinDigit: () => {},
};

export default CreditCardDetails;
