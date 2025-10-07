import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Progress from 'react-native-progress';

const arrowRight = require('../assets/Onboardingimg/arrow-right.png');
const child = require('../assets/Onboardingimg/child.png');
const man = require('../assets/Onboardingimg/man.png');
const Table = require('../assets/Onboardingimg/Table.png');
const girl = require('../assets/Onboardingimg/girl.png');

const OnboardingScreen = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index === 2) {
      navigation.navigate('TrialPaywall', { type: 'Trial' });
    } else {
      swiperRef.current.scrollBy(1);
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const renderProgressiveDots = () => (
    <View style={styles.customPagination}>
      {[0, 1, 2].map(dotIndex => (
        <View
          key={dotIndex}
          style={[styles.dot, dotIndex <= index && styles.activeDot]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false} // disable default dots
        onIndexChanged={i => setIndex(i)}
        showsButtons={false}
        scrollEnabled
        removeClippedSubviews={false}
      >
        {/* -------- Screen 1 -------- */}
        <View style={styles.slide}>
          <TouchableOpacity
            style={[
              styles.skipbutton,
              { position: 'absolute', zIndex: 10, marginBottom: hp('80%') },
            ]}
            onPress={handleNext}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <ImageBackground
            source={child}
            style={styles.backgroundimg}
            resizeMode="cover"
          >
            <Image source={man} style={styles.manimg} resizeMode="contain" />
          </ImageBackground>

          <View style={styles.card}>
            {renderProgressiveDots()}
            <Text style={[styles.title, { marginTop: hp('2.8%') }]}>
              You can’t always be{' '}
            </Text>
            <Text style={styles.subtitle}>there at bedtime…</Text>
            <Text style={styles.description}>
              ...but bedtime still matters.
            </Text>

            <View style={styles.progressWrapper}>
              <Progress.Circle
                size={hp('10.5%')}
                progress={(index + 1) / 3}
                thickness={4}
                color="#A78BFA"
                borderWidth={0}
                strokeCap="round"
                style={{ position: 'absolute' }}
              />
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Image
                  source={arrowRight}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* -------- Screen 2 -------- */}
        <View style={styles.slide}>
          <ImageBackground
            source={Table}
            style={styles.nextimage1}
            resizeMode="contain"
          >
            <TouchableOpacity
              style={[styles.skipbutton, { marginTop: hp('12%') }]}
              onPress={handleNext}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </ImageBackground>

          <View
            style={[
              styles.card,
              { height: Platform.OS === 'ios' ? hp('42%') : hp('46%') },
            ]}
          >
            {renderProgressiveDots()}
            <View style={{ marginTop: hp('2%') }}>
              <Text style={styles.title2}>Let your child fall </Text>
              <Text style={styles.title2}>asleep to your voice,</Text>
              <Text style={styles.subtitle2}>even when you’re away</Text>
              <Text style={styles.description}>
                Fairy Tales AI makes your voice part of their bedtime ritual.
              </Text>
            </View>

            <View style={styles.progressWrapper}>
              <Progress.Circle
                size={hp('10.5%')}
                progress={(index + 1) / 3}
                thickness={4}
                color="#A78BFA"
                borderWidth={0}
                strokeCap="round"
                style={{ position: 'absolute' }}
              />
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Image
                  source={arrowRight}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* -------- Screen 3 -------- */}
        <View style={[styles.slide, { backgroundColor: '#F3DFF9' }]}>
          <ImageBackground
            source={girl}
            style={styles.nextimage2}
            resizeMode="contain"
          >
            <TouchableOpacity
              style={[styles.skipbutton, { marginTop: hp('5%') }]}
              onPress={handleNext}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </ImageBackground>

          <View style={styles.card}>
            {renderProgressiveDots()}
            <Text style={[styles.title, { marginTop: hp('2.6%') }]}>
              Stories that feel{' '}
            </Text>
            <Text style={styles.subtitle}>like home</Text>
            <Text style={styles.description}>
              Start your free 7-day trial today.
            </Text>

            <View style={styles.progressWrapper}>
              <Progress.Circle
                size={hp('10.5%')}
                progress={(index + 1) / 3}
                thickness={4}
                color="#A78BFA"
                borderWidth={0}
                strokeCap="round"
                style={{ position: 'absolute' }}
              />
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Image
                  source={arrowRight}
                  style={styles.arrowRight}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundimg: {
    width: wp('100%'),
    height: Platform.OS === 'ios' ? hp('38%') : hp('40%'),
    marginBottom: hp('32%'),
  },
  manimg: {
    width: wp('40%'),
    height: hp('36%'),
  },
  nextimage1: {
    width: wp('100%'),
    height: Platform.OS === 'ios' ? hp('68%') : hp('76%'),
    marginBottom: hp('23%'),
  },
  nextimage2: {
    width: wp('100%'),
    height: Platform.OS === 'ios' ? hp('68%') : hp('60%'),
    marginBottom: hp('32%'),
  },
  card: {
    position: 'absolute',
    width: wp('100%'),
    height: Platform.OS === 'ios' ? hp('46%') : hp('50%'),
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFBF6',
    borderTopLeftRadius: wp('9%'),
    borderTopRightRadius: wp('9%'),
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  title2: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: RFValue(28),
    textAlign: 'center',
    color: '#A78BFA',
    fontWeight: '600',
  },
  subtitle2: {
    fontSize: RFValue(26),
    textAlign: 'center',
    color: '#A78BFA',
    fontWeight: '600',
  },
  description: {
    fontSize: RFValue(18),
    textAlign: 'center',
    color: '#71727A',
    marginTop: hp('1%'),
  },
  button: {
    backgroundColor: '#A78BFA',
    padding: wp('5%'),
    borderRadius: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    elevation: 8,
  },
  skipbutton: {
    backgroundColor: '#A78BFA',
    width: wp('16%'),
    height: hp('4.6%'),
    borderRadius: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: wp('8%'),
    marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'),
  },
  skipText: {
    fontSize: RFValue(12),
    color: '#fff',
  },
  customPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  dot: {
    backgroundColor: '#ccc',
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    marginHorizontal: wp('1%'),
  },
  activeDot: {
    backgroundColor: '#A78BFA',
  },
  progressWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  arrowRight: {
    width: wp('8.9%'),
    height: hp('4%'),
  },
});

export default OnboardingScreen;
