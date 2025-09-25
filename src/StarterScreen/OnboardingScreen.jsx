import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DarkTheme } from '@react-navigation/native';
import { Animated } from 'react-native';

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
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [index]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FAF0E1',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={i => setIndex(i)}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        showsButtons={false}
        scrollEnabled={true}
        removeClippedSubviews={false}
        paginationStyle={{
          bottom: hp('40%'),
        }}
      >
        {/* Screen 1 */}
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
            <Text style={[styles.title, { marginTop: hp('9%') }]}>
              You can’t always be{' '}
              <Text style={styles.subtitle}>there at bedtime…</Text>
            </Text>

            <Text style={styles.description}>
              ...but bedtime still matters.
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp('2%'),
              }}
            >
              <Progress.Circle
                size={hp('9%')}
                progress={(index + 1) / 3}
                thickness={3}
                color="#7A5AF8"
                borderWidth={0}
                style={{ position: 'absolute' }}
              />
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Ionicons
                  name="arrow-forward"
                  size={RFValue(20)}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Screen 2 */}
        <View style={styles.slide}>
          <ImageBackground
            source={Table}
            style={styles.nextimages}
            resizeMode="contain"
          >
            <TouchableOpacity
              style={[styles.skipbutton, { marginTop: hp('10%') }]}
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
            <View style={{ marginTop: hp('5%') }}>
              <Text style={styles.title2}>Let your child fall </Text>
              <Text style={styles.title2}>asleep to your voice,</Text>
              <Text style={styles.subtitle2}>even when you’re away</Text>
              <Text style={styles.description}>
                Fairy Tales AI makes your voice part of their bedtime ritual.
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Progress.Circle
                size={hp('9%')}
                progress={(index + 1) / 3}
                thickness={3}
                color="#7A5AF8"
                borderWidth={0}
                style={{ position: 'absolute' }}
              />
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Ionicons
                  name="arrow-forward"
                  size={RFValue(20)}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Screen 3 */}
        <View style={styles.slide}>
          <ImageBackground
            source={girl}
            style={styles.nextimages}
            resizeMode="contain"
          >
            <TouchableOpacity
              style={[styles.skipbutton, { marginTop: hp('8%') }]}
              onPress={handleNext}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.card}>
            <Text style={[styles.title, { marginTop: hp('5%') }]}>
              Stories that feel{' '}
            </Text>
            <Text style={styles.subtitle}>like home</Text>
            <Text style={styles.description}>
              Start your free 7-day trial today.
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp('2%'),
              }}
            >
              <Progress.Circle
                size={hp('9%')}
                progress={(index + 1) / 3}
                thickness={3}
                color="#7A5AF8"
                borderWidth={0}
                style={{ position: 'absolute' }}
              />
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Ionicons
                  name="arrow-forward"
                  size={RFValue(20)}
                  color="#fff"
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  backgroundimg: {
    width: wp('100%'),
    height: Platform.OS === 'ios' ? hp('38%') : hp('40%'),
    marginBottom: hp('30%'),
  },
  manimg: {
    width: wp('39%'),
    height: hp('40%'),
  },
  nextimages: {
    width: wp('100%'),
    height: Platform.OS === 'ios' ? hp('68%') : hp('70%'),
    marginBottom: hp('30%'),
  },
  title: {
    fontSize: RFValue(32),
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
    fontSize: RFValue(32),
    textAlign: 'center',
    color: '#7A5AF8',
    fontWeight: '600',
  },
  subtitle2: {
    fontSize: RFValue(28),
    textAlign: 'center',
    color: '#7A5AF8',
    fontWeight: '600',
  },

  description: {
    fontSize: RFValue(18),
    fontWeight: 'semibold',
    textAlign: 'center',
    color: '#666',
    marginTop: hp('1%'),
  },
  button: {
    backgroundColor: '#A78BFA',
    padding: 20,

    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  skipbutton: {
    backgroundColor: '#A78BFA',
    width: wp('15%'),
    height: hp('4.1%'),
    borderRadius: wp('16%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: wp('5%'),
    marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'),
  },
  skipText: {
    fontSize: RFValue(12),
    color: '#fff',
  },
  dot: {
    backgroundColor: '#ccc',
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    marginHorizontal: wp('1%'),
  },
  activeDot: {
    backgroundColor: '#7A5AF8',
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.5%'),
    marginHorizontal: wp('1%'),
  },
});

export default OnboardingScreen;
