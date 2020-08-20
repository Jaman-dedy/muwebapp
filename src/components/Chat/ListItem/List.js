/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import './ListItem.scss';

const AppListItem = ({
  onItemClick,
  itemTitle,
  topRightText,
  imageURL,
  itemDescription,
  bottomRightContext,
  secondaryContent,
  darkStyle,
  noHorizontalRule,
}) => {
  const [hasError, setHasError] = useState(false);
  return (
    <>
      <div
        className="item-wrapper"
        key={imageURL}
        onClick={onItemClick}
      >
        <Thumbnail
          circular
          avatar={imageURL}
          name={itemTitle?.split(' ')[0]}
          secondName={itemTitle?.split(' ')[1]}
          style={{ marginRight: '0px', height: 43, width: 43 }}
          hasError={hasError}
          setHasError={setHasError}
        />
        <div className={`name-message ${darkStyle && ' dark-color'}`}>
          <div className="name-time-top">
            <p className={`name ${darkStyle && ' dark-color'}`}>
              {itemTitle}
            </p>
            {secondaryContent}
            <p className={`time ${darkStyle && ' dark-color'}`}>
              {topRightText}
            </p>
          </div>
          <div className="message">
            <small
              className={`message ${darkStyle && ' dark-color'}`}
            >
              {itemDescription}{' '}
            </small>
            {bottomRightContext}
          </div>
        </div>
      </div>
      {!noHorizontalRule && <hr />}
    </>
  );
};

AppListItem.propTypes = {
  itemDescription: PropTypes.string,
  bottomRightContext: PropTypes.node,
  onItemClick: PropTypes.func.isRequired,
  secondaryContent: PropTypes.node,
  itemTitle: PropTypes.string,
  topRightText: PropTypes.string,
  imageURL: PropTypes.string,
  noHorizontalRule: PropTypes.bool,
  darkStyle: PropTypes.bool,
};

AppListItem.defaultProps = {
  itemDescription: null,
  noHorizontalRule: false,
  bottomRightContext: <></>,
  secondaryContent: <></>,
  itemTitle: null,
  topRightText: null,
  imageURL: null,
  darkStyle: false,
};
export default AppListItem;
