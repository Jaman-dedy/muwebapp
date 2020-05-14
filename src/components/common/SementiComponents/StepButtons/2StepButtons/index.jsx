import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonExampleConditionals = () => (
  <Button.Group>
    <Button>Cancel</Button>
    <Button.Or />
    <Button color='grey'>Next</Button>
  </Button.Group>
)

export default ButtonExampleConditionals