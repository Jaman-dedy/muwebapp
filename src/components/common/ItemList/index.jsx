import React from 'react';
import classes from './ItemList.module.scss';

const ItemList = () => (
    <div className={classes.Item}>
    <div className={classes.Provider}>
    <div className={classes.ItemImage}> </div>
    <div className={classes.ItemTitle}>MTN</div>
    </div>
    
    <div className={classes.ItemCheck}>check</div>
  </div>
)

export default ItemList