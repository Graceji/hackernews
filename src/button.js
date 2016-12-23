import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { onClick, children } = this.props;
    return (
      <button type="button" onClick={onClick}>
        { children }
      </button>
    );
  }
}