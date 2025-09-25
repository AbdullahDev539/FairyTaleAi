import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
const backbutton = require('../assets/Onboardingimg/LeftButton.png');
const lockcircle = require('../assets/Onboardingimg/lock-circle.png');
const lock = require('../assets/Onboardingimg/lock.png');

const CreateVoice = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <ScrollView>
        <StatusBar barStyle={'dark-content'} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={backbutton}
              style={styles.arrowimg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            source={lockcircle}
            style={styles.lockcircle}
            resizeMode="contain"
          />
        </View>
        <View style={{ paddingHorizontal: wp('4%') }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp('8%'),
            }}
          >
            <View style={styles.micView}>
              <Ionicons name="mic" size={24} color="#A78BFA" />
              <Text
                style={{
                  color: '#A78BFA',
                  fontSize: RFValue(10),
                  fontWeight: '600',
                }}
              >
                1–2 min recording
              </Text>
            </View>
            <Text style={[styles.title, { marginTop: hp('0.5%') }]}>
              Create Your
            </Text>
            <Text style={styles.title}>Custom Voice</Text>
            <Text style={[styles.description, { marginTop: hp('0.5') }]}>
              Read a few short prompts to help us capture your
            </Text>
            <Text style={styles.description}>
              unique tone and style. It only takes 1–2 minutes,
            </Text>
            <Text style={styles.description}>
              and you’ll be able to preview how your custom
            </Text>
            <Text style={styles.description}>voice sounds.</Text>
            <View
              style={{
                flexDirection: 'row',

                marginTop: hp('3%'),
                paddingLeft: wp('5%'),
                gap: 14,
                marginLeft: wp('2%'),
              }}
            >
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: checked ? '#A78BFA' : '#FAF0E1',
                  },
                ]}
                onPress={() => setChecked(!checked)}
              >
                {checked && (
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                )}
              </TouchableOpacity>

              <Text style={styles.checkboxText}>
                I agree to the{' '}
                <Text style={{ color: '#A78BFA' }}>processing</Text> of my voice
                for
                <Text style={{ color: '#A78BFA' }}>
                  {' '}
                  bedtime story generation
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp('9%'),
              marginHorizontal: wp('5%'),
            }}
          >
            <TouchableOpacity
              style={[
                styles.micbutton,
                { backgroundColor: checked ? '#A78BFA' : '#C5C6CC' },
              ]}
              disabled={!checked}
              onPress={() => navigation.navigate('RecordingVoice')}
            >
              <Ionicons name="mic" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: hp('1%'),
                fontSize: RFValue(20),
                fontWeight: 'bold',
                color: '#1F2024',
              }}
            >
              00:00
            </Text>
            <View style={styles.lockView}>
              <Image source={lock} style={styles.lock} resizeMode="contain" />
              <Text
                style={{
                  color: '#494A50',
                  fontSize: RFValue(10),
                  fontWeight: '400',
                  marginTop: hp('1%'),
                }}
              >
                Private and secure
              </Text>
            </View>
            <Text
              style={{
                color: '#8F9098',
                fontSize: RFValue(10),
                fontWeight: 'semi-bold',
                marginTop: hp('1.5%'),
              }}
            >
              Your voice recording is not stored. Only a voice
            </Text>

            <Text
              style={{
                color: '#8F9098',
                fontSize: RFValue(10),
                fontWeight: 'semi-bold',
                marginBottom: hp('2%'),
              }}
            >
              fingerprint is used to generate stories.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateVoice;
const styles = StyleSheet.create({
  backbutton: {
    backgroundColor: '#FFFFFF',
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('5%'),
  },
  arrowimg: {
    width: wp('6%'),
    height: hp('6%'),
  },
  lockcircle: {
    width: wp('11%'),
    height: hp('11%'),
    marginRight: wp('5%'),
  },
  micView: {
    width: wp('40%'),
    height: hp('4%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    borderColor: '#A78BFA',
    borderWidth: 1.5,
    marginTop: hp('6%'),
  },
  title: {
    fontSize: RFValue(30),
    fontWeight: 'bold',
    color: '#1F2024',
  },
  description: {
    color: '#494A50',
    fontSize: RFValue(11),
    fontWeight: 'semi-bold',
  },
  checkbox: {
    width: wp('8%'),
    height: hp('4%'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C5C6CC',
  },
  checkboxText: {
    color: '#8F9098',
    fontSize: RFValue(12),
    fontWeight: '500',
  },
  micbutton: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockView: {
    flexDirection: 'row',
    width: wp('44%'),
    height: hp('4.5%'),
    borderRadius: wp('6%'),
    borderWidth: 1,
    borderColor: '#D4D6DD',
    marginTop: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lock: {
    width: wp('6%'),
    height: hp('6%'),
    marginRight: wp('2%'),
  },
});
