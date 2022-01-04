import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {IconLabel} from '.';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const HorizontalCourseCard = ({containerStyle, course}) => {
  return (
    <TouchableOpacity style={styles.container(containerStyle)}>
      {/* Thumbnail */}
      <ImageBackground
        source={course.thumbnail}
        resizeMode="cover"
        style={styles.thumbnail}
        imageStyle={styles.image}>
        <View style={styles.favorites}>
          <Image
            source={icons.favourite}
            resizeMode="contain"
            style={styles.favoritesIcon(course.is_favourite)}
          />
        </View>
      </ImageBackground>

      {/* Details */}
      <View style={styles.detailsContainer}>
        {/* Title */}
        <Text style={styles.detailsTitle}>{course.title}</Text>

        {/* Instructor & Duration */}
        <View style={styles.instructorContainer}>
          <Text style={styles.instructorName}>By {course.instructor}</Text>
          <IconLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={styles.durationIconContainer}
            iconStyle={styles.durationIcon}
            labelStyle={styles.durationLabel}
          />
        </View>

        {/* Price & Ratings */}
        <View style={styles.priceRatingsContainer}>
          <Text style={styles.priceText}>$ {course.price.toFixed(2)}</Text>

          <IconLabel
            icon={icons.star}
            label={course.ratings}
            containerStyle={styles.ratingsContainer}
            iconStyle={styles.ratingsIcon}
            labelStyle={styles.ratingsLabel}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCourseCard;

const styles = StyleSheet.create({
  container: containerStyle => ({
    flexDirection: 'row',
    ...containerStyle,
  }),
  thumbnail: {
    width: 130,
    height: 130,
    marginBottom: SIZES.radius,
  },
  image: {
    borderRadius: SIZES.radius,
  },
  favorites: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  favoritesIcon: isFavorite => ({
    width: 20,
    height: 20,
    tintColor: isFavorite ? COLORS.secondary : COLORS.additionalColor4,
  }),
  detailsContainer: {
    flex: 1,
    marginLeft: SIZES.base,
  },
  detailsTitle: {
    ...FONTS.h3,
    fontSize: 18,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  instructorName: {
    ...FONTS.body4,
  },
  durationIconContainer: {
    marginLeft: SIZES.base,
  },
  durationIcon: {
    width: 15,
    height: 15,
  },
  durationLabel: {
    ...FONTS.body4,
  },
  priceRatingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  priceText: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  ratingsContainer: {
    marginLeft: SIZES.base,
  },
  ratingsIcon: {
    width: 15,
    height: 15,
    tintColor: COLORS.primary2,
  },
  ratingsLabel: {
    marginLeft: 5,
    color: COLORS.black,
    ...FONTS.h3,
  },
});
