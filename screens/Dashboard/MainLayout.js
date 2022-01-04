import React, {
  useRef,
  useState,
  createRef,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

import Home from './Home';
import Search from './Search';
import Profile from './Profile';

import {COLORS, SIZES, FONTS, constants} from '../../constants';

const bottom_tabs = constants.bottom_tabs.map(bottom_tab => ({
  ...bottom_tab,
  ref: createRef(),
}));

const TabIndicator = ({measureLayout, scrollX}) => {
  const inputRange = bottom_tabs.map((_, i) => i * SIZES.width);

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });
  return (
    <Animated.View
      style={styles.tabIndicatorContainer(tabIndicatorWidth, translateX)}
    />
  );
};

const Tabs = ({scrollX, onBottomTabPress}) => {
  const containerRef = useRef();
  const [measureLayout, setMeasureLayout] = useState([]);
  useEffect(() => {
    let ml = [];
    bottom_tabs.forEach(bottom_tab => {
      bottom_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({x, y, width, height});

          if (ml.length === bottom_tabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);
  return (
    <View ref={containerRef} style={styles.tabsContainer}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {/* Tabs */}
      {bottom_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`BottomTab-${index}`}
            ref={item.ref}
            style={styles.tabsItem}
            onPress={() => onBottomTabPress(index)}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={styles.tabsItemImage}
            />
            <Text style={styles.tabsItemText}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainLayout = () => {
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onBottomTabPress = useCallback(bottomTabIndex => {
    flatListRef?.current?.scrollToOffset({
      offset: bottomTabIndex * SIZES.width,
    });
  });

  const renderContent = () => (
    <View style={styles.content}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        scrollEnabled={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        data={constants.bottom_tabs}
        keyExtractor={item => `Main-${item.id}`}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({item, index}) => {
          return (
            <View style={styles.contentSection}>
              {item.label === constants.screens.home && <Home />}
              {item.label === constants.screens.search && <Search />}
              {item.label === constants.screens.profile && <Profile />}
            </View>
          );
        }}
      />
    </View>
  );

  const renderBottomTabs = () => (
    <View style={styles.bottomTabsContainer}>
      <Shadow size={[SIZES.width - SIZES.padding * 2, 85]}>
        <View style={styles.bottomTabsContent}>
          <Tabs scrollX={scrollX} onBottomTabPress={onBottomTabPress} />
        </View>
      </Shadow>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Content */}
      {renderContent()}
      {/* Bottom Link */}
      {renderBottomTabs()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  contentSection: {
    height: SIZES.height,
    width: SIZES.width,
  },
  bottomTabsContainer: {
    marginBottom: 20,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
  },
  bottomTabsContent: {
    flex: 1,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary3,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  tabsItem: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsItemImage: {
    width: 25,
    height: 25,
  },
  tabsItemText: {
    marginTop: 3,
    color: COLORS.white,
    ...FONTS.h3,
  },
  tabIndicatorContainer: (tabIndicatorWidth, translateX) => ({
    position: 'absolute',
    left: 0,
    height: '100%',
    width: tabIndicatorWidth,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    transform: [
      {
        translateX,
      },
    ],
  }),
});

export default MainLayout;
