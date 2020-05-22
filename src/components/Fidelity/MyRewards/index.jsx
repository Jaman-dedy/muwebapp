import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Grid } from 'semantic-ui-react';

import LevelsGraph from 'containers/Fidelity/LevelsGraph';
import check from 'assets/images/check.png';
import NotifImage from 'assets/images/notif-type-transaction.png';
import Referals from 'assets/images/referalsIcon.png';
import LevelImage from './LevelsImage';

// import Loader from 'components/common/Loader';

import './MyRewards.scss';

const MyRewards = ({ userData }) => {
  return (
    <div className="myrewards-container">
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="levelsContaner">
              <LevelImage level="rookie" />
              <span className="pointsTxt">+50pts</span>
              <LevelImage
                level="explorer"
                isCurrent="currentStatus"
              />
              <span className="pointsTxt">+50pts</span>
              <LevelImage level="silver" />
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="congratsBox">
              <div className="congsTxt">
                <div>
                  <Image src={check} className="congsCheck" />
                </div>
                <div className="congDesc">
                  <span className="congrats cong-title">
                    Congratulations
                  </span>
                  <span className="congrats">
                    You've reached the{' '}
                  </span>
                  <span>
                    <Button
                      className="levelName"
                      content="Explorer level"
                    />
                  </span>
                </div>
              </div>
              <div className="btnsContainer">
                <div className="congsBtns">
                  <Button
                    className="levelBtns bigBtn"
                    content="View my membership card"
                  />
                  <Button
                    className="levelBtns smallBtn"
                    content="Learn more"
                  />
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="GetPointsGuide">
              <div>
                <div className="guideItems">
                  <div className="guideItem">
                    <span className="guideIconContainer">
                      <Image className="guideIcon" src={Referals} />
                    </span>

                    <span>Get 75 free points for every referral</span>
                  </div>
                  <div className="guideItem">
                    <span className="guideIconContainer">
                      <Image className="guideIcon" src={NotifImage} />
                    </span>
                    <span>
                      Every 100 transactions give you 125 points
                    </span>
                  </div>
                  <div className="guideItem">
                    <span className="guideIconContainer">
                      <Image className="guideIcon" src={NotifImage} />
                    </span>
                    <span>
                      Get 2 points for every 100usd transfered
                    </span>
                  </div>
                </div>
              </div>
              <div className="btnsContainer">
                <Button
                  className="levelBtns smallBtn moreGuideBtn"
                  content="Learn more"
                />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="levelChart">
              <LevelsGraph />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

MyRewards.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
};

MyRewards.defaultProps = {};

export default MyRewards;
