import React, {useRef} from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Shadow} from 'react-native-shadow-2';
import {CategoryCard} from '../../components';
import TextButton from '../../components/TextButton';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../constants';

const Search = () => {
  const scrollViewRef = useRef();

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const renderTopSearches = () => (
    <View style={styles.topSearchesContainer}>
      <Text style={styles.topSearchesTitle}>Top Searches</Text>

      <FlatList
        horizontal
        data={dummyData.top_searches}
        listKey="TopSearches"
        keyExtractor={item => `TopSearches-${item.id}`}
        showHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topSearchesList}
        renderItem={({item, index}) => (
          <TextButton
            label={item.label}
            contentContainerStyle={styles.topSearchesListItem(index)}
            labelStyle={styles.topSearchesListItemLabel}
          />
        )}
      />
    </View>
  );

  const renderBrowseCategories = () => (
    <View style={styles.browseCategoriesContainer}>
      <Text style={styles.browseCategoriesTitle}>Browse Categories</Text>

      <FlatList
        data={dummyData.categories}
        numColumns={2}
        scrollEnabled={false}
        listKey="BrowseCategories"
        keyExtractor={item => `BrowseCategories-${item.id}`}
        contentContainerStyle={styles.browseCategoriesList}
        renderItem={({item, index}) => (
          <CategoryCard
            category={item}
            containerStyle={styles.browseCategoriesListItem(index)}
          />
        )}
      />
    </View>
  );

  function renderSearchBar() {
    const inputRange = [0, 55];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchBarAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [55, 0],
          Extrapolate.CLAMP,
        ),
        opacity: interpolate(
          scrollY.value,
          inputRange,
          [1, 0],
          Extrapolate.CLAMP,
        ),
      };
    });
    return (
      <Animated.View style={styles.searchBarContainer(searchBarAnimatedStyle)}>
        <Shadow>
          <View style={styles.searchBarCotent}>
            <Image source={icons.search} style={styles.searchBarCotentIcon} />

            <TextInput
              style={styles.searchBarCotentInput}
              value=""
              placeholder="Search for Topics, Courses & Educators"
              placeholderTextColor={COLORS.gray}
            />
          </View>
        </Shadow>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.animatedContainer}
        showVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        onScrollEndDrag={event => {
          if (
            event.nativeEvent.contentOffset.y > 10 &&
            event.nativeEvent.contentOffset.y < 50
          ) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 60,
              animated: true,
            });
          }
        }}>
        {/* Top Searches */}
        {renderTopSearches()}

        {/* Browse Categories */}
        {renderBrowseCategories()}
      </Animated.ScrollView>

      {/* Search Bar */}
      {renderSearchBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  animatedContainer: {
    marginTop: 100,
    paddingBottom: 300,
  },
  topSearchesContainer: {
    marginTop: SIZES.padding,
  },
  topSearchesTitle: {
    marginHorizontal: SIZES.padding,
    ...FONTS.h2,
  },
  topSearchesList: {
    marginTop: SIZES.radius,
  },
  topSearchesListItem: index => ({
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
    marginRight:
      index === dummyData.top_searches.length - 1 ? SIZES.padding : 0,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray10,
  }),
  topSearchesListItemLabel: {
    color: COLORS.gray50,
    ...FONTS.h3,
  },
  browseCategoriesContainer: {
    marginTop: SIZES.padding,
  },
  browseCategoriesTitle: {
    marginHorizontal: SIZES.padding,
    ...FONTS.h2,
  },
  browseCategoriesList: {
    marginTop: SIZES.radius,
  },
  browseCategoriesListItem: index => ({
    height: 130,
    width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
    marginTop: SIZES.radius,
    marginLeft: (index + 1) % 2 === 0 ? SIZES.radius : SIZES.padding,
  }),
  searchBarContainer: searchBarAnimatedStyle => [
    {
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      paddingHorizontal: SIZES.padding,
      height: 50,
    },
    searchBarAnimatedStyle,
  ],
  searchBarCotent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - SIZES.padding * 2,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  searchBarCotentIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.gray40,
  },
  searchBarCotentInput: {
    flex: 1,
    marginLeft: SIZES.base,
    ...FONTS.h4,
  },
});

export default Search;
