/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Item, Input } from 'semantic-ui-react';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import Wrapper from 'hoc/Wrapper';
import classes from './VirtualCards.module.scss';
import VirtualCard from './Item';
import PlaceHolder from './PlaceHolder';
import AddVirtualCardModal from './AddVirtualCardModal';

const MyVirtualCards = ({
  virtualCardList,
  isLoading,
  userData,
  currencies,
  onOptionsChange,
  onAddVirtualCard,
  selectedCurrency,
  setSelectedCurrency,
  selectedCard,
  setSelectedCard,
  virtualCardTypes,
  errors,
  setErrors,
  addVirtualCard,
  open,
  setOpen,
  size,
  setSize,
  addMoneyOpen,
  setAddMoneyOpen,
}) => {
  const history = useHistory();
  const [myVirtualCardList, setMyVirtualCardList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const onClickHandler = () => history.goBack();
  const handleOnClick = (item, userData) => {
    history.push({
      pathname: 'virtual-card-details',
      state: { item, userData },
    });
  };
  const handleModalOpen = () => {
    setOpen(true);
    setSize('tiny');
  };
  useEffect(() => {
    if (virtualCardList) {
      setMyVirtualCardList(
        virtualCardList.filter(virtualCard => {
          return virtualCard.RecordsCount !== '0';
        }),
      );
    }
  }, [virtualCardList]);

  useEffect(() => {
    if (virtualCardList) {
      if (virtualCardList[0].RecordsCount === '0') {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    }
  }, [virtualCardList]);
  const handleKeyUp = e => {
    e.persist();
    const search = e.target.value;
    const data = virtualCardList;
    if (search.trim().length > 0) {
      const found = data.filter(
        item =>
          (item.CardNumber &&
            item.CardNumber.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.CardType &&
            item.CardType.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.CardNumberSpaced &&
            item.CardNumberSpaced.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.CVV &&
            item.CVV.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.YYYY &&
            item.YYYY.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.Currency &&
            item.Currency.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.Balance &&
            item.Balance.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.CreationDate &&
            item.CreationDate.toLowerCase().startsWith(
              search.toLowerCase(),
            )),
      );
      setMyVirtualCardList(found);
    } else if (virtualCardList) setMyVirtualCardList(virtualCardList);
  };
  return (
    <>
      <DashboardLayout>
        <WelcomeBar>
          <div className="head-content">
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
            <h2 className="head-title">
              {global.translate('Virtual cards')}
            </h2>
            <div className="head-buttons">
              <button type="button" onClick={handleModalOpen}>
                {global.translate(`Add a virtual card`)}
              </button>
            </div>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="search-area">
          <Input
            placeholder={global.translate('Search')}
            icon="search"
            iconPosition="left"
            disabled={!virtualCardList}
            onKeyUp={e => handleKeyUp(e)}
          />
        </div>
        <div className={classes.VirtualCardList}>
          {isLoading ? (
            <Wrapper>
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
            </Wrapper>
          ) : (
            <Item.Group divided link>
              {isEmpty ||
              (myVirtualCardList && !myVirtualCardList.length) ? (
                <p style={{ textAlign: 'center' }}>
                  {(virtualCardList &&
                    virtualCardList[0].Description) ||
                    global.translate(`No Item found`)}
                </p>
              ) : (
                myVirtualCardList &&
                myVirtualCardList.length !== 0 &&
                myVirtualCardList.map(item => (
                  <VirtualCard
                    key={item.CardNumber}
                    virtualCard={item}
                    isLoading={isLoading}
                    userData={userData?.data}
                    addMoneyOpen={addMoneyOpen}
                    setAddMoneyOpen={setAddMoneyOpen}
                    handleOnClick={() => {
                      handleOnClick(item, userData?.data);
                    }}
                  />
                ))
              )}
            </Item.Group>
          )}
        </div>
        <AddVirtualCardModal
          open={open}
          setOpen={setOpen}
          size={size}
          currencies={currencies}
          onOptionsChange={onOptionsChange}
          onAddVirtualCard={onAddVirtualCard}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          virtualCardTypes={virtualCardTypes}
          errors={errors}
          setErrors={setErrors}
          addVirtualCard={addVirtualCard}
        />
      </DashboardLayout>
    </>
  );
};

MyVirtualCards.propTypes = {
  virtualCardList: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func,
  onAddVirtualCard: PropTypes.func,
  setSelectedCard: PropTypes.func,
  setSelectedCurrency: PropTypes.func,
  selectedCurrency: PropTypes.string.isRequired,
  selectedCard: PropTypes.string.isRequired,
  virtualCardTypes: PropTypes.instanceOf(Array).isRequired,
  errors: PropTypes.instanceOf(Object),
  setErrors: PropTypes.func,
  addVirtualCard: PropTypes.func,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
  size: PropTypes.string.isRequired,
  setSize: PropTypes.func,
  setAddMoneyOpen: PropTypes.func,
  setRetriveMoneyOpen: PropTypes.func,
  addMoneyOpen: PropTypes.bool,
};

MyVirtualCards.defaultProps = {
  onOptionsChange: () => {},
  onAddVirtualCard: () => {},
  setSelectedCard: () => {},
  setSelectedCurrency: () => {},
  setErrors: () => {},
  addVirtualCard: () => {},
  errors: {},
  setOpen: () => {},
  setSize: () => {},
  setAddMoneyOpen: () => {},
  setRetriveMoneyOpen: () => {},
  addMoneyOpen: false,
};

export default MyVirtualCards;
