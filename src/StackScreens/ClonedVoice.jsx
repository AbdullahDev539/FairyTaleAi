import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import Sound from 'react-native-nitro-sound';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const checkedimg = require('../assets/Onboardingimg/checked.png');
const left = require('../assets/Onboardingimg/VoiceLeft.png');
const right = require('../assets/Onboardingimg/VoiceRight.png');

const TOTAL_BARS = 40;

const ClonedVoiceScreen = ({ route, navigation }) => {
  const { audioFile } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);
  const [currentPos, setCurrentPos] = useState(0);

  const svgHeight = hp('12%');
  const barWidth = wp('2%');
  const gap = wp('1%');

  const waveform = useMemo(() => {
    const maxH = svgHeight * 0.9;
    const minH = svgHeight * 0.06;
    return Array.from({ length: TOTAL_BARS }, () =>
      Math.floor(Math.random() * (maxH - minH) + minH),
    );
  }, [svgHeight]);

  // Save audio file
  useEffect(() => {
    const saveFile = async () => {
      try {
        if (audioFile) {
          const prev = await AsyncStorage.getItem('voices');
          const voices = prev ? JSON.parse(prev) : [];
          const fileName = audioFile.split('/').pop();
          const newVoice = { name: fileName, path: audioFile };
          const updated = [...voices, newVoice];
          await AsyncStorage.setItem('voices', JSON.stringify(updated));
        }
      } catch (e) {
        console.log('Save error: ', e);
      }
    };
    saveFile();
  }, [audioFile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        Sound.stopPlayer();
        Sound.removePlayBackListener();
      } catch (e) {}
    };
  }, []);

  const onStartPlay = async () => {
    try {
      if (isPlaying) return;

      if (currentPos > 0 && currentPos < duration) {
        await Sound.resumePlayer();
      } else {
        await Sound.startPlayer(audioFile);
      }

      Sound.addPlayBackListener(e => {
        const cp = e.currentPosition ?? 0;
        const d = e.duration ?? 1;

        setCurrentPos(cp);
        setDuration(d);
        setProgress(d ? cp / d : 0);

        if (cp >= d) {
          setIsPlaying(false);
          setProgress(0);
          setCurrentPos(0);
        }
      });

      setIsPlaying(true);
    } catch (err) {
      console.warn('Play error', err);
    }
  };

  const onPausePlay = async () => {
    try {
      await Sound.pausePlayer();
    } catch (e) {}
    setIsPlaying(false);
  };

  const onSeek = async sec => {
    try {
      const newPos = Math.max(0, Math.min(currentPos + sec * 1000, duration));
      await Sound.seekToPlayer(newPos);
      setCurrentPos(newPos);
      setProgress(duration ? newPos / duration : 0);
    } catch (e) {}
  };

  // Format milliseconds to mm:ss
  const formatTime = ms => {
    const totalSec = Math.floor(ms / 1000) || 0;
    const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const centerY = svgHeight / 2;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <View style={styles.container}>
        <Image
          source={checkedimg}
          style={styles.checkedimg}
          resizeMode="contain"
        />
        <Text style={styles.title}>Your voice has been </Text>
        <Text style={styles.title}>securely cloned!</Text>
        <Text style={styles.description}>
          You can delete your voice profile anytime in
        </Text>
        <Text style={styles.description}> Settings.</Text>

        {/* Waveform */}
        <View style={styles.waveformBox}>
          <Svg height={svgHeight} width="100%">
            {waveform.map((h, i) => {
              const x = i * (barWidth + gap);
              const y = centerY - h / 2;

              const barStart = (i / waveform.length) * duration;
              const barEnd = ((i + 1) / waveform.length) * duration;

              let fillPercent = 0;
              if (currentPos >= barEnd) {
                fillPercent = 1;
              } else if (currentPos >= barStart) {
                fillPercent = (currentPos - barStart) / (barEnd - barStart);
              }

              const filledWidth = barWidth * fillPercent;

              return (
                <React.Fragment key={`bar-${i}`}>
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={h}
                    rx={wp('0.7%')}
                    fill="#D4D6DD"
                  />
                  {fillPercent > 0 && (
                    <Rect
                      x={x}
                      y={y}
                      width={filledWidth}
                      height={h}
                      rx={wp('0.7%')}
                      fill="#A78BFA"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </Svg>
        </View>

        {/* Timer */}
        <View style={styles.timerRow}>
          <Text style={styles.timerLeft}>{formatTime(currentPos)}</Text>
          <Text style={styles.timerRight}>{formatTime(duration)}</Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => onSeek(-15)}
            style={{ marginLeft: wp('25%') }}
          >
            <Image source={left} style={styles.leftimg} resizeMode="contain" />
          </TouchableOpacity>

          {isPlaying ? (
            <TouchableOpacity onPress={onPausePlay} style={styles.playBtn}>
              <Feather name="pause" size={RFValue(28)} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onStartPlay} style={styles.playBtn}>
              <Feather name="play" size={RFValue(28)} color="#fff" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => onSeek(15)}
            style={{ marginRight: wp('25%') }}
          >
            <Image
              source={right}
              style={styles.rightimg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.description, { marginTop: hp('2%') }]}>
          Here’s a preview of how your custom voice sounds. 
        </Text>
        <Text style={styles.description}>Play it back and see
          the magic.</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TrialPaywall', { type: 'upgrade' })
          }
        >
          <LinearGradient
            colors={['#FA8B8B', '#A78BFA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.probutton}
          >
            <Text style={styles.probuttonText}>
              Upgrade to PRO to use Custom Voice
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exitBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ClonedVoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF0E1',
    paddingHorizontal: wp('5%'),
  },
  checkedimg: {
    width: wp('20%'),
    height: hp('16%'),
    marginTop: hp('12%'),
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: '600',
    textAlign: 'center',
    color: '#1F2024',
  },
  description: {
    fontSize: RFValue(12),
    color: '#71727A',
    fontWeight: '400',
  },
  waveformBox: {
    width: '100%',
    marginVertical: hp('2%'),
    alignItems: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    marginBottom: hp('2%'),
  },
  leftimg: {
    width: wp('7%'),
    height: hp('7%'),
  },
  rightimg: {
    width: wp('7.5%'),
    height: hp('7.5%'),
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: wp('90%'),
    marginTop: hp('1%'),
  },
  playBtn: {
    backgroundColor: '#A78BFA',
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitBtn: {
    width: wp('86%'),
    height: hp('6.5%'),
    borderWidth: 1.5,
    borderColor: '#F87171',
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  exitText: {
    fontSize: RFValue(16),
    color: '#E63946',
    fontWeight: '600',
  },
  probutton: {
    width: wp('86%'),
    height: hp('7%'),
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
    paddingHorizontal: wp('1%'),
  },
  probuttonText: {
    fontSize: RFValue(14),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  timerLeft:{
     color:'#A78BFA',
      fontSize:RFValue(13),
      fontWeight:'bold',
  },
  timerRight:{
      color: '#1F2024',
        fontSize:RFValue(13),
      fontWeight:'bold',
  }
});
