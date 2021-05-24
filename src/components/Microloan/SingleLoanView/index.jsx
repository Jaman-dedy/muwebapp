/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import useWindowSize from 'utils/useWindowSize';
import requestLoanImg from 'assets/images/microloan/request-loan.svg';
import rightArrow from 'assets/images/microloan/right-arrow.svg';
import calendarImg from 'assets/images/microloan/calendar.svg';
import loanPaidImg from 'assets/images/microloan/paid-loan.svg';
import './style.scss';

const SingleLoanView = ({ loan, onClick, detail }) => {
  const { width } = useWindowSize();

  return (
    <div
      className="single-loan-box"
      onClick={() => {
        if (!detail) {
          onClick(loan);
        }
      }}
      style={
        detail && {
          border: 'none',
          cursor: 'auto',
          backgroundColor: '#fff',
          padding: '0',
        }
      }
    >
      {width > 570 && (
        <div className="request-img">
          <Image src={requestLoanImg} />
        </div>
      )}

      <div className="request-text">
        <div className="request-wallet">
          <div>{loan?.WalletNumber}</div>
        </div>
        <div className="request-amount">
          {loan?.Currency}{' '}
          <strong>
            {loan?.ActiveLoan === 'YES'
              ? loan?.CapitalBalance
              : loan?.Capital}
          </strong>{' '}
        </div>
        <div className="loan-date">
          <Image
            src={
              loan?.ActiveLoan === 'YES' ? calendarImg : loanPaidImg
            }
          />
          <div
            style={
              loan?.ActiveLoan === 'NO' ? { color: '#2CB666' } : null
            }
          >
            {loan?.NextDueDate
              ? `${global.translate(
                  'Next payment due date :',
                  2547,
                )} ${loan.NextDueDate} `
              : `${global.translate('Closed on :', 2446)} ${
                  loan?.ClosedDate
                }`}
          </div>
        </div>
      </div>
      <div
        className="loan-status"
        style={
          loan?.ActiveLoan === 'YES'
            ? { color: '#D73737' }
            : { color: '#2CB666' }
        }
      >
        {loan?.ActiveLoan === 'YES'
          ? global.translate('Active loan', 2484)
          : global.translate('Paid', 2546)}
        {!detail && <Image src={rightArrow} />}
      </div>
    </div>
  );
};
SingleLoanView.propTypes = {
  loan: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
  detail: PropTypes.bool,
};

SingleLoanView.defaultProps = {
  loan: {},
  onClick: () => {},
  detail: undefined,
};

export default SingleLoanView;
