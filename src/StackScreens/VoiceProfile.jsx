import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import Sound from 'react-native-nitro-sound';
import CustomButton from '../../src/ReuseableComponents/CustomButton';
import GradientWrapper from '../ReuseableComponents/GradientWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const left = require('../assets/Onboardingimg/VoiceLeft.png');
const right = require('../assets/Onboardingimg/VoiceRight.png');

const SavedVoicesScreen = ({ navigation }) => {
  const [voices, setVoices] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVoice, setCurrentVoice] = useState(null);
  const [duration, setDuration] = useState(1);
  const [currentPos, setCurrentPos] = useState(0);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const listenerRef = useRef(null);

  const loadVoices = async () => {
    const data = await AsyncStorage.getItem('voices');
    const parsed = data ? JSON.parse(data) : [];
    const numbered = parsed.map((item, index) => ({
      ...item,
      name: `Voice ${index + 1}`,
      date: item.date || new Date().toISOString(),
    }));
    setVoices(numbered);
  };

  useEffect(() => {
    loadVoices();

    return () => {
      try {
        Sound.stopPlayer();
        if (listenerRef.current)
          Sound.removePlayBackListener(listenerRef.current);
      } catch (e) {}
    };
  }, []);

  const onStartPlay = async filePath => {
    try {
      if (currentVoice === filePath && !isPlaying) {
        await Sound.resumePlayer();
        setIsPlaying(true);
        return;
      }

      if (currentVoice && listenerRef.current) {
        Sound.stopPlayer();
        Sound.removePlayBackListener(listenerRef.current);
      }

      await Sound.startPlayer(filePath);
      setCurrentVoice(filePath);
      setIsPlaying(true);

      listenerRef.current = Sound.addPlayBackListener(e => {
        const cp = e.currentPosition ?? 0;
        const d = e.duration ?? 1;
        setCurrentPos(cp);
        setDuration(d);

        const newProgress = d ? cp / d : 0;
        Animated.timing(progressAnim, {
          toValue: newProgress,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();

        if (d && cp >= d) {
          setIsPlaying(false);
          setCurrentVoice(null);
          progressAnim.setValue(0);
        }
      });
    } catch (err) {
      console.warn('Play error:', err);
    }
  };

  const onPausePlay = async () => {
    try {
      await Sound.pausePlayer();
      setIsPlaying(false);
    } catch (e) {}
  };

  const onSeek = async sec => {
    try {
      const newPos = Math.max(0, Math.min(currentPos + sec * 1000, duration));
      await Sound.seekToPlayer(newPos);
      setCurrentPos(newPos);

      const newProgress = duration ? newPos / duration : 0;
      Animated.timing(progressAnim, {
        toValue: newProgress,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } catch (e) {}
  };

  const deleteVoice = async index => {
    Alert.alert('Delete', 'Do you want to delete this voice', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const updatedVoices = voices.filter((_, i) => i !== index);
            setVoices(updatedVoices);
            await AsyncStorage.setItem('voices', JSON.stringify(updatedVoices));
            if (currentVoice === voices[index]?.path) {
              await Sound.stopPlayer();
              setIsPlaying(false);
              setCurrentVoice(null);
              progressAnim.setValue(0);
            }
          } catch (e) {
            console.warn('Delete error:', e);
          }
        },
      },
    ]);
  };

  const formatTime = ms => {
    const totalSec = Math.floor(ms / 1000) || 0;
    const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const formatDate = dateString => {
    const d = new Date(dateString);
    const day = d.toLocaleString('en-GB', { day: '2-digit' });
    const month = d.toLocaleString('en-GB', { month: 'short' });
    const year = d.getFullYear();
    return `Uploaded On : ${day} ${month} ${year}`;
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.voiceName}>{item.name}</Text>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
      </View>

      {currentVoice === item.path && (
        <>
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
            <Text style={styles.timerLeft}>{formatTime(currentPos)}</Text>
            <Text style={styles.timerRight}>{formatTime(duration)}</Text>
          </View>
        </>
      )}

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => onSeek(-15)}>
          <Image source={left} style={styles.leftimg} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            isPlaying && currentVoice === item.path
              ? onPausePlay()
              : onStartPlay(item.path);
          }}
          style={styles.playBtn}
        >
          <Feather
            name={isPlaying && currentVoice === item.path ? 'pause' : 'play'}
            size={RFValue(20)}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSeek(15)}>
          <Image source={right} style={styles.rightimg} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <CustomButton
        title="Delete My Voice"
        style={{
          backgroundColor: '#FFF1E4',
          marginTop: hp('1%'),
          width: wp('78%'),
          height: hp('6%'),
          marginTop: hp('3%'),
        }}
        TextStyle={{ color: '#F87171', fontSize: 14, fontWeight: '700' }}
        onPress={() => deleteVoice(index)}
      />
    </View>
  );

  return (
    <GradientWrapper>
      <View>
        <View style={styles.privacyrow}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontWeight: '700', fontSize: RFValue(12) }}>
            Voice Privacy & Control
          </Text>
        </View>

        {voices.length === 0 ? (
          <Text style={styles.noData}>No voices saved yet</Text>
        ) : (
          <FlatList
            data={voices}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: hp('7%') }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </GradientWrapper>
  );
};

export default SavedVoicesScreen;

const styles = StyleSheet.create({
  privacyrow: { flexDirection: 'row', alignItems: 'center', gap: wp('20%') },
  back: {
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
  },
  noData: {
    fontSize: RFValue(14),
    color: '#71727A',
    textAlign: 'center',
    marginTop: hp('20%'),
  },
  card: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    padding: wp('4%'),
    marginBottom: hp('3%'),
    borderRadius: wp('4%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: hp('2%'),
    borderColor: '#E8E9F1',
    borderWidth: 1,
    width: wp('87%'),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  voiceName: {
    fontSize: RFValue(16),
    color: '#1F2024',
    fontWeight: '700',
    flexShrink: 1,
  },
  dateText: { fontSize: RFValue(12), color: '#8F9098', fontWeight: '700' },
  progressWrapper: {
    position: 'relative',
    height: hp('4%'),
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  progressBar: {
    width: '100%',
    height: hp('1%'),
    backgroundColor: '#E5E7EB',
    borderRadius: wp('1.5%'),
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#A78BFA' },
  thumb: {
    position: 'absolute',
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('4%'),
    backgroundColor: '#F2F2F2',
    borderWidth: 1.5,
    borderColor: '#FFFFFF33',
    top: hp('0%'),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -wp('4%') }, { translateY: -wp('-1%') }],
  },
  innerThumb: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('2.5%'),
    backgroundColor: '#7C3AED',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    justifyContent: 'center',
    gap: wp('4'),
  },
  leftimg: { width: wp('6%'), height: hp('3%') },
  rightimg: { width: wp('6%'), height: hp('3%') },
  playBtn: {
    backgroundColor: '#A78BFA',
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
  },
  timerLeft: { fontSize: RFValue(12), color: '#A78BFA', fontWeight: '700' },
  timerRight: { fontSize: RFValue(12), fontWeight: '700', color: '#1F2024' },
});
