/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './Publicity.scss';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import Loader from 'components/common/Loader';
import Message from 'components/common/Message';
import GoBack from 'components/common/GoBack';
import PublicityCard from './PublicityCard';
import AddPublicityModal from './AddPublicity';

const MyStores = ({
  userData,
  createCampaing,
  publicities,
  item,
}) => {
  const [open, setOpen] = useState(false);

  const { error, loading, data } = publicities;

  const history = useHistory();
  const onClickHandler = () => history.goBack();

  return (
    <>
      <DashboardLayout>
        <WelcomeBar loading={userData.loading}>
          <div className="head-content">
            <div className="go-back">
              <GoBack style onClickHandler={onClickHandler} />
            </div>
            <h2 className="head-title">
              <div>{global.translate('Manage campaigns', 1224)}</div>
            </h2>
            <div className="head-buttons">
              <button type="button" onClick={() => setOpen(true)}>
                {global.translate(`Create a campaign`, 127)}
              </button>
            </div>
          </div>
        </WelcomeBar>
        <div className="my-campaigns">
          <h3 className="title">
            {global.translate('Campaigns', 1224)}
            <span>
              {item.Name && (
                <span>{`${' '} ${global.translate(
                  'for',
                  427,
                )} ${' '}`}</span>
              )}
            </span>
            {item.Name && <span className="bold">{item.Name}</span>}
          </h3>

          <div className="my-campaigns-list">
            {loading && (
              <div className="publicity-state">
                <p>
                  <Loader
                    loaderContent={global.translate(
                      'Working...',
                      412,
                    )}
                  />
                </p>
              </div>
            )}
            {error && error[0] && !loading && (
              <div className="publicity-state">
                <Message
                  message={
                    error[0].Description
                      ? global.translate(error[0].Description)
                      : global.translate(error.error)
                  }
                />
              </div>
            )}
            {error && !error[0] && !loading && (
              <div className="publicity-state">
                <Message
                  message={global.translate(
                    error.error.error || error.error,
                  )}
                />
              </div>
            )}
            {!error && (
              <>
                {data && data[0] && data[0].Error === '2016' ? (
                  <div className="publicity-state">
                    <Message
                      message={global.translate(
                        'You don’t have any advertisement campaign yet.',
                        1434,
                      )}
                    />
                  </div>
                ) : (
                  <>
                    {data.map(publicity => (
                      <PublicityCard
                        publicity={publicity}
                        item={item}
                        onClick={() => {
                          history.push({
                            pathname: '/publicity-details',
                            state: {
                              publicityID: publicity.ID,
                              CampaignType: publicity.CampaignType,
                              ItemID: publicity.ItemID,
                              item,
                            },
                          });
                        }}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>

          <AddPublicityModal
            open={open}
            setOpen={setOpen}
            createCampaing={createCampaing}
          />
        </div>
      </DashboardLayout>
    </>
  );
};

MyStores.propTypes = {
  userData: PropTypes.instanceOf(Object),
  createCampaing: PropTypes.instanceOf(Object),
  publicities: PropTypes.instanceOf(Object),
  item: PropTypes.instanceOf(Object),
};

MyStores.defaultProps = {
  userData: {
    data: {},
  },
  createCampaing: {},
  publicities: {},
  item: {},
};

export default MyStores;
