import React, { useState } from 'react';
import '../TransactionEntity/TransactionEntity.scss';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';

function TransactionEntity({ data, isSendingCash }) {
  const [hasError, setHasError] = useState(false);
  return (
    <div
      className="entity-wrapper"
      style={
        isSendingCash
          ? {
              display: 'flex',
              margin: 'auto',
              flexDirection: 'column',
              alignItems: 'center',
            }
          : {}
      }
    >
      {data && data.data && (
        <Thumbnail
          name={data.data.FirstName}
          avatar={data.data.PictureURL}
          secondName={data.data.LastName}
          height={75}
          style={{
            height: 75,
            width: 75,
            marginLeft: isSendingCash ? '24px' : '0px',
            alignSelf: isSendingCash ? 'center' : 'flex-end',
          }}
          hasError={hasError}
          setHasError={setHasError}
        />
      )}
      <div className="rightItems">
        <div>{`${data.data.FirstName} ${data.data.LastName}`}</div>
        <div>
          {data.data.type === 'notEditable' && (
            <div>
              {data.data.PhoneNumber && `+${data.data.PhoneNumber}`}
            </div>
          )}

          {data.data.type !== 'notEditable' && (
            <div>
              {data.data.countryDetails &&
                data.data.countryDetails.value +
                  data.data.PhoneNumber}
            </div>
          )}

          {data.data.ContactPID && <div> {data.data.ContactPID}</div>}
        </div>
      </div>
    </div>
  );
}

TransactionEntity.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isSendingCash: PropTypes.bool,
};

TransactionEntity.defaultProps = {
  isSendingCash: false,
  data: {},
};
export default TransactionEntity;
