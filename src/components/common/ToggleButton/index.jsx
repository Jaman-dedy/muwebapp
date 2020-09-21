import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class ToggleSwitch extends Component {
  state = {
    checked: false,
  };

  componentDidMount = () => {
    this.setState({
      checked: this.props.defaultChecked,
    });
  };

  onChange = e => {
    this.setState({
      checked: e.target.checked,
    });
    if (typeof this.props.onChange === 'function')
      this.props.onChange(e.target.checked);
  };

  render() {
    return (
      <div
        className={`toggle-switch${
          this.props.Small ? ' small-switch' : ''
        }`}
      >
        <input
          type="checkbox"
          name={this.props.name}
          className="toggle-switch-checkbox"
          id={this.props.id}
          checked={this.props.currentValue || this.props.checked}
          defaultChecked={this.props.defaultChecked}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
        {this.props.id ? (
          <label
            className="toggle-switch-label"
            htmlFor={this.props.id}
          >
            <span
              className={
                this.props.disabled
                  ? 'toggle-switch-inner toggle-switch-disabled'
                  : 'toggle-switch-inner'
              }
              data-yes={this.props.text[0]}
              data-no={this.props.text[1]}
            />
            <span
              className={
                this.props.disabled
                  ? 'toggle-switch-switch toggle-switch-disabled'
                  : 'toggle-switch-switch'
              }
            />
          </label>
        ) : null}
      </div>
    );
  }
}

ToggleSwitch.defaultProps = {
  text: ['', ''],
};

ToggleSwitch.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  Small: PropTypes.bool,
  currentValue: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ToggleSwitch;
