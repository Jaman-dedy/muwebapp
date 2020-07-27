import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import classes from './CardList.module.scss';

const VirtualCarlListPlaceHolder = () => (
  <div className={classes.PlaceHolder}>
    <div className={classes.LeftSide}>
      <Placeholder style={{ height: 150, width: 150 }}>
        <Placeholder.Image />
      </Placeholder>
    </div>
    <div className={classes.RightSide}>
      <Placeholder fluid>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </div>
  </div>
);

export default VirtualCarlListPlaceHolder;
