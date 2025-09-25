import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const img = require('../assets/Onboardingimg/cogs.png');
const lock = require('../assets/Onboardingimg/lock.png');
const ProcessingVoiceScreen = ({ route, navigation }) => {
  const { audioFile } = route.params;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('🎤 Received file from Recording screen:', audioFile);

    let interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          navigation.navigate('ClonedVoice', {
            audioFile: route.params?.audioFile,
          });
          return 100;
        }
        return prev + 20;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <View style={styles.container}>
        <Image source={img} style={styles.img} resizeMode="contain" />

        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.title}>Processing Your Voice...</Text>
        <Text style={[styles.description, { marginTop: hp('1%') }]}>
          We’re analyzing your recording to create a natural,{' '}
        </Text>
        <Text style={styles.description}>
          custom-sounding voice. This should only take a
        </Text>
        <Text style={styles.description}>moment.</Text>

        <View style={styles.lockView}>
          <Image source={lock} style={styles.lock} resizeMode="contain" />
          <Text
            style={{
              color: '#494A50',
              fontSize: RFValue(14),
              fontWeight: '400',
            }}
          >
            No voice recordings stored
          </Text>
        </View>
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

export default ProcessingVoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(20),
    color: '#1F2024',
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  description: {
    color: '#71727A',
    fontSize: RFValue(14),
    fontWeight: '400',
    marginHorizontal: wp('3%'),
    textAlign: 'center',
  },
  progressBar: {
    width: wp('80%'),
    height: hp('2%'),
    backgroundColor: '#FFFFFF',
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  progress: { height: hp('2%'), backgroundColor: '#A78BFA' },
  exitBtn: {
    width: wp('86%'),
    height: hp('6.5%'),
    borderWidth: 1.5,
    borderColor: '#F87171',
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('12%'),
    marginBottom: hp('5%'),
  },
  exitText: { fontSize: RFValue(16), color: '#E63946', fontWeight: '600' },
  img: {
    width: wp('26%'),
    height: hp('16%'),
    marginTop: hp('16%'),
  },
  lockView: {
    flexDirection: 'row',

    height: hp('5%'),
    borderRadius: wp('6%'),
    borderWidth: 1,
    borderColor: '#D4D6DD',
    marginTop: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  lock: {
    width: wp('7%'),
    height: hp('7%'),
    marginRight: wp('2%'),
  },
});
