import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const EmptyCard = ({
  header,
  createText,
  body,
  onAddClick,
  disableAdd,
  imgSrc,
}) => {
  return (
    <div className="empty-store">
      <Image src={imgSrc} />
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
  header: PropTypes.string.isRequired,
  createText: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

EmptyCard.defaultProps = {
  disableAdd: false,
};
