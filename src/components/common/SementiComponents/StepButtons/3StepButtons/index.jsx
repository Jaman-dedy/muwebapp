import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonExampleMultipleConditionals = ({
  style,
  isLoading,
  onClickHandler,
}) => (
  <Button.Group style={style}>
    <Button color="grey">Back</Button>
    <Button.Or />
    <Button color="red">Cancel</Button>
    <Button.Or />
    <Button
      onClick={onClickHandler}
      loading={isLoading}
      color="green"
    >
      Next
    </Button>
  </Button.Group>
);

export default ButtonExampleMultipleConditionals;
