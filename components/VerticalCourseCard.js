import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {IconLabel} from '.';

import {SIZES, FONTS, COLORS, icons} from '../constants';

const VerticalCourseCard = ({containerStyle, course}) => {
  return (
    <TouchableOpacity style={styles.container(containerStyle)}>
      {/* Thumbnail */}
      <Image
        source={course.thumbnail}
        resizeMode="cover"
        style={styles.thumbnail}
      />

      {/* Detail */}
      <View style={styles.detail}>
        {/* Play */}
        <View style={styles.detailPlayContainer}>
          <Image
            source={icons.play}
            resizeMode="contain"
            style={styles.detailPlayImage}
          />
        </View>

        {/* Info */}
        <View style={styles.detailInfoContainer}>
          <Text style={styles.detailInfoTitle}>{course.title}</Text>
          <IconLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={styles.detailInfoIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalCourseCard;

const styles = StyleSheet.create({
  container: containerStyle => ({
    width: 270,
    ...containerStyle,
  }),
  thumbnail: {
    width: '100%',
    height: 150,
    marginBottom: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  detail: {
    flexDirection: 'row',
  },
  detailPlayContainer: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: COLORS.primary,
  },
  detailPlayImage: {
    width: 20,
    height: 20,
  },
  detailInfoContainer: {
    flexShrink: 1,
    paddingHorizontal: SIZES.radius,
  },
  detailInfoTitle: {
    flex: 1,
    ...FONTS.h3,
    fontSize: 18,
  },
  detailInfoIcon: {
    marginTop: SIZES.base,
  },
});
