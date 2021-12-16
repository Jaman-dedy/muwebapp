/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './style.scss';

const Ratings = ({ service, onRate }) => {
  const { data: user } = useSelector(state => state.user.userData);
  return (
    <div className="service-ratings">
      <span className="flex flex-row">
        <span>
          <div className="wrap-service-ratings">
            <div
              style={{
                width: `${(parseFloat(service.AverageRating, 10) *
                  100) /
                  5}%`,
              }}
            />
            {user && (
              <>
                <button
                  className="ratingBtn cursor-pointer"
                  type="button"
                  onClick={() => onRate('1')}
                />
                <button
                  className="ratingBtn cursor-pointer"
                  type="button"
                  onClick={() => onRate('2')}
                />
                <button
                  className="ratingBtn cursor-pointer"
                  type="button"
                  onClick={() => onRate('3')}
                />
                <button
                  className="ratingBtn cursor-pointer"
                  type="button"
                  onClick={() => onRate('4')}
                />
                <button
                  className="ratingBtn cursor-pointer"
                  type="button"
                  onClick={() => onRate('5')}
                />
              </>
            )}
          </div>
        </span>
        <div className="ratings-count">
          {service.RatingCount}{' '}
          {service.RatingCount === '1'
            ? global.translate('Review')
            : global.translate('Reviews')}
        </div>
      </span>
    </div>
  );
};

Ratings.propTypes = {
  onRate: PropTypes.func.isRequired,
  service: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ratings;
