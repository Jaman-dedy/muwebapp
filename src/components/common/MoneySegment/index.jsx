/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ClosedEye from 'assets/images/closedeye.svg';
import Eye from 'assets/images/eye.svg';
import './style.scss';
import formatNumber from 'utils/formatNumber';

const MoneySegment = ({ data }) => {
  const [isShown, setIsShown] = React.useState(true);
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  return (
    <div className="itemsWrapper">
      <div className="items">
        <Image
          src={data && data.Flag}
          height={37}
          className="image"
        />
        <span className="currency">{data && data.Currency}:</span>
        <span className="money">
          {isShown
            ? data &&
              data.Balance &&
              formatNumber(data.Balance, {
                locales: preferred,
              })
            : Array(4)
                .fill(4)
                .map((val, index) => (
                  <Icon
                    key={index}
                    name="circle"
                    className="text-white"
                  />
                ))}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setIsShown(!isShown)}
        className="transparent no-border btn__eye no-outline medium-h-padding cursor-pointer small-text"
      >
        <Image src={isShown ? Eye : ClosedEye} height={24} />
      </button>
    </div>
  );
};
MoneySegment.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};
MoneySegment.defaultProps = {
  data: {},
};
export default MoneySegment;
