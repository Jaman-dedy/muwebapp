import React, { Component } from 'react'
import { Step } from 'semantic-ui-react'

class StepExampleLinkClickable extends Component {
  state = {}

  handleClick = (e, { title }) => this.setState({ active: title })

  render() {
    const { active } = this.state

    return (
      <Step.Group  >
       {this.props.steps}
      </Step.Group>
    )
  }
}
export default StepExampleLinkClickable