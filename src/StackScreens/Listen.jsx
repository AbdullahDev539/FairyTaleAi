import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Animated,
  ScrollView,
} from 'react-native';
import StarsScreen from '../ReuseableComponents/StarsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import CustomButton from '../ReuseableComponents/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

const left = require('../assets/Onboardingimg/VoiceLeft.png');
const right = require('../assets/Onboardingimg/VoiceRight.png');

const Listen = ({ navigation, route }) => {
  const story = route?.params?.story || {};

  const voices = story.narration?.preset_voices || [
    {
      id: '1',
      name: 'Male 1',
      desc: 'Calm and Relaxed',
      img: require('../assets/frame.png'),
    },
    {
      id: '2',
      name: 'Female 1',
      desc: 'Soft and Friendly',
      img: require('../assets/frame.png'),
    },
    {
      id: '3',
      name: 'Narrator',
      desc: 'Deep Storytelling',
      img: require('../assets/frame.png'),
    },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [swiperIndex, setSwiperIndex] = useState(0);

  const totalDuration = story.duration_s || 300;
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => {
          if (prev >= totalDuration) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, totalDuration]);

  // Animate progress
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: elapsedTime / totalDuration,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [elapsedTime, totalDuration]);

  const formatTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const pages = story.assets?.text ? story.assets.text.match(/.{1,300}/g) : [];

  return (
    <ScrollView style={{ flex: 1 }}>
      <StarsScreen>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btn}
              >
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <CustomButton
                icon={<Ionicons name="book-outline" size={24} color="#fff" />}
                title="Read"
                width={{ width: wp('20%') }}
                onPress={() => navigation.navigate('StoryPage', { story })}
              />
            </View>

            {/* Story Card */}
            <View style={styles.card}>
              {story.image_url ? (
                <Image
                  source={{ uri: story.image_url }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={[
                    styles.image,
                    {
                      backgroundColor: '#ccc',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Text>No Image</Text>
                </View>
              )}
              <Text style={styles.title}>
                {story.title || 'Untitled Story'}
              </Text>
              <Text style={styles.duration}>
                ~ {Math.round(totalDuration / 60)} min
              </Text>
            </View>

            {/* Swiper for pages */}
            <View style={{ flex: 1, marginTop: hp('2%') }}>
              <Swiper
                loop={false}
                showsPagination={true}
                activeDotColor="#A78BFA"
                dotColor="#999"
              >
                {pages.map((chunk, index) => (
                  <View key={index} style={styles.slide}>
                    <Text style={styles.pageText}>{chunk}</Text>
                  </View>
                ))}
              </Swiper>
            </View>

            {/*  Progress Bar with Styled Thumb */}
            <View style={styles.progressContainer}>
              <View style={styles.progressWrapper}>
                <View style={styles.progressBar}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      },
                    ]}
                  />
                </View>

                <Animated.View
                  style={[
                    styles.thumb,
                    {
                      left: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                >
                  <View style={styles.innerThumb} />
                </Animated.View>
              </View>

              <View style={styles.timerRow}>
                <Text style={[styles.timerText, { color: '#A78BFA' }]}>
                  {formatTime(elapsedTime)}
                </Text>
                <Text style={[styles.timerText, { color: '#FFFFFF' }]}>
                  {formatTime(totalDuration)}
                </Text>
              </View>
            </View>

            {/* Player Controls */}
            <View style={styles.player}>
              <View style={styles.controlRow}>
                <TouchableOpacity
                  onPress={() => setElapsedTime(prev => Math.max(prev - 15, 0))}
                >
                  <Image source={left} style={styles.leftimg} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.playBtn}
                  onPress={() => setIsPlaying(prev => !prev)}
                >
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={28}
                    color="#fff"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    setElapsedTime(prev => Math.min(prev + 15, totalDuration))
                  }
                >
                  <Image source={right} style={styles.rightimg} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Voice Selector */}
            <TouchableOpacity
              style={styles.voiceSelector}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="volume-high" size={35} color="#A78BFA" />

              <Text style={styles.voiceText}>
                Voice Selected:{'\n'}
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
                  {selectedVoice.desc}
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Voice Modal */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <LinearGradient
                  style={styles.modalContent}
                  colors={['#FFF6D6', '#F4F2EB', '#FFFBEB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop: hp('1%'),
                    }}
                  >
                    <Text style={styles.modalTitle}>Choose your voice</Text>
                    <TouchableOpacity
                      style={styles.closeBtn}
                      onPress={() => setModalVisible(false)}
                    >
                      <Ionicons name="close" size={22} color="#333" />
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: hp('29%'), marginTop: 14 }}>
                    <Swiper
                      loop={false}
                      showsPagination={true}
                      activeDotColor="#A78BFA"
                      dotColor="#ccc"
                      onIndexChanged={i => setSwiperIndex(i)}
                    >
                      {voices.map((voice, index) => (
                        <View key={voice.id} style={styles.voiceSlide}>
                          <Image
                            source={voice.img}
                            style={styles.voiceImg}
                            resizeMode="contain"
                          />
                          <Text style={styles.voiceName}>{voice.name}</Text>
                          <Text style={styles.voiceDesc}>{voice.desc}</Text>
                        </View>
                      ))}
                    </Swiper>
                  </View>

                  <View style={styles.modalBtns}>
                    <TouchableOpacity
                      style={styles.useBtn}
                      onPress={() => navigation.navigate('CreateVoice')}
                    >
                      <Text style={styles.btnText}>Use my voice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.selectBtn}
                      onPress={() => {
                        setSelectedVoice(voices[swiperIndex]);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.btnText}>Select Voice</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </StarsScreen>
    </ScrollView>
  );
};

