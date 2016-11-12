// @flow

import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import Provide from '../utils/Provide';
import { Theme } from '../utils/types';

type Props = {
  theme: Theme,
  inset?: boolean,
  style?: View.propTypes.style,
};

function Divider({ theme, inset = false }: Props) {
  return (
    <View
      style={[
        styles.divider,
        inset && { marginLeft: 72 },
        { backgroundColor: theme === 'light' ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)' },
        style
      ]}
    />
  );
}

const styles = Stylesheet.create({
  divider: {
    height: 1
  }
});

export default Provide(Divider);
