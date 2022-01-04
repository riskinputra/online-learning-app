import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const IconLabel = ({containerStyle, icon, iconStyle, label, labelStyle}) => {
  return (
    <View style={styles.container(containerStyle)}>
      <Image source={icon} style={styles.icon(iconStyle)} />
      <Text style={styles.label(labelStyle)}>{label}</Text>
    </View>
  );
};

export default IconLabel;

const styles = StyleSheet.create({
  container: containerStyle => ({
    flexDirection: 'row',
    alignItem: 'center',
    ...containerStyle,
  }),
  icon: iconStyle => ({
    width: 20,
    height: 20,
    tintColor: COLORS.gray30,
    ...iconStyle,
  }),
  label: labelStyle => ({
    marginLeft: SIZES.base,
    color: COLORS.gray30,
    ...FONTS.body3,
    ...labelStyle,
  }),
});
