import React from 'react';
import classes from './ItemList.module.scss';
import Thumbnail from '../Thumbnail';
import checkedMark from '../../../assets/images/checked.png';

const ItemList = ({
  Logo,
  Title,
  Option,
  isThumbNail,
  name,
  secondName,
  onOptionsChange,
  handleItemClicked,
  clickedItem,
  useCustomStyle,
  style,
  styeleTitle,
  // category,
}) => (
  <div
    className={classes.Item}
    onClick={() => handleItemClicked(Title)}
  >
    <div style={style} className={classes.Provider}>
      <div className={classes.ItemImage}>
        {isThumbNail ? (
          <Thumbnail
            avatar={Logo}
            name={name}
            secondName={secondName}
            style={{
              margin: 'auto',
              width: '2.6rem',
              height: '2.6rem',
            }}
          />
        ) : (
          <img src={Logo} alt="" />
        )}
      </div>
      <div style={styeleTitle} className={classes.ItemTitle}>
        {Title}
      </div>
      {Option ? <div className={classes.Option}>{Option}</div> : ''}
    </div>

    <div className={classes.ItemCheck}>
      {clickedItem === Title ? <img src={checkedMark} alt="" /> : ''}
    </div>
  </div>
);

export default ItemList;
