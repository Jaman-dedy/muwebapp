import React from 'react';
import classes from './ItemList.module.scss';
import Thumbnail from '../Thumbnail';

const ItemList = ({
  Logo,
  Title,
  Option,
  isThumbNail,
  name,
  secondName,
}) => (
  <div className={classes.Item}>
    <div className={classes.Provider}>
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
      <div className={classes.ItemTitle}>{Title}</div>
      {Option ? <div className={classes.Option}>{Option}</div> : ''}
    </div>

    <div className={classes.ItemCheck}>check</div>
  </div>
);

export default ItemList;
