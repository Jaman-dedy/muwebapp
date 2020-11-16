/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Item, Tab, Label, Segment, Button } from 'semantic-ui-react';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import getVirtualCard from 'redux/actions/virtualCard/getVirtualCard';
import VirtualCard from '../Item';
import classes from '../VirtualCards.module.scss';

const VirtualCardDetails = ({
  selectedWallet,
  setSelectedWallet,
  onOptionsChange,
  form,
  setForm,
  onAddMoneyToVirtualCard,
  isViewingDetail,
  setIsViewingDetail,
  userLocationData,
  step,
  setStep,
  setErrors,
  errors,
  checkTransactionConfirmation,
  confirmationData,
  confirmationError,
  checking,
  loading,
  addMoneyOpen,
  setAddMoneyOpen,
  cardStatus,
  setCardStatus,
  onUpdateCardStatus,
  loadingStatus,
  onRenewVirtualCard,
  renewCardLoad,
  onRedeeMoney,
  setisRedeeming,
  isRedeeming,
  loadRedeeMoney,
  error,
  userData,
  confirmRedeem,
  setConfirmRedeem,
  openConfirmModal,
  setOpenConfirmModal,
  shouldClear,
}) => {
  const [canViewDetail, setCanViewDetail] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  const {
    virtualCardList: { data },
  } = useSelector(state => state.virtualCard);

  const location = useLocation();
  const history = useHistory();
  const dateYear = new Date();

  useEffect(() => {
    setCurrentCard(
      data?.find(
        item => item.CardNumber === location?.state?.item.CardNumber,
      ),
    );
  }, [location, data]);

  useEffect(() => {
    if (!data) {
      getVirtualCard()(dispatch);
    }
  }, []);

  useEffect(() => {
    setIsViewingDetail(true);
  }, []);
  useEffect(() => {
    if (currentCard) {
      setCardStatus(currentCard.Enabled);
    } else {
      setCardStatus(location?.state?.item?.Enabled);
    }
  }, [currentCard]);
  const onClickHandler = () => history.goBack();
  const goToSetting = () => {
    setActiveIndex(1);
  };
  const handleTableChange = (e, { activeIndex }) => {
    setActiveIndex(activeIndex);
  };

  useEffect(() => {
    setForm({
      ...form,
      CardNumber: location?.state?.item.CardNumber,
    });
  }, []);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <Item.Group>
            {cardStatus === 'YES' ? (
              <Label as="a" color="green" ribbon>
                {global.translate(`Active`, 1749)}
              </Label>
            ) : (
              <Label as="a" color="red" ribbon>
                {global.translate(`Disabled`, 1762)}
              </Label>
            )}
            <VirtualCard
              virtualCard={currentCard}
              userData={userData?.data}
              canViewDetail={canViewDetail}
              setCanViewDetail={setCanViewDetail}
              goToSetting={goToSetting}
              selectedWallet={selectedWallet && selectedWallet}
              setSelectedWallet={setSelectedWallet}
              onOptionsChange={onOptionsChange}
              form={form}
              setForm={setForm}
              onAddMoneyToVirtualCard={() =>
                onAddMoneyToVirtualCard(currentCard)
              }
              isViewingDetail={isViewingDetail}
              userLocationData={userLocationData}
              step={step}
              setStep={setStep}
              errors={errors}
              setErrors={setErrors}
              checking={checking}
              confirmationData={confirmationData}
              confirmationError={confirmationError}
              loading={loading}
              addMoneyOpen={addMoneyOpen}
              setAddMoneyOpen={setAddMoneyOpen}
              onRedeeMoney={() => onRedeeMoney(currentCard)}
              isRedeeming={isRedeeming}
              setisRedeeming={setisRedeeming}
              loadRedeeMoney={loadRedeeMoney}
              error={error}
              confirmRedeem={confirmRedeem}
              setConfirmRedeem={setConfirmRedeem}
              checkTransactionConfirmation={
                checkTransactionConfirmation
              }
              setOpenConfirmModal={setOpenConfirmModal}
              openConfirmModal={openConfirmModal}
              shouldClear={shouldClear}
            />
          </Item.Group>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <WelcomeBar>
        <div className="head-content">
          <div className="go-back">
            <GoBack style onClickHandler={onClickHandler} />
          </div>
          <h2 className="head-title">
            {global.translate('Virtual card', 1999)}
          </h2>
          <div className="clear" />
        </div>
      </WelcomeBar>
      <div className="VirtualCardDetails">
        <Tab
          menu={{ text: true }}
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={handleTableChange}
        />
        <Segment piled style={{ marginTop: '10px' }}>
          <span className={classes.Titles}>
            {global.translate(`Disable this virtual card`, 1694)}
          </span>
          <br />
          <span style={{ color: '#9799AA', marginTop: '.6rem' }}>
            {global.translate(
              `When your virtual card is disabled, it will not be used
            for any online transaction, until you enable it again`,
              2045,
            )}
          </span>{' '}
          <br />
          {cardStatus === 'YES' ? (
            <Button
              loading={loadingStatus}
              onClick={onUpdateCardStatus}
              style={{ marginTop: '.7rem', marginLeft: '.4rem' }}
              basic
              color="orange"
            >
              {global.translate(`Disable`, 2046)}
            </Button>
          ) : (
            <Button
              loading={loadingStatus}
              onClick={onUpdateCardStatus}
              style={{ marginTop: '.7rem', marginLeft: '.4rem' }}
              basic
              color="green"
            >
              {global.translate(`Enable`, 2047)}
            </Button>
          )}
          <hr style={{ margin: '1rem .4rem' }} />
          <span className={classes.Titles}>
            {global.translate(`Renew a virtual card`, 1691)}
          </span>
          <br />
          <span style={{ color: '#9799AA' }}>
            {global.translate(
              `You can renew your virtual card`,
              2048,
            )}
          </span>{' '}
          <br />
          <Button
            disabled={!(dateYear.getFullYear() >= currentCard?.YYYY)}
            loading={renewCardLoad}
            onClick={onRenewVirtualCard}
            style={{ marginTop: '.7rem', marginLeft: '.4rem' }}
            basic
            color="orange"
          >
            {global.translate(`Renew a virtual card`, 1691)}
          </Button>
        </Segment>
      </div>
    </DashboardLayout>
  );
};
VirtualCardDetails.propTypes = {
  selectedWallet: PropTypes.objectOf(PropTypes.any),
  setSelectedWallet: PropTypes.func,
  onOptionsChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  onAddMoneyToVirtualCard: PropTypes.func,
  isViewingDetail: PropTypes.bool,
  setIsViewingDetail: PropTypes.func,
  userLocationData: PropTypes.objectOf(PropTypes.any),
  step: PropTypes.number,
  setStep: PropTypes.func,
  setErrors: PropTypes.func,
  errors: PropTypes.string,
  checkTransactionConfirmation: PropTypes.func,
  confirmationData: PropTypes.objectOf(PropTypes.any),
  confirmationError: PropTypes.objectOf(PropTypes.any),
  checking: PropTypes.bool,
  loading: PropTypes.bool,
  addMoneyOpen: PropTypes.bool,
  setAddMoneyOpen: PropTypes.func,
  cardStatus: PropTypes.string,
  setCardStatus: PropTypes.func,
  onUpdateCardStatus: PropTypes.func,
  loadingStatus: PropTypes.bool,
  onRenewVirtualCard: PropTypes.func,
  renewCardLoad: PropTypes.bool,
  onRedeeMoney: PropTypes.func,
  setisRedeeming: PropTypes.func,
  isRedeeming: PropTypes.bool,
  loadRedeeMoney: PropTypes.bool,
  error: PropTypes.string,
  userData: PropTypes.objectOf(PropTypes.any),
  confirmRedeem: PropTypes.bool,
  setConfirmRedeem: PropTypes.func,
  openConfirmModal: PropTypes.bool,
  setOpenConfirmModal: PropTypes.func,
  shouldClear: PropTypes.bool,
};
VirtualCardDetails.defaultProps = {
  selectedWallet: {},
  setSelectedWallet: () => {},
  onOptionsChange: () => {},
  form: {},
  setForm: () => {},
  onAddMoneyToVirtualCard: () => {},
  isViewingDetail: false,
  setIsViewingDetail: () => {},
  userLocationData: {},
  step: null,
  setStep: () => {},
  setErrors: () => {},
  errors: null,
  checkTransactionConfirmation: () => {},
  confirmationData: {},
  confirmationError: null,
  checking: false,
  loading: false,
  addMoneyOpen: false,
  setAddMoneyOpen: () => {},
  cardStatus: 'YES',
  setCardStatus: () => {},
  onUpdateCardStatus: () => {},
  loadingStatus: false,
  onRenewVirtualCard: () => {},
  renewCardLoad: false,
  onRedeeMoney: () => {},
  setisRedeeming: () => {},
  isRedeeming: false,
  loadRedeeMoney: false,
  error: null,
  userData: {},
  confirmRedeem: false,
  setConfirmRedeem: () => {},
  openConfirmModal: false,
  setOpenConfirmModal: () => {},
  shouldClear: false,
};

export default VirtualCardDetails;
