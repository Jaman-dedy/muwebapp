import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';

class StepExampleLinkClickable extends Component {
  state = {};

  render() {
    return <Step.Group>{this.props.steps}</Step.Group>;
  }
}
export default StepExampleLinkClickable;
