import React from 'react';
import { Image } from 'semantic-ui-react';

import { useHistory } from 'react-router-dom';
import EmpyStore from 'assets/images/EmpyStoreIcon.svg';
import './EmptyCard.scss';

const EmptyCard = () => {
  const history = useHistory();

  return (
    <div className="empty-store">
      <Image src={EmpyStore} />
      <h2>Looks like you do not have a store yet.</h2>
      <div>
        You can create your own store and offer any service your want
        across our platforms
      </div>
      <button
        type="button"
        onClick={() => history.push('/add-store')}
      >
        Create store
      </button>
    </div>
  );
};

export default EmptyCard;
