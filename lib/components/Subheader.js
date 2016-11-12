// @flow

import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import { Theme } from '../utils/types';

type Props = {
  children: string,
  inset?: boolean,
  theme: Theme,
  lines?: number,
  style?: View.propTypes.style,
};

function Subheader({ inset = false, lines = 1, children, style }: Props) {
  return (
    <View
      style={[
        styles.container,
        { paddingLeft: inset ? 72 : 16 },
        style,
      ]}
    >
      <Text
        numberOfLines={lines}
        style={[
          styles.text,

        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  text: {
    color: 'rgba(0,0,0,.54)',
  }
});

export default Subheader;
