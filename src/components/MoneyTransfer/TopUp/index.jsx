import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Tab, Step } from 'semantic-ui-react';
import DashboardLayout from '../../common/DashboardLayout';
import WelcomeBar from '../../Dashboard/WelcomeSection';
import Wrapper from '../../../hoc/Wrapper';
import RecentlyContactedItems from '../../contacts/RecentlyContactedItems';
import Steps from '../../common/SementiComponents/Steps';
import VerticalTab from '../../common/SementiComponents/VerticalTab';
import ItemList from '../../common/ItemList';
import StepButton from '../../common/SementiComponents/StepButtons/2StepButtons';
import StepButtons from '../../common/SementiComponents/StepButtons/3StepButtons';
import CreateExternalContact from '../../common/MoneyTransfer/FormExternalContact';
import DropdownCountries from '../../common/Dropdown/CountryDropdown';
import PREVIOUS_ICON from '../../../assets/images/back.png';
import classes from './TopUp.module.scss';
import './material-ui.scss';
import Thumbnail from 'components/common/Thumbnail';
import SearchInput from 'components/common/SementiComponents/searchInput';

const TopUp = ({
  currentCountryOption,
  onOptionsChange,
  history,
  submitFormHandler,
  resetFormHandler,
  providersList,
  myPhoneNumbers,
  externalContactList,
  handleItemClicked,
  countryOptions,
  isItemClicked,
  clickedItem,
  handleKeyUp,
}) => {
  const [active, setActive] = useState('');
  const panes = [
    {
      menuItem: 'Self topup',
      render: () => (
        <Tab.Pane>
          <Wrapper>
            {myPhoneNumbers.map(myNumber => (
              <ItemList
                Logo={myNumber.PhoneFlag}
                Title={`+${myNumber.PhonePrefix} ${myNumber.PhoneNumber}`}
                Option={myNumber.Category}
              />
            ))}
          </Wrapper>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Contact topup',
      render: () => (
        <Tab.Pane>
          <Wrapper>
            <SearchInput
              style={{
                marginTop: '0rem',
                width: '24.3rem',
              }}
              handleKeyUp={handleKeyUp}
            />
            <div style={{ marginTop: '4rem' }}>
              {externalContactList.map(contact => (
                <ItemList
                  Title={`${contact.FirstName} ${contact.LastName}`}
                  isThumbNail={true}
                  name={contact.FirstName}
                  secondName={contact.LastName}
                />
              ))}
            </div>
          </Wrapper>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'New contact topup',
      render: () => (
        <Tab.Pane>
          <CreateExternalContact />
        </Tab.Pane>
      ),
    },
  ];
  const { userData } = useSelector(state => state.user);
  return (
    <DashboardLayout>
      <WelcomeBar loading={userData && userData.loading}>
        <span className="lighter">
          {global.translate('Top up your phone', 1195)}
        </span>
      </WelcomeBar>
      <div className="inner-area1">
        <div className="heading-text">
          <Image
            src={PREVIOUS_ICON}
            height={30}
            className="goBack"
            onClick={() => history.goBack()}
          />
          <div className="rightText">
            <p className="sub-title">
              {global.translate(
                'Most recent people you have transacted with',
                1194,
              )}
            </p>
          </div>
        </div>
        <RecentlyContactedItems
          items={{ data: [], loading: true, error: false }}
          onItemClick={item => {}}
          retryFetch={() => {}}
        />
      </div>
      <div className={classes.Steps}>
        <Steps
          steps={
            <Wrapper>
              <Step
                active={active === 'Country'}
                completed={
                  providersList.data !== null &&
                  !providersList.loading
                }
                icon="flag"
                link
                onClick={(e, { title }) => setActive(title)}
                title="Country"
                description="Select the destination country"
              />
              <Step
                active={active === 'Provider'}
                icon="wifi"
                link
                onClick={(e, { title }) => setActive(title)}
                title="Provider"
                description="Select your providers option"
              />
              <Step
                active={active === 'Recipient'}
                icon="user"
                link
                onClick={(e, { title }) => setActive(title)}
                title="Recipient"
                description="Provide your recipient's information"
              />
            </Wrapper>
          }
        />
      </div>
      {active === 'Recipient' ? (
        <div className={classes.Wrapper}>
          <div className={classes.Actions}>
            <VerticalTab panes={panes} />
          </div>
          <div className={classes.Action}>
            <StepButtons style={{ marginLeft: '43.6rem' }} />
          </div>
        </div>
      ) : active === 'Provider' ? (
        <div className={classes.Wrapper}>
          <h4 className={classes.ProviderTitle}>
            Providers in Rwanda
          </h4>
          <div className={classes.Providers}>
            <SearchInput
              style={{
                position: 'absolute',
                marginTop: '-4rem',
                width: '24.3rem',
                marginLeft: '.9rem',
              }}
            />
            <div className={classes.ListProviders}>
              {providersList.data &&
                providersList.data.map(provider => (
                  <ItemList
                    Logo={provider.Logo}
                    Title={provider.OperatorName}
                    onOptionsChange={onOptionsChange}
                    handleItemClicked={handleItemClicked}
                    isItemClicked={isItemClicked}
                    clickedItem={clickedItem}
                    // onClickHandler={handleOnClickItem}
                  />
                ))}
            </div>
          </div>
          <StepButtons
            style={{ marginLeft: '9.4rem', marginTop: '-.6rem' }}
          />
        </div>
      ) : (
        <div className={classes.Wrapper}>
          <div className={classes.Country}>
            <h4 className={classes.CountryTitle}>
              Select the destination country
            </h4>
            <div className={classes.Countries}>
              <DropdownCountries
                options={countryOptions}
                currentOption={currentCountryOption}
                onChange={e => {
                  onOptionsChange(e, {
                    name: 'CountryCode',
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className={classes.Action}>
            <StepButton
              style={{ marginLeft: '16rem', marginTop: '.2rem' }}
              submitFormHandler={submitFormHandler}
              resetFormHandler={resetFormHandler}
              isLoading={providersList.loading}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

TopUp.propTypes = {};

TopUp.defaultProps = {};

export default TopUp;
