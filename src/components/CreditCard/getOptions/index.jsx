/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import {
  Button,
  Modal,
  List,
  Placeholder,
  Segment,
  Input,
  Message,
  Responsive,
} from 'semantic-ui-react';
import checkedIcon from 'assets/images/checkmark.svg';
import uncheckedIcon from 'assets/images/checkdisabled.svg';
import VisaCardIcon from 'assets/images/visa-card.png';
import MastserCardIcon from 'assets/images/mastercard.png';
import PinCodeForm from 'components/common/PinCodeForm';
import Wrapper from 'hoc/Wrapper';
import Img from 'components/common/Img';
import { updateCreditCardStep } from 'redux/actions/dashboard/dashboard';
import classes from './index.module.scss';

const GetCardOptions = ({
  getCardOptions,
  setAddCreditCardModalOpen,
  addCreditCardModalOpen,
  setForm,
}) => {
  const {
    creditCard: { step },
  } = useSelector(({ dashboard }) => dashboard);
  const dispatch = useDispatch();
  const {
    creditCardOptions,
    setPinDigit,
    pinDigit,
    setConfirmPinDigit,
    confirmPinDigit,
    error,
    setPin,
    setError,
    onOptionsChange,
    cardFormData,
    setCardFormData,
    setUserPinDigit,
    userPinDigit,
    userData,
    createCreditCard,
    submitCreditCard,
    // setStep,
    // step,
    form,
    creditCardNextStep,
  } = getCardOptions;
  useEffect(() => {
    if (!error) {
      setForm({
        ...form,
        ...cardFormData,
      });
    }
  }, [cardFormData]);
  useEffect(() => {
    if (userData.data) {
      setCardFormData({
        ...cardFormData,
        NameOnCard: `${userData.data.FirstName} ${userData.data.LastName}`,
      });
    }
  }, userData.data);
  const closeModal = () => {
    setAddCreditCardModalOpen(false);
    setForm({});
    setPin(null);
    setError(null);
    setCardFormData(null);
  };

  return (
    <Modal
      size="small"
      open={addCreditCardModalOpen}
      onClose={closeModal}
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
    >
      <Modal.Header style={{ textAlign: 'center' }}>
        {global.translate(`Create credit card`)}
      </Modal.Header>
      {step === 1 && (
        <Modal.Content>
          <div className={classes.CardHeaderConainter}>
            {creditCardOptions.loading ? (
              <Responsive
                className={classes.PlaceHolder}
                as={Segment}
                fluid
                style={{
                  width: '28rem',
                  height: '10rem',
                  margin: 'auto',
                }}
              >
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Responsive>
            ) : (
              <Wrapper>
                <div
                  style={{
                    border:
                      form.CardType === '1' &&
                      'solid rgba(234, 87, 38, 0.7) 1px',
                  }}
                  onClick={() => {
                    setForm({ ...form, CardType: '1' });
                    setError(null);
                  }}
                  className={classes.VisaCard}
                >
                  <img src={VisaCardIcon} alt="" />
                  <span>{global.translate(`Visa card`)}</span>
                </div>
                <div
                  style={{
                    border:
                      form.CardType === '2' &&
                      'solid rgba(234, 87, 38, 0.7) 1px',
                  }}
                  onClick={() => {
                    setForm({ ...form, CardType: '2' });
                    setError(null);
                  }}
                  className={classes.MasterCard}
                >
                  <img src={MastserCardIcon} alt="" />
                  <span>{global.translate(`Master card`)}</span>
                </div>
                <div className={classes.WalletContainer}>
                  <div className={classes.Wallet}>
                    <div className={classes.WalletImg}>
                      <Img
                        src={
                          creditCardOptions.data &&
                          creditCardOptions.data[0].Wallet.Flag
                        }
                        compress
                        width="20px"
                        height="20px"
                      />
                    </div>

                    <span>
                      {creditCardOptions.data &&
                        creditCardOptions.data[0].Wallet.WalletNumber}
                    </span>
                  </div>
                  <div className={classes.Balance}>
                    {global.translate(`Balance`, 95)}:{' '}
                    <strong>
                      {creditCardOptions.data &&
                        creditCardOptions.data[0].Wallet.Balance}
                    </strong>
                  </div>
                </div>
              </Wrapper>
            )}
          </div>
          <h5 className={classes.ThirdTitle}>
            {global.translate(`Debited from your account immediately. You will receive your
          card in the main within 15 business days`)}
          </h5>
          <h5 className={classes.SecondaryTitle}>
            {global.translate(`Choose the type of your credit card`)}
          </h5>
          <div
            className={
              creditCardOptions.loading ? classes.CardContainer : null
            }
          >
            {creditCardOptions.loading ? (
              <Segment
                style={{
                  width: '94%',
                  height: '10rem',
                  margin: 'auto',
                }}
              >
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            ) : (
              creditCardOptions.data &&
              creditCardOptions.data[0].CardLevels.map(level => (
                <div
                  style={{
                    border:
                      form.CardLevel === level.CardLevel &&
                      'solid rgba(234, 87, 38, 0.726) 1px',
                  }}
                  onClick={() => {
                    if (level.EnableLevel === 'YES') {
                      setForm({
                        ...form,
                        CardLevel: level.CardLevel,
                      });
                      setError(null);
                    }
                  }}
                  className={
                    level.EnableLevel === 'YES'
                      ? classes.CardContainer
                      : classes.CardDisabled
                  }
                >
                  <div className={classes.CardCheck}>
                    <img
                      src={
                        form.CardLevel === level.CardLevel
                          ? checkedIcon
                          : uncheckedIcon
                      }
                      alt=""
                    />
                  </div>
                  <div className={classes.RightSide}>
                    <div className={classes.CardContent}>
                      <div>
                        <h3>{level.LevelName}</h3>
                        <List bulleted>
                          <List.Item>
                            {level.SetupFeesText} : {level.SetupFees}
                          </List.Item>
                          <List.Item>
                            {level.MonthlyFeesText} :{' '}
                            {level.MonthlyFees}
                          </List.Item>
                          <List.Item>
                            {level.MonthlyLImitText} :{' '}
                            {level.MonthlyLimit}
                          </List.Item>
                        </List>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {error && step === 1 && (
              <Message
                style={{
                  width: '62%',
                  margin: 'auto',
                  textAlign: 'center',
                }}
                negative
              >
                <span style={{ fontSize: '.9rem' }}>{error}</span>
              </Message>
            )}
          </div>
        </Modal.Content>
      )}
      {step === 2 && (
        <Modal.Content>
          <div className={classes.PinForm}>
            <span className={classes.NameLable}>
              {global.translate(`Provide the name on the card`)}
            </span>
            <div>
              <Input
                style={{ marginTop: '.8rem' }}
                fluid
                placeholder="Name"
                onChange={onOptionsChange}
                value={
                  cardFormData?.NameOnCard ||
                  `${userData?.data?.FirstName} ${userData?.data?.LastName}`
                }
                name="NameOnCard"
              />
            </div>
            <Segment className={classes.PinSegment}>
              <PinCodeForm
                label={global.translate(
                  'Create your credit card PIN Number',
                )}
                onChange={({ target: { value, name } }) => {
                  setError(null);
                  setPinDigit({ ...pinDigit, [name]: value });
                }}
                name="PIN"
              />
              <br />
              <PinCodeForm
                label={global.translate(
                  'Confirm your credit card PIN number',
                )}
                onChange={({ target: { value, name } }) => {
                  setError(null);
                  setConfirmPinDigit({
                    ...confirmPinDigit,
                    [name]: value,
                  });
                }}
                name="PIN"
              />
            </Segment>
            {error && step === 2 && (
              <Message negative icon>
                <span style={{ width: '100%', fontSize: '.9rem' }}>
                  {error}
                </span>
              </Message>
            )}
            <PinCodeForm
              label={global.translate('Provide your PIN Number', 543)}
              onChange={({ target: { value, name } }) => {
                setUserPinDigit({
                  ...userPinDigit,
                  [name]: value,
                });
              }}
            />
          </div>
        </Modal.Content>
      )}

      <Modal.Actions>
        <Button
          disabled={createCreditCard?.loading}
          onClick={() => {
            closeModal();
          }}
          basic
          color="orange"
        >
          {global.translate(`Cancel`, 86)}
        </Button>
        {step === 2 && (
          <Button
            disabled={createCreditCard?.loading}
            onClick={() => {
              // setStep(1);
              updateCreditCardStep(1)(dispatch);
            }}
            basic
            color="orange"
          >
            {global.translate(`Back`, 174)}
          </Button>
        )}
        <Button
          disabled={
            step === 1
              ? creditCardOptions.loading
              : createCreditCard?.loading
          }
          loading={createCreditCard?.loading}
          onClick={() => {
            if (step === 1) {
              creditCardNextStep();
            }
            if (step === 2) {
              submitCreditCard();
            }
          }}
          positive
          content="Create"
        />
      </Modal.Actions>
    </Modal>
  );
};

GetCardOptions.propTypes = {
  addCreditCardModalOpen: propTypes.bool,
  setAddCreditCardModalOpen: propTypes.func,
  getCardOptions: propTypes.instanceOf(Object).isRequired,
  form: propTypes.instanceOf(Object).isRequired,
  setForm: propTypes.func.isRequired,
};

GetCardOptions.defaultProps = {
  addCreditCardModalOpen: false,
  setAddCreditCardModalOpen: () => {},
};

export default GetCardOptions;
