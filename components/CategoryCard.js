import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const CategoryCard = ({category, containerStyle}) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        source={category?.thumbnail}
        resizeMode="cover"
        style={styles.container(containerStyle)}>
        <Text style={styles.title}>{category?.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: containerStyle => ({
    height: 150,
    width: 200,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    justifyContent: 'flex-end',
    ...containerStyle,
  }),
  title: {
    color: COLORS.white,
    ...FONTS.h2,
  },
});
