import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import LoanPlaceholder from 'assets/images/microloan/single-loan-placeholder.svg';
import SingleLoanView from '../SingleLoanView';
import './style.scss';

const ListLoan = ({ listData, setOpenModal, loading }) => {
  const history = useHistory();
  const handleOnclick = loan => {
    history.push({
      pathname: '/loan-details',
      state: { item: loan },
    });
  };
  return (
    <div className="loan-list-container">
      <div className="info-part">
        <div className="request-part">
          <h3>{global.translate('Instant loans', 2544)}</h3>
          <div>
            {global.translate(
              'Request microloans on the go and get your money directly into your wallet in just seconds',
              2545,
            )}
          </div>
        </div>

        <Button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Icon name="plus" />{' '}
          {global.translate('Request a loan', 2482)}
        </Button>
      </div>
      {listData?.Data?.map(loan => (
        <>
          <SingleLoanView loan={loan} onClick={handleOnclick} />
        </>
      ))}
      {loading && (
        <>
          {' '}
          <div className="loan-placeholder">
            <Image
              className="animate-placeholder"
              src={LoanPlaceholder}
            />
          </div>
          <div className="loan-placeholder">
            <Image
              className="animate-placeholder"
              src={LoanPlaceholder}
            />
          </div>
          <div className="loan-placeholder">
            <Image
              className="animate-placeholder"
              src={LoanPlaceholder}
            />
          </div>
        </>
      )}
    </div>
  );
};
ListLoan.propTypes = {
  listData: PropTypes.objectOf(PropTypes.any),
  setOpenModal: PropTypes.func,
  loading: PropTypes.bool,
};
ListLoan.defaultProps = {
  listData: {},
  setOpenModal: () => {},
  loading: false,
};

export default ListLoan;
