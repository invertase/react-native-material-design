// @flow

import React from 'react';
import { Element } from 'react-native';

type Props = {
  theme?: 'dark' | 'light',
  children?: Element<any>,
};

class MaterialDesign extends React.Component {

  getChildContext() {
    return {
      theme: this.props.theme || 'light',
    };
  }

  props: Props;

  render() {
    return this.props.children;
  }
}

MaterialDesign.childContextTypes = {
  theme: React.PropTypes.onOf(['dark', 'light']).isRequired,
};

export default MaterialDesign;
