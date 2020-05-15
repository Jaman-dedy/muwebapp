import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonExampleConditionals = ({submitFormHandler, resetFormHandler}) => (
  <Button.Group>
    <Button
    color='red'
    onClick={resetFormHandler}
    >Cancel
    </Button>
    <Button.Or />
    <Button
    onClick={submitFormHandler}
     color='green'>Next</Button>
  </Button.Group>
)

export default ButtonExampleConditionals