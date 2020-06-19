import React from 'react';
import {
  Grid,
  Label,
  Icon,
  Image,
  Responsive,
  Rating,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import imagePlaceholder from 'assets/images/placeholder.jpg';
import ImgComp from 'components/common/Img';
import Img from '../Img';
import './StoreDetailsComponent.scss';

const StoreInfoTab = ({ currentStore }) => {
  return (
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
              circular
            />
          }
          circular
          src={currentStore.StoreLogo}
        />
      </Grid.Column>
      <Grid.Column width={9}>
        <div className="store-top-options">
          <div>
            <span className="store-inner-name">
              {currentStore.StoreName}
            </span>
            <Responsive
              as={Image}
              minWidth={768}
              className="store-country-image"
              width={30}
              style={{
                display: 'inline',
                marginTop: -8,
              }}
              src={currentStore.Flag}
            />
          </div>
        </div>
        <div className="statss flex justify-content-space-between">
          <div className="likes">
            <span className="counts">{currentStore.Likes}</span>
            <span>{global.translate('Likes')}</span>
          </div>
          <div className="likes">
            <span className="counts">{currentStore.DisLikes}</span>
            <span>{global.translate('Dislikes')}</span>
          </div>
          <div className="likes">
            <span className="counts">{currentStore.Reviews}</span>
            <span>{global.translate('Reviews', 783)}</span>
          </div>
          <div
            className="likes"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div>
              <span className="counts">
                {currentStore.AverageRating}
              </span>
              <span> {global.translate('Av.Rating')}</span>
            </div>
            <div className="stars">
              <Rating
                icon="star"
                defaultRating={currentStore.AverageRating}
                maxRating={5}
                style={{ display: 'inline' }}
              />
            </div>
          </div>
        </div>

        <div className="category">{currentStore.CategoryText}</div>
        <div className="open-hrs">
          <span className="durations">
            {currentStore.OpenOnWEText === 'YES'
              ? global.translate('Monday - Sunday', 785)
              : global.translate('Monday - Friday', 786)}
          </span>

          <span className="duration">
            {currentStore.OpeningHour} - {currentStore.ClosingHour}
          </span>
          {global.translate('Hours', 787)}
        </div>
        <div className="address-box">
          <Icon name="map marker" />
          <span className="address">
            {currentStore.Address} {currentStore.City}
            {currentStore.Country}
          </span>
        </div>

        <p className="description">{currentStore.Description}</p>
        {/*  <p className="description">{currentStore.ShortDesc}</p> */}
      </Grid.Column>
    </Grid>
  );
};

StoreInfoTab.propTypes = {
  currentStore: PropTypes.objectOf(PropTypes.any),
};

StoreInfoTab.defaultProps = {
  currentStore: {},
};

export default StoreInfoTab;