export default Listen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('8%'),
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: wp('12%'),
    borderRadius: wp('24%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { marginTop: hp('2%'), alignItems: 'center' },
  image: { width: wp('85%'), height: hp('30%'), borderRadius: 16 },
  title: {
    marginTop: hp('2%'),
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  duration: { color: '#ccc', marginTop: 4 },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  pageText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
  player: { marginTop: hp('2%'), alignItems: 'center' },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '52%',
  },
  leftimg: { width: 26, height: 26, tintColor: '#fff' },
  rightimg: { width: 28, height: 28, tintColor: '#fff' },
  playBtn: { backgroundColor: '#A78BFA', padding: 14, borderRadius: 50 },

  progressContainer: { marginTop: hp('2%'), paddingHorizontal: wp('5%') },
  progressWrapper: {
    position: 'relative',
    height: hp('4%'),
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    height: hp('1.5%'),
    backgroundColor: '#E5E7EB',
    borderRadius: wp('1.5%'),
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#A78BFA' },
  thumb: {
    position: 'absolute',
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('7%'),
    backgroundColor: '#FFFFFF',
    top: hp('0.4%'),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -wp('3.8%') }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  innerThumb: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    borderRadius: wp('3.25%'),
    backgroundColor: '#A78BFA',
  },

  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerText: { fontSize: RFValue(14), fontWeight: '600' },

  voiceSelector: {
    marginTop: hp('4%'),
    backgroundColor: 'rgba(255,255,255,0.1)',

    padding: 14,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 0.5,
    borderColor: '#A78BFA',
    marginBottom: hp('1%'),
    gap: 10,
  },
  voiceText: { color: '#D4D6DD', fontSize: 14, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: hp('55%'),
  },
  closeBtn: {
    alignSelf: 'flex-end',
    borderWidth: 1.5,
    borderRadius: 999,
    marginRight: wp('1%'),
    marginBottom: hp('1.4%'),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    marginRight: wp('14%'),
  },
  voiceSlide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 36,
  },
  voiceImg: { width: 100, height: 100, marginBottom: 12 },
  voiceName: {
    fontSize: RFValue(16),
    fontWeight: '700',
    color: '#333',
    marginTop: 6,
  },
  voiceDesc: {
    fontSize: RFValue(13),
    color: '#777',
    marginTop: 5,
    fontWeight: '500',
  },
  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 34,
  },
  useBtn: {
    backgroundColor: '#FEC89A',
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  selectBtn: {
    backgroundColor: '#A78BFA',
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
