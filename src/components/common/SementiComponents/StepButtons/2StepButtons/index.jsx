import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonExampleConditionals = ({
  submitFormHandler,
  resetFormHandler,
  style,
  isLoading,
}) => (
  <Button.Group style={style}>
    <Button color="red" onClick={resetFormHandler}>
      Reset
    </Button>
    <Button.Or />
    <Button
      loading={isLoading}
      onClick={submitFormHandler}
      color="green"
    >
      Save
    </Button>
  </Button.Group>
);

export default ButtonExampleConditionals;
