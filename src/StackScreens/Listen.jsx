import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
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
const left = require('../assets/Onboardingimg/VoiceLeft.png');
const right = require('../assets/Onboardingimg/VoiceRight.png');

const Listen = ({ navigation, route }) => {
  const { story } = route.params;

  // ✅ Voices from JSON (sample with name + desc + img)
  const voices = story.narration?.preset_voices || [
    {
      id: '1',
      name: 'Male 1',
      desc: 'Calm and Natural',
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

  const pages = story.assets?.text
    ? story.assets.text.match(/.{1,300}/g)
    : ['Story content not available.'];

  return (
    <ScrollView style={{ flex: 1 }}>
      <StarsScreen>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            {/* Top Bar */}
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
              <Text style={styles.title}>{story.title}</Text>
              <Text style={styles.duration}>
                ~ {story.duration_s ? Math.round(story.duration_s / 60) : 0} min
              </Text>
            </View>

            {/* Swiper for story pages */}
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

            {/* Player Controls */}
            <View style={styles.player}>
              <View style={styles.controlRow}>
                <Image
                  source={right}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#fff',
                  }}
                />
                <TouchableOpacity
                  style={styles.playBtn}
                  onPress={() => setIsPlaying(!isPlaying)}
                >
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={28}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Image
                  source={right}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#fff',
                  }}
                />
              </View>
            </View>

            {/* Voice Selector Button */}

            <TouchableOpacity
              style={styles.voiceSelector}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="volume-high" size={35} color="#A78BFA" />
              <Text style={styles.voiceText}>
                Voice Selected: {selectedVoice.name}
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
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>Choose your voice</Text>

                  {/* Swiper Wrapper */}
                  <View style={{ height: hp('28%'), marginTop: 10 }}>
                    <Swiper
                      loop={false}
                      showsPagination={true}
                      activeDotColor="#A78BFA"
                      dotColor="#ccc"
                      onIndexChanged={i => setSwiperIndex(i)}
                    >
                      {voices.map((voice, index) => (
                        <View key={index} style={styles.voiceSlide}>
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

                  {/* Buttons */}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: wp('12%'),
    borderRadius: wp('24%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  image: {
    width: wp('85%'),
    height: hp('30%'),
    borderRadius: 16,
  },
  title: {
    marginTop: hp('2%'),
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  duration: {
    color: '#ccc',
    marginTop: 4,
  },
  slide: {
    flex: 1,
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
  player: {
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '60%',
  },
  playBtn: {
    backgroundColor: '#A78BFA',
    padding: 16,
    borderRadius: 50,
  },
  voiceSelector: {
    marginTop: hp('2%'),
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A78BFA',
    marginBottom: hp('5%'),
    gap: 10,
  },
  voiceText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
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
    borderWidth: 2,
    borderRadius: 999,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  voiceSlide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  voiceImg: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  voiceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 6,
  },
  voiceDesc: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },

  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
