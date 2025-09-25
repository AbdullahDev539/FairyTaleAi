import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Animated,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import Svg, { Rect } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-nitro-sound';
import RNFS from 'react-native-fs';
const waveform = require('../assets/wave.png');

async function requestAudioPermission() {
  if (Platform.OS === 'android') {
    try {
      const micPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (micPermission === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          'Permission Required',
          'Please allow microphone access from settings.',
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}

const useSoundRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [metering, setMetering] = useState(undefined);
  const [currentTime, setCurrentTime] = useState(0);
  const [filePath, setFilePath] = useState(null);

  const startRecording = async () => {
    const path = `${RNFS.DocumentDirectoryPath}/recording_${Date.now()}.m4a`;
    console.log('🎤 Starting Recording at:', path);

    const file = await Sound.startRecorder(path);
    setFilePath(file);
    setIsRecording(true);
    setIsPaused(false);

    Sound.addRecordBackListener(e => {
      console.log('🎤 Recorder Data:', e);
      if (e.currentMetering !== undefined) setMetering(e.currentMetering);
      if (e.currentPosition !== undefined) setCurrentTime(e.currentPosition);
    });

    return file;
  };

  const pauseRecording = async () => {
    await Sound.pauseRecorder();
    setIsPaused(true);
  };

  const resumeRecording = async () => {
    await Sound.resumeRecorder();
    setIsPaused(false);
  };

  const stopRecording = async () => {
    const file = await Sound.stopRecorder();
    setIsRecording(false);
    setIsPaused(false);
    Sound.removeRecordBackListener();
    return file;
  };

  return {
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    isRecording,
    isPaused,
    metering,
    currentTime,
    filePath,
  };
};

const RecordingVoice = ({ navigation }) => {
  const {
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    isRecording,
    isPaused,
    metering,
    currentTime,
  } = useSoundRecorder();

  const [levels, setLevels] = useState([]);
  const [recordedFile, setRecordedFile] = useState(null);

  const opacityAnim = useRef(new Animated.Value(0)).current;

  // fade animation
  useEffect(() => {
    if (isRecording && !isPaused) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [isRecording, isPaused]);

  // convert millisecond to minute:second
  const formatTime = ms => {
    const totalSec = Math.floor(ms / 1000);
    const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const sec = String(totalSec % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  // Cancel Button
  const handleCancel = async () => {
    if (isRecording || isPaused) {
      await stopRecording();
    }
    setRecordedFile(null);
    setLevels([]);
  };

  // Done Button
  const handleDone = async () => {
    let file = recordedFile;
    if (isRecording || isPaused) {
      file = await stopRecording();
      setRecordedFile(file);
    }

    if (file) {
      navigation.navigate('ProcessingVoiceScreen', { audioFile: file });
    } else {
      Alert.alert('No Recording', 'Please record something first.');
    }
  };

  // Mic Button
  const handleMicPress = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) return;

    if (!isRecording) {
      const file = await startRecording();
      setRecordedFile(file);
    } else if (!isPaused) {
      await pauseRecording();
    } else {
      await resumeRecording();
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.micView}>
            <Ionicons name="mic" size={28} color="#A78BFA" />
            <Text
              style={{
                color: '#A78BFA',
                fontSize: RFValue(14),
                fontWeight: '600',
              }}
            >
              1–2 min recording
            </Text>
          </View>
          <Text style={[styles.firstText, { marginTop: hp('2%') }]}>
            Hello, my name is John
          </Text>
          <Text style={styles.firstText}>and I love learning new</Text>
          <Text style={styles.firstText}>things.</Text>
          <Text style={[styles.secondText, { marginTop: hp('3%') }]}>
            The quick brown fox
          </Text>
          <Text style={styles.secondText}>jumps over the lazy dog.</Text>
          <Text style={[styles.ThirdText, { marginTop: hp('3%') }]}>
            Can you believe how{' '}
          </Text>
          <Text style={styles.ThirdText}>
            amazing today’s
            <Text style={styles.ThirdText}>weather is?</Text>
          </Text>
        </View>

        {/* WaveForm */}
        <ImageBackground
          source={waveform}
          resizeMode="cover"
          style={{ marginTop: hp('17%') }}
        >
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {/* Left Undo */}
            <TouchableOpacity style={styles.leftbutton} onPress={handleCancel}>
              <Feather name="rotate-ccw" size={24} color="black" />
            </TouchableOpacity>

            {/* Mic button */}
            <View>
              <TouchableOpacity
                style={styles.micbutton}
                onPress={handleMicPress}
              >
                <Feather
                  name={!isRecording ? 'mic' : isPaused ? 'play' : 'pause'}
                  size={32}
                  color="#fff"
                />
              </TouchableOpacity>
              <Text style={styles.TimerText}>
                {isRecording || isPaused ? formatTime(currentTime) : '00:00'}
              </Text>
            </View>

            {/* Right Done */}
            <TouchableOpacity style={styles.rightbutton} onPress={handleDone}>
              <View style={styles.checkbox} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default RecordingVoice;

const styles = StyleSheet.create({
  micView: {
    width: wp('60%'),
    height: hp('5.5%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    borderColor: '#A78BFA',
    borderWidth: 1.5,
    marginTop: hp('10%'),
  },
  waveform: {
    position: 'absolute',
    marginTop: hp('16%'),
    left: wp('7%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp('8%'),
    marginBottom: hp('3%'),
  },
  leftbutton: {
    backgroundColor: '#FFFFFF',
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  micbutton: {
    backgroundColor: '#A78BFA',
    width: wp('17%'),
    height: wp('17%'),
    borderRadius: wp('8.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
  },
  rightbutton: {
    backgroundColor: '#F87171',
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: wp('6%'),
    height: hp('3%'),

    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  TimerText: {
    color: '#1F2024',
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    textAlign: 'center',
  },
  firstText: {
    fontSize: RFValue(24),
    fontWeight: '600',
    color: '#8F9098',
  },
  secondText: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: '#1F2024',
  },
  ThirdText: {
    fontSize: RFValue(24),
    fontWeight: '600',
    color: '#71727A',
  },
});
