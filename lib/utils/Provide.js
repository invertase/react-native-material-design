// @flow

import React, { Component } from 'react';
import { Element } from 'react-native';

const decorator = (ComposedComponent: Element<any>) => {
  const component = class extends Component {
    render() {
      return (
        <ComposedComponent
          {...this.props}
          theme={this.context.theme}
        />
      );
    }
  };

  component.contextTypes = {
    theme: React.PropTypes.string.isRequired,
  };

  const statics = {};

  // Babel/ES6 makes static methods non-enumerable.
  Object.getOwnPropertyNames(ComposedComponent).forEach(name => {
    if (typeof ComposedComponent[name] === 'function') {
      statics[name] = ComposedComponent[name];
    }
  });

  // Get all enumerable props.
  Object.keys(ComposedComponent).forEach(name => {
    statics[name] = ComposedComponent[name];
  });

  // Apply statics and return.
  Object.keys(statics).forEach((key) => {
    if (typeof component[key] === 'undefined') {
      component[key] = statics[key];
    }
  });

  return component;
};

export default decorator;
