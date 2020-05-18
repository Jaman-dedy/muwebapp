import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonExampleMultipleConditionals = ({ style }) => (
  <Button.Group style={style}>
    <Button color="grey">Back</Button>
    <Button.Or />
    <Button color="red">Cancel</Button>
    <Button.Or />
    <Button color="green">Save</Button>
  </Button.Group>
);

export default ButtonExampleMultipleConditionals;
