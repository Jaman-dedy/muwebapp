/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React from 'react';

export default function Catch(component, errorHandler) {
  function Inner({ error, props }) {
    return <> {component(props, error)} </>;
  }

  return class extends React.Component {
    state = {
      error: undefined,
    };

    static getDerivedStateFromError(error) {
      return {
        error,
      };
    }

    componentDidCatch(error, info) {
      if (errorHandler) {
        errorHandler(error, info);
      }
    }

    render() {
      return <Inner error={this.state.error} props={this.props} />;
    }
  };
}
