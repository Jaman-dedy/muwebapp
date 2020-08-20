import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EmpyStore from 'assets/images/EmpyStoreIcon.svg';
import './EmptyCard.scss';

const EmptyCard = ({
  header,
  createText,
  body,
  onAddClick,
  disableAdd,
}) => {
  return (
    <div className="empty-store">
      <Image src={EmpyStore} />
      <h2>{header}</h2>
      <div>{body}</div>
      {!disableAdd && (
        <button type="button" onClick={onAddClick}>
          {createText}
        </button>
      )}
    </div>
  );
};

export default EmptyCard;

EmptyCard.propTypes = {
  body: PropTypes.string.isRequired,
  onAddClick: PropTypes.func.isRequired,
  disableAdd: PropTypes.bool,
};

EmptyCard.defaultProps = {
  disableAdd: false,
};
