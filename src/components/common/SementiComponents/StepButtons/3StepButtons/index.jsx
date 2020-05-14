import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonExampleMultipleConditionals = () => (
  <Button.Group>
    <Button>Back</Button>
    <Button.Or />
    <Button>Cancel</Button>
    <Button.Or />
    <Button>Next</Button>
  </Button.Group>
)

export default ButtonExampleMultipleConditionals