import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  LineDivider,
  CategoryCard,
} from '../../components';

import {COLORS, FONTS, SIZES, icons, images, dummyData} from '../../constants';

const Section = ({containerStyle, title, onPress, children}) => {
  return (
    <View style={sectionStyles.container(containerStyle)}>
      <View style={sectionStyles.content}>
        <Text style={sectionStyles.title}>{title}</Text>
        <TextButton
          contentContainerStyle={sectionStyles.button}
          label="See All"
          onPress={onPress}
        />
      </View>

      {children}
    </View>
  );
};

const sectionStyles = StyleSheet.create({
  container: containerStyle => ({
    ...containerStyle,
  }),
  content: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
  },
  title: {
    flex: 1,
    ...FONTS.h2,
  },
  button: {
    width: 80,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
});

const Home = () => {
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        {/* Greetings */}
        <View style={styles.greetingsContainer}>
          <Text style={styles.greetingsTextUser}>Hello, There</Text>
          <Text style={styles.greetingsTextDate}>Thursday, 9th Sept 2021</Text>
        </View>

        {/* Notification */}
        <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        />
      </View>
    );
  };

  const renderStartLearning = () => (
    <ImageBackground
      source={images.featured_bg_image}
      style={styles.startLearningContainer}
      imageStyle={styles.startLearningContainerImage}>
      {/* Info */}
      <View>
        <Text style={styles.startLearningInfoText1}>HOW TO</Text>
        <Text style={styles.startLearningInfoText2}>
          Make your brand more visible with our checklist
        </Text>
        <Text style={styles.startLearningInfoText3}>By Riskinputra</Text>
      </View>

      {/* Image */}
      <Image source={images.start_learning} style={styles.startLearningImage} />

      {/* Button */}
      <TextButton
        label="Start Learning"
        contentContainerStyle={styles.startLearningButtonContainer}
        labelStyle={styles.startLearningButtonLabel}
      />
    </ImageBackground>
  );

  const renderCourses = () => (
    <FlatList
      horizontal
      data={dummyData.courses_list_1}
      listKey="Courses"
      keyExtractor={item => `Courses-${item.id}`}
      showHorizontalScrollIndicator={false}
      contentContainerStyle={styles.coursesContainer}
      renderItem={({item, index}) => (
        <VerticalCourseCard
          containerStyle={styles.coursesCard(index, dummyData)}
          course={item}
        />
      )}
    />
  );

  const renderCategories = () => (
    <Section title="Categories">
      <FlatList
        horizontal
        data={dummyData.categories}
        listKey="Categories"
        keyExtractor={item => `Categories-${item.id}`}
        showHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        renderItem={({item, index}) => (
          <CategoryCard
            category={item}
            containerStyle={styles.categoryCard(index)}
          />
        )}
      />
    </Section>
  );

  return (
    <View style={styles.homeContainer}>
      {/* Header */}
      {renderHeader()}

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Start Learning Section */}
        {renderStartLearning()}

        {/* Courses */}
        {renderCourses()}

        <LineDivider lineStyle={styles.lineStyle} />

        {/* Categories */}
        {renderCategories()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 150,
  },
  greetingsContainer: {
    flex: 1,
  },
  greetingsTextUser: {
    ...FONTS.h2,
  },
  greetingsTextDate: {
    color: COLORS.gray50,
    ...FONTS.body3,
  },
  startLearningContainer: {
    alignItems: 'flex-start',
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    padding: 15,
  },
  startLearningContainerImage: {
    borderRadius: SIZES.radius,
  },
  startLearningInfoText1: {
    color: COLORS.white,
    ...FONTS.body2,
  },
  startLearningInfoText2: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  startLearningInfoText3: {
    marginTop: SIZES.radius,
    color: COLORS.white,
    ...FONTS.body4,
  },
  startLearningImage: {
    width: '100%',
    height: 110,
    marginTop: SIZES.padding,
  },
  startLearningButtonContainer: {
    height: 40,
    paddingHorizontal: SIZES.padding,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  startLearningButtonLabel: {
    color: COLORS.black,
  },
  coursesContainer: {
    marginTop: SIZES.padding,
  },
  coursesCard: index => ({
    marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
    marginRight:
      index === dummyData.courses_list_1.length - 1 ? SIZES.padding : 0,
  }),
  lineStyle: {
    marginVertical: SIZES.padding,
  },
  categoriesList: {
    marginTop: SIZES.radius,
  },
  categoryCard: index => ({
    marginLeft: index === 0 ? SIZES.padding : SIZES.base,
    marginRight: index === dummyData.categories.length - 1 ? SIZES.padding : 0,
  }),
});

export default Home;
