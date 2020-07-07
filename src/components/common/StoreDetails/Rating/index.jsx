/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';

import './Rating.scss';

const RatingCom = ({ avarRating, rateStore }) => {
  return (
    <>
      <div className="wrap-ratings">
        <div
          style={{
            width: `${(parseInt(avarRating, 10) * 100) / 5}%`,
          }}
        />
        <button
          className="ratingBtn"
          onClick={() => rateStore(1)}
          type="button"
        />
        <button
          className="ratingBtn"
          onClick={() => rateStore(2)}
          type="button"
        />
        <button
          className="ratingBtn"
          onClick={() => rateStore(3)}
          type="button"
        />
        <button
          className="ratingBtn"
          onClick={() => rateStore(4)}
          type="button"
        />
        <button
          className="ratingBtn"
          onClick={() => rateStore(5)}
          type="button"
        />
      </div>
    </>
  );
};

RatingCom.propTypes = {
  avarRating: PropTypes.string,
  rateStore: PropTypes.func,
};

RatingCom.defaultProps = {
  avarRating: 0,
  rateStore: () => {},
};

export default RatingCom;
