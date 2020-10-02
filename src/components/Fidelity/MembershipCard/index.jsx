/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import rookie from 'assets/images/rookie.png';
import explorer from 'assets/images/explorer.png';
import silver from 'assets/images/silver.png';
import bronze from 'assets/images/bronze.png';
import gold from 'assets/images/gold.png';
import platinum from 'assets/images/platinum.png';
import ambassador from 'assets/images/ambassador.png';
import Thumbnail from 'components/common/Thumbnail';
import formatNumber from 'utils/formatNumber';
import VerifiedIcon from 'assets/images/verified.png';

import './MembershipCard.scss';

const MembershipCard = ({ userData, ucardRef }) => {
  const [levelImage, setLevelImage] = useState();
  const [hasError, setHasError] = useState(false);

  const statusCode =
    userData &&
    userData.data &&
    userData.data?.Rewards &&
    userData.data?.Rewards.StatusCode;

  const statusName =
    userData &&
    userData.data &&
    userData.data?.Rewards &&
    userData.data?.Rewards.StatusText;

  useEffect(() => {
    if (statusCode === '0') {
      setLevelImage(rookie);
    } else if (statusCode === '1') {
      setLevelImage(explorer);
    } else if (statusCode === '2') {
      setLevelImage(silver);
    } else if (statusCode === '3') {
      setLevelImage(bronze);
    } else if (statusCode === '4') {
      setLevelImage(gold);
    } else if (statusCode === '5') {
      setLevelImage(platinum);
    } else if (statusCode === '6') {
      setLevelImage(ambassador);
    }
  }, []);

  return (
    <div className="MembershipCard">
      <div className="u-card darken-blue" ref={ucardRef}>
        <div className="u-card-front radius-2">
          <div className="flex flex-row justify-content-space-between u-card-front__row-one">
            <div className="u-card-front__column-one">
              <span className="u-card-front__column-one__thumbnail">
                <Thumbnail
                  avatar={
                    userData &&
                    userData.data &&
                    userData.data?.PictureURL
                  }
                  name={
                    userData &&
                    userData.data &&
                    userData.data?.FirstName
                  }
                  className="u-card-front__column-one__thumbnail__image"
                  secondName={
                    userData &&
                    userData.data &&
                    userData.data?.LastName
                  }
                  hasError={hasError}
                  setHasError={setHasError}
                />
                {userData &&
                  userData.data &&
                  userData.data?.AccountVerified === 'YES' && (
                    <Image
                      src={VerifiedIcon}
                      className="u-card-front__column-one__thumbnail__verified"
                    />
                  )}
              </span>
            </div>
            <div className="u-card-front__column-two flex flex-column">
              <div className="u-card-front__column-two__info flex flex-column">
                <span className="u-card-front__column-two__info__u-card-text">
                  2U Money
                </span>
                <span>
                  {' '}
                  {global.translate('Membership ID', 1623)}
                </span>
                <span>
                  {userData &&
                    userData.data &&
                    `${userData.data?.PID}`}
                </span>
                <span className="u-card-front__column-two__info__u-card-text">
                  {userData &&
                    userData.data &&
                    `${userData.data?.CountryName},
                    ${userData.data?.City}`}
                </span>

                <span className="u-card-front__column-two__info__u-card-text">
                  <div
                    className="u-card-front__column-two__info__u-card-text__pts"
                    style={{}}
                  >
                    {userData &&
                      userData.data &&
                      userData.data?.Rewards &&
                      userData.data?.Rewards.TotalPoints &&
                      `${formatNumber(
                        userData.data?.Rewards.TotalPoints
                          .PointsValue,
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        },
                      )} Pts`}
                  </div>
                </span>
              </div>
            </div>
            <div className="u-card-front__column-three flex flex-column justify-content-space-between">
              <span className="u-card-front__column-three__user-level-info flex flex-column center-align">
                <Image src={levelImage} />
                <span className="u-card-front__column-three__user-level-info__status-name">
                  {statusName}
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-content-space-between align-items-center u-card-front__row-two">
            <div className="flex flex-column u-card-front__row-two__user-info">
              <span className="">
                {userData?.data?.FirstName || ''}{' '}
                {userData?.data?.LastName || ''}
              </span>

              <span className="">
                {`+${userData?.data?.MainPhonePrefix || ''} ${userData
                  ?.data?.MainPhoneNumber || ''}`}
              </span>
            </div>
            <div className="flex flex-column">
              <span>
                <Image
                  className="u-card-front__row-two__card-QR"
                  src={
                    userData &&
                    userData.data &&
                    userData.data?.PIDQRCode
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MembershipCard.propTypes = {
  userData: PropTypes.instanceOf(Object).isRequired,
  ucardRef: PropTypes.instanceOf(Object),
};

MembershipCard.defaultProps = {
  ucardRef: {},
};

export default MembershipCard;
