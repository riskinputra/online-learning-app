import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {COLORS} from '../constants';

const IconButton = ({containerStyle, icon, iconStyle, onPress}) => {
  return (
    <TouchableOpacity style={{...containerStyle}} onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={styles.image(iconStyle)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: iconStyle => {
    return {
      width: 30,
      height: 30,
      tintColor: COLORS.white,
      ...iconStyle,
    };
  },
});

export default IconButton;
