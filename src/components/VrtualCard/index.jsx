/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Item, Input } from 'semantic-ui-react';

import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import GoBack from 'components/common/GoBack';
import EmptyCard from 'components/common/EmptyCard';
import EmptyCardList from 'assets/images/empty_card.svg';
import classes from './VirtualCards.module.scss';
import VirtualCard from './Item';
import PlaceHolder from './PlaceHolder';
import AddVirtualCardModal from './AddVirtualCardModal';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

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
  form,
  setForm,
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
            {!isAppDisplayedInWebView() && (
              <div className="go-back">
                <GoBack style onClickHandler={onClickHandler} />
              </div>
            )}
            <h2 className="head-title">
              {global.translate('O-Card')}
            </h2>
            <div className="head-buttons">
              <button type="button" onClick={handleModalOpen}>
                {global.translate(`Add an O-Card`)}
              </button>
            </div>
            <div className="clear" />
          </div>
        </WelcomeBar>
        <div className="search-area">
          {!isEmpty && (
            <Input
              placeholder={global.translate('Search')}
              icon="search"
              iconPosition="left"
              disabled={!virtualCardList}
              onKeyUp={e => handleKeyUp(e)}
            />
          )}
        </div>
        <>
          {isLoading ? (
            <div className={classes.VirtualCardList}>
              <PlaceHolder />
              <PlaceHolder />
              <PlaceHolder />
            </div>
          ) : (
            <>
              {isEmpty ||
              (myVirtualCardList && !myVirtualCardList.length) ? (
                <>
                  {(virtualCardList && (
                    <EmptyCard
                      header={global.translate(
                        "It looks like you don't have any O-Card yet",
                      )}
                      createText={global.translate(
                        'Create an O-Card',
                      )}
                      body={global.translate(
                        'You can create your O-Card and use them for your online payment',
                      )}
                      onAddClick={handleModalOpen}
                      imgSrc={EmptyCardList}
                    />
                  )) || (
                    <EmptyCard
                      header={global.translate('No card found')}
                      createText={global.translate(
                        'Create an O-Card',
                      )}
                      body={global.translate(
                        'You can create your O-Card and use them for your online payment',
                      )}
                      onAddClick={handleModalOpen}
                      imgSrc={EmptyCardList}
                    />
                  )}
                </>
              ) : (
                <div className={classes.VirtualCardList}>
                  <Item.Group divided link>
                    {myVirtualCardList &&
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
                      ))}
                  </Item.Group>
                </div>
              )}
            </>
          )}
        </>
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
          form={form}
          setForm={setForm}
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
  addMoneyOpen: PropTypes.bool,
  form: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
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
  addMoneyOpen: false,
};

export default MyVirtualCards;
