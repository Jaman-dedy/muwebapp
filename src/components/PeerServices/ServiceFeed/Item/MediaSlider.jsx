/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './slider.scss';
import Player from 'react-player';
import PeerImage from 'components/PeerServices/Image';

const MediaSlider = React.memo(
  ({ handleImageClicked, allMedia }) => {
    const settings = {
      infinite: false,
      speed: 1000,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="image-slider">
        <Slider {...settings}>
          {allMedia.map(item => {
            if (item.MediaType === '3' || item.Extension === 'MP4') {
              return (
                <Player
                  key={item.MediaURL}
                  controls
                  width="100%"
                  stopOnUnmount
                  className="video-player"
                  url={[item.MediaURL]}
                />
              );
            }
            if (item.MediaType !== '3') {
              return (
                <PeerImage
                  compress
                  onClick={() => handleImageClicked(item.MediaURL)}
                  fluid
                  style={{ borderRadius: 3 }}
                  notRounded
                  noPlaceholder
                  width={700}
                  className="single-image"
                  src={item.MediaURL}
                  key={item.MediaURL}
                />
              );
            }
          })}
        </Slider>
      </div>
    );
  },
  (prev, next) => {
    if (prev.allMedia.length !== next.allMedia.length) {
      return true;
    }
    return false;
  },
);
MediaSlider.propTypes = {
  handleImageClicked: PropTypes.func.isRequired,
  allMedia: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default MediaSlider;
