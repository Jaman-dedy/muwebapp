import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const CategoryItem = ({ src, text, count, onClick }) => {
  return (
    <div className="categoryItem" onClick={onClick} key={src}>
      <Image src={src} className="icon-left" />{' '}
      <span className="text">{global.translate(text)}</span> &nbsp;
      <small>({count})</small>
    </div>
  );
};

CategoryItem.propTypes = {
  src: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryItem;
