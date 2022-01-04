import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../constants';

const TextButotn = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container(contentContainerStyle)}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.label(labelStyle)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButotn;

const styles = StyleSheet.create({
  container: contentContainerStyle => ({
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    ...contentContainerStyle,
  }),
  label: labelStyle => ({
    color: COLORS.white,
    ...FONTS.h3,
    ...labelStyle,
  }),
});
