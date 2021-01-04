import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SingleCardView from '../SingleCardView';

const DisplayCard = ({ card, onClick }) => {
  return (
    <List.Item>
      <List.Content>
        <SingleCardView card={card} onClick={onClick} />
      </List.Content>
    </List.Item>
  );
};

DisplayCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DisplayCard;
