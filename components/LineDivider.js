import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../constants';

const LineDivider = ({lineStyle}) => {
  return <View style={styles.container(lineStyle)} />;
};

export default LineDivider;

const styles = StyleSheet.create({
  container: lineStyle => ({
    height: 2,
    width: '100%',
    backgroundColor: COLORS.gray20,
    ...lineStyle,
  }),
});
