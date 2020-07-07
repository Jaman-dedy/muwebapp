/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Grid, Label, Icon, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import imagePlaceholder from 'assets/images/placeholder.jpg';
import ImgComp from 'components/common/Img';

import Img from './Img';
import './StoreDetailsCard.scss';

const StoreInfoTab = ({
  currentStore,
  likeStore,
  dislikeStore,
  rateStore,
  isDisabled,
}) => {
  const history = useHistory();
  const [likeIsDisables, setLikeIsDisabled] = useState(false);
  const [disLikeIsDisables, setDisLikeIsDisabled] = useState(false);
  const [ratingDisabled, setRatingDisabled] = useState(false);

  const [likes, setLikes] = useState(currentStore.Likes);
  const likeFun = () => {
    if (isDisabled === false) {
      likeStore();
      setLikes(parseInt(likes, 10) + 1);
      setLikeIsDisabled(true);
    }
  };

  const [disLikes, setDisLikes] = useState(currentStore.DisLikes);
  const disLikeFun = () => {
    if (isDisabled === false) {
      dislikeStore();
      setDisLikes(parseInt(disLikes, 10) + 1);
      setDisLikeIsDisabled(true);
    }
  };

  const [averageRate, setAvarageRate] = useState(
    currentStore.AverageRating,
  );

  const [reviews, setReviews] = useState(currentStore.RatingCount);
  const rateFun = x => {
    if (isDisabled === false) {
      setReviews(parseInt(reviews.replace(/,/g, ''), 10) + 1);
      setAvarageRate(x);
      rateStore(x.toString());
      setRatingDisabled(true);

      setTimeout(() => {
        setAvarageRate(currentStore.AverageRating);
      }, 1000);
    }
  };

  useEffect(() => {
    if (currentStore.data === null) {
      history.push('/transactions');
    }
  }, [currentStore]);
  return (
    <div className="StoreDetailsComp">
      <Segment>
        <Grid stackable columns={2}>
          <Grid.Column width={7}>
            <Label
              ribbon
              color={currentStore.Status === '2' ? 'red' : 'green'}
            >
              {currentStore.StatusText}
            </Label>

            <div className="imageContainer">
              <Img
                pic={currentStore.StoreBanner || 'N/A'}
                className="storeBanner"
                type="banner"
              />
            </div>

            <ImgComp
              className="store-logo"
              alt={
                <Image
                  src={imagePlaceholder}
                  className="store-logo"
                />
              }
              src={currentStore.StoreLogo}
              style={{ background: '#fff' }}
            />
          </Grid.Column>
          <Grid.Column width={9}>
            <div className="store-top-options">
              <div>
                <span className="store-inner-name">
                  {currentStore.StoreName}
                </span>
              </div>
            </div>
            <div
              className="description"
              style={{ whiteSpace: 'nowrap' }}
            >
              {currentStore.Description}
            </div>
            <div className="statss flex">
              <div className="like-dislike stat-item flex flex-row align-items-center">
                <span>
                  <button
                    type="button"
                    onClick={() => likeFun()}
                    className="blank-button"
                    disabled={likeIsDisables}
                    style={{ color: '#EA5726' }}
                  >
                    <Icon name="thumbs up" />
                  </button>
                </span>
                <div>
                  <span className="counts">{likes}</span>
                </div>
              </div>
              <div className="like-dislike stat-item flex flex-row align-items-center">
                <span>
                  <button
                    type="button"
                    onClick={() => disLikeFun()}
                    className="blank-button"
                    disabled={disLikeIsDisables}
                    style={{ color: '#EA5726' }}
                  >
                    <Icon name="thumbs down" />
                  </button>
                </span>
                <div>
                  <span className="counts">{disLikes}</span>
                </div>
              </div>

              <div className="stat-item flex flex-row align-items-center">
                <span
                  className="flex"
                  style={{
                    height: '30px',
                  }}
                >
                  <div className="wrap-ratings flex">
                    <div
                      style={{
                        width: `${(parseFloat(averageRate, 10) *
                          100) /
                          5}%`,
                      }}
                    />
                    <button
                      className="ratingBtn"
                      onClick={() => rateFun(1)}
                      type="button"
                      disabled={ratingDisabled}
                    />
                    <button
                      className="ratingBtn"
                      onClick={() => rateFun(2)}
                      type="button"
                      disabled={ratingDisabled}
                    />
                    <button
                      className="ratingBtn"
                      onClick={() => rateFun(3)}
                      type="button"
                      disabled={ratingDisabled}
                    />
                    <button
                      className="ratingBtn"
                      onClick={() => rateFun(4)}
                      type="button"
                      disabled={ratingDisabled}
                    />
                    <button
                      className="ratingBtn"
                      onClick={() => rateFun(5)}
                      type="button"
                      disabled={ratingDisabled}
                    />
                  </div>
                </span>
                <div className="reviews">
                  <span className="counts">
                    {reviews} {'  '}
                  </span>
                  <span>{global.translate('Reviews', 783)}</span>
                </div>
              </div>
            </div>

            <div className="category-line">
              <Icon name="th large" />
              {currentStore.CategoryText}
            </div>
            <div className="address-box">
              <Icon name="calendar alternate" />
              <span className="durations">
                {currentStore.OpenOnWEText === 'YES'
                  ? global.translate('Monday - Sunday', 785)
                  : global.translate('Monday - Friday', 786)}
              </span>
            </div>
            <div>
              <Icon name="clock" />
              <span className="duration">
                {currentStore.OpeningHour} -{' '}
                {currentStore.ClosingHour}
              </span>{' '}
              {global.translate('Hours', 787)}
            </div>
            <div className="address-box">
              <Icon name="map marker" />
              <span className="address">
                {currentStore.Address} {currentStore.City}{' '}
                {currentStore.Country}
              </span>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

StoreInfoTab.propTypes = {
  currentStore: PropTypes.objectOf(PropTypes.any),
  likeStore: PropTypes.func,
  dislikeStore: PropTypes.func,
  rateStore: PropTypes.func,
  isDisabled: PropTypes.bool,
};

StoreInfoTab.defaultProps = {
  currentStore: {},
  likeStore: () => {},
  dislikeStore: () => {},
  rateStore: () => {},
  isDisabled: false,
};

export default StoreInfoTab;
