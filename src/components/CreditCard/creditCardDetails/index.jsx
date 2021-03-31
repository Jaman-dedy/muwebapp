/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Modal, Button } from 'semantic-ui-react';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import deleteCreditCard from 'redux/actions/credit-card/deleteCreditCard';
import TextInput from 'components/common/TextField/FlatInput';
import GoBack from 'components/common/GoBack';
import './style.scss';
import './custmised-sematinc-style.scss';
import InfoMessage from 'components/common/InfoMessage';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import SingleCardView from '../creditCardList/SingleCardView';
import TableDetails from './TableDetails';

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
    setShouldClear,
    handleActivateCard,
    setConfirmPinOpen,
    isActivatingCard,
    setIsActivatingCard,
    isEnablingCard,
    setIsEnablingCard,
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
  const [deleteCardStep, setDeleteCardStep] = useState(1);

  const history = useHistory();
  const onClickHandler = () => history.goBack();

  const closePINModalHandler = () => {
    setIsActivatingCard(false);
    setIsEnablingCard(false);
    setIsChangingPwd(false);
    setIsDeletingCard(false);
    setShouldClear(true);
    setForm({});
    setDeleteCardStep(1);
  };

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

  const pinConfirmedHandler = () => {
    if (isActivatingCard) {
      handleActivateCard();
    }
    if (isEnablingCard) {
      handleEnableCard();
    }
    if (isDeletingCard) {
      handleDeleteCard();
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

      {(isActivatingCard ||
        isEnablingCard ||
        (isDeletingCard && deleteCardStep === 2)) && (
        <PINConfirmationModal
          open={
            isActivatingCard ||
            isEnablingCard ||
            (isDeletingCard && deleteCardStep === 2)
          }
          setOpen={setConfirmPinOpen}
          loading={
            loadOnActivate ||
            loadOnDelete ||
            loadOnEnable ||
            changeCreditCardPin.loading
          }
          onPinChange={setUserPinDigit}
          onClose={closePINModalHandler}
          onPinConfirm={pinConfirmedHandler}
          PIN={userPinDigit}
          setPIN={setUserPinDigit}
        />
      )}

      <Modal
        size="tiny"
        open={isDeletingCard && deleteCardStep === 1}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          {global.translate(
            'Remove this card from your wallet',
            2127,
          )}
        </Modal.Header>
        <Modal.Content>
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
              'Please type the following text to proceed',
              2148,
            )}{' '}
            <span className="ui label">{`${wallet.Last4Digits}`}</span>
          </p>

          <TextInput
            value={confirmationText}
            onChange={handleConfirmationTextChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            className="btn--cancel"
            onClick={() => {
              setIsDeletingCard(false);
              setConfirmationText('');
            }}
          >
            {global.translate('Cancel')}
          </Button>
          <Button
            className="btn--confirm"
            onClick={() => {
              setDeleteCardStep(2);
              setConfirmationText('');
            }}
            disabled={confirmationText !== wallet.Last4Digits}
          >
            {global.translate('Proceed')}
          </Button>
        </Modal.Actions>
      </Modal>
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
};
CreditCardDetails.defaultProps = {
  pinDigit: {},
  confirmPinDigit: {},
  setPinDigit: () => {},
};

export default CreditCardDetails;
