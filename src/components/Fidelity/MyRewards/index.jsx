/* eslint-disable import/order */
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, Button, Grid, Modal, Icon } from 'semantic-ui-react';
import ReactToPrint from 'react-to-print';
import LevelsGraph from 'containers/Fidelity/LevelsGraph';
import NotifImage from 'assets/images/notif-type-transaction.png';
import Referals from 'assets/images/referalsIcon.png';
import MembershipCard from 'components/Fidelity/MembershipCard';
import formatNumber from 'utils/formatNumber';
import LevelImage from './LevelsImage';
import './MyRewards.scss';
import LoadRewards from 'assets/images/fidelity/loadFidelity.svg';

const MyRewards = ({ userData }) => {
  const [openModal, setOpenModal] = useState(false);
  const ucardRef = useRef(null);
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );

  const printUCard = () => {};

  const { data, loading } = userData;

  return (
    <div className="myrewards-container">
      {loading && (
        <Image src={LoadRewards} className="animate-placeholder" />
      )}

      {data && (
        <>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <div className="levelsContaner">
                  {data.Rewards &&
                    data.Rewards.StatusText &&
                    data.Rewards.StatusCode === '6' && (
                      <LevelImage
                        level={global.translate('Gold', 1182)}
                        statusCode="4"
                      />
                    )}

                  {data.Rewards && data.Rewards.PreviousLevel && (
                    <LevelImage
                      level={data.Rewards.PreviousLevel.LevelValue}
                      statusCode={data.Rewards.PreviousStatusCode}
                    />
                  )}

                  {data?.Rewards && data?.Rewards?.StatusText && (
                    <div className="point-container">
                      <span className="points">
                        {data?.Rewards?.LevelPoints &&
                          data?.Rewards?.StatusCode !== '0' &&
                          `${
                            data?.Rewards?.LevelPoints[
                              `PointsValue${data?.Rewards?.StatusCode}`
                            ]
                          } pts`}
                      </span>
                      <LevelImage
                        level={data?.Rewards?.StatusText}
                        isCurrent="currentStatus"
                        statusCode={data?.Rewards?.StatusCode}
                        currentPoints={
                          data?.Rewards?.TotalPoints?.PointsValue
                        }
                      />

                      <span className="points">
                        {data?.Rewards?.LevelPoints &&
                          data?.Rewards?.StatusCode !== '6' &&
                          `${data?.Rewards?.NextLevel?.PointsValue} pts`}
                      </span>
                    </div>
                  )}

                  {data.Rewards && data?.Rewards?.NextLevel && (
                    <div className="point-container">
                      <LevelImage
                        level={data?.Rewards?.NextLevel?.LevelValue}
                        statusCode={data?.Rewards?.NextStatusCode}
                      />
                      <span className="points">
                        {data.Rewards.LevelPoints &&
                          data.Rewards.StatusCode === '0' &&
                          `${data?.Rewards?.LevelPoints?.PointsValue2} pts`}
                      </span>
                    </div>
                  )}

                  {data.Rewards &&
                    data.Rewards.StatusText &&
                    data.Rewards.StatusCode === '0' && (
                      <LevelImage
                        level={global.translate('Silver', 1182)}
                        statusCode="2"
                      />
                    )}
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <div className="congratsBox">
                  <div className="congsTxt">
                    <div className="congDesc">
                      <span className="congrats cong-title">
                        {global.translate('Congratulations', 950)},{' '}
                        {global.translate(
                          'Your current level is',
                          1441,
                        )}
                      </span>
                    </div>
                    {data.Rewards && data.Rewards.StatusText && (
                      <span className="levelName">
                        {data.Rewards.StatusText}
                      </span>
                    )}
                  </div>
                  <div className="congratsPoints">
                    {data?.Rewards && data.Rewards.YearPoints && (
                      <span className="congratsPointsItem">
                        <span>
                          {global.translate(
                            'Points earned this year',
                            1190,
                          )}
                        </span>
                        <span className="yearpoints">
                          {formatNumber(
                            data.Rewards.YearPoints.PointsValue,
                            {
                              locales: preferred,
                              minimumFractionDigits: 0,
                            },
                          )}
                        </span>
                      </span>
                    )}

                    {data.Rewards && data.Rewards.InCount && (
                      <span className="congratsPointsItem">
                        <span>
                          {global.translate(
                            'Inbound transactions count',
                            1187,
                          )}
                        </span>
                        <span className="inbound">
                          {formatNumber(
                            data.Rewards.InCount.CountValue,
                            {
                              locales: preferred,
                              minimumFractionDigits: 0,
                            },
                          )}
                        </span>
                      </span>
                    )}

                    {data.Rewards && data.Rewards.OutCount && (
                      <span className="congratsPointsItem">
                        <span>
                          {global.translate(
                            'Outbound transactions count',
                            1188,
                          )}
                        </span>
                        <span className="outbound">
                          {formatNumber(
                            data.Rewards.OutCount.CountValue,
                            {
                              locales: preferred,
                              minimumFractionDigits: 0,
                            },
                          )}
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="btnsContainer">
                    <div className="congsBtns">
                      <Button
                        className="levelBtns bigBtn"
                        content={global.translate(
                          'View my membership card',
                          1619,
                        )}
                        onClick={() => setOpenModal(true)}
                      />
                      <a
                        className="levelBtns smallBtn levelBtnsLink"
                        rel="noopener noreferrer"
                        target="_blank"
                        href={
                          data.Rewards && data.Rewards.LearnMoreURL
                        }
                      >
                        {global.translate('Learn more', 1620)}
                      </a>
                    </div>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <div className="GetPointsGuideTitle">
                  {global.translate('How to get points?', 1439)}
                </div>
                <div className="GetPointsGuide">
                  <div>
                    <div className="guideItems">
                      <div className="guideItem">
                        <span className="guideIconContainer">
                          <Image
                            className="guideIcon"
                            src={Referals}
                          />
                        </span>

                        {data.Rewards && data.Rewards.ReferralPoints && (
                          <span>
                            {global.translate(
                              'Earn these points for every person you refer to us.',
                              1422,
                            )}

                            <span
                              style={{
                                fontWeight: 600,
                                marginLeft: '5px',
                              }}
                            >
                              {
                                data.Rewards.ReferralPoints
                                  .PointsValue
                              }
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="guideItem">
                        <span className="guideIconContainer">
                          <Image
                            className="guideIcon"
                            src={NotifImage}
                          />
                        </span>
                        {data.Rewards && data.Rewards.ReferralPoints && (
                          <span>
                            {global.translate(
                              'Number of transactions required for change of level',
                              1423,
                            )}

                            <span
                              style={{
                                fontWeight: 600,
                                marginLeft: '5px',
                              }}
                            >
                              {
                                data.Rewards.RewardStatusChangeCount
                                  .PointsValue
                              }
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="guideItem">
                        <span className="guideIconContainer">
                          <Image
                            className="guideIcon"
                            src={NotifImage}
                          />
                        </span>
                        {data?.Rewards &&
                          data?.Rewards?.PointsPerAmount && (
                            <span>
                              {
                                data?.Rewards?.PointsPerAmount
                                  ?.PointsText1
                              }

                              <span
                                style={{
                                  fontWeight: 600,
                                  marginLeft: '5px',
                                }}
                              >
                                {
                                  data?.Rewards?.PointsPerAmount
                                    ?.PointsValue
                                }{' '}
                                points{' '}
                              </span>
                              {
                                data?.Rewards?.PointsPerAmount
                                  ?.PointsText2
                              }
                              <span
                                style={{
                                  fontWeight: 600,
                                  marginLeft: '5px',
                                }}
                              >
                                {
                                  data?.Rewards?.PointsPerAmount
                                    ?.AmountValue
                                }{' '}
                                {
                                  data?.Rewards?.PointsPerAmount
                                    ?.AmountCurrency
                                }
                              </span>
                              <span
                                style={{
                                  fontWeight: 300,
                                  marginLeft: '5px',
                                }}
                              >
                                {
                                  data?.Rewards?.PointsPerAmount
                                    .PointsText13
                                }
                              </span>
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="btnsContainer">
                    <Button
                      className="levelBtns smallBtn moreGuideBtn"
                      content="Learn more"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={
                        userData &&
                        data &&
                        data.Rewards &&
                        data.Rewards.LearnMoreURL
                      }
                    />
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <div className="levelChart">
                  <LevelsGraph
                    userData={
                      data.Rewards ? data.Rewards.LevelPoints : []
                    }
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Modal open={openModal} size="tiny" basic>
            <Modal.Content>
              <MembershipCard
                userData={userData}
                ucardRef={ucardRef}
              />
              <div className="medium-v-padding">
                <ReactToPrint
                  documentTitle={`2U Money - ${userData.data.FirstName} ${userData.data.LastName} - Membership Card`}
                  trigger={() => (
                    <Button
                      onClick={() => printUCard()}
                      style={{
                        backgroundColor: '#ea5726',
                        color: '#fff',
                      }}
                    >
                      <Icon name="print" />{' '}
                      {global.translate('Print', 1463)}
                    </Button>
                  )}
                  content={() => ucardRef.current}
                />

                <Button
                  basic
                  color="red"
                  onClick={() => setOpenModal(false)}
                >
                  {' '}
                  {global.translate('Close', 186)}
                </Button>
              </div>
            </Modal.Content>
            <Modal.Actions style={{ borderTop: 'none' }} />
          </Modal>
        </>
      )}
    </div>
  );
};

MyRewards.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
};

MyRewards.defaultProps = {};

export default MyRewards;
