import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
const loginimg = require('../assets/Onboardingimg/loginimg.png');
const appleimg = require('../assets/Onboardingimg/apple.png');
const Emailimg = require('../assets/Onboardingimg/Email.png');
const googleimg = require('../assets/Onboardingimg/google.png');

const Login = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#0D0A42', '#010423', '#1E142F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 4, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,

            alignItems: 'center',
          }}
        >
          <Image source={loginimg} style={styles.img} resizeMode="contain" />
          <Text style={styles.title}>Sign in to keep</Text>
          <Text style={styles.title}>your stories safe</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.description}>
              We’ll save your voice, library and progress{' '}
            </Text>
            <Text style={styles.description}>across devices.</Text>
          </View>
          <TouchableOpacity style={styles.applebutton}>
            <Image
              source={appleimg}
              style={styles.appleimg}
              resizeMode="contain"
            />
            <Text style={styles.appleText}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googlebutton}>
            <Image
              source={googleimg}
              style={styles.googleimg}
              resizeMode="contain"
            />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Emailbutton}
            onPress={() => navigation.navigate('EnterEmailScreen')}
          >
            <Image
              source={Emailimg}
              style={styles.Emailimg}
              resizeMode="contain"
            />
            <Text style={styles.EmailText}>Continue with email</Text>
          </TouchableOpacity>
          {/* OR */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: hp('2%'),
            }}
          >
            <View style={styles.dividerline} />
            <Text
              style={{
                fontSize: RFValue(14),
                color: '#D4D6DD',
                fontWeight: '300',
                marginLeft: wp('3.5%'),
                marginRight: wp('3.5%'),
              }}
            >
              OR
            </Text>
            <View style={styles.dividerline} />
          </View>
          <TouchableOpacity style={{ marginTop: hp('2%') }}>
            <Text style={styles.demoText}>Try a 1-minute demo first</Text>
          </TouchableOpacity>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: hp('2%'),
              flexWrap: 'wrap',
            }}
          >
            <Text style={styles.lastTexts}>Private by design</Text>
            <View style={styles.dot} />
            <Text style={styles.lastTexts}>End-to-end TLS</Text>
            <View style={styles.dot} />
            <Text style={styles.lastTexts}>Cancel anytime</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: hp('2%'),
              marginTop: hp('1%'),
            }}
          >
            <Text style={styles.lastTexts}>By continuing you agree to</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              <Text style={styles.privacyText}>Terms & Privacy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;
const styles = StyleSheet.create({
  img: {
    width: wp('100%'),
    height: hp('40%'),
  },
  title: {
    fontSize: RFValue(30),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  description: {
    fontSize: RFValue(12),
    color: '#D4D6DD',
    fontWeight: '500',
    marginTop: wp('1%'),
  },
  appleimg: {
    width: wp('8%'),
    height: hp('8%'),
    marginRight: wp('3%'),
  },
  googleimg: {
    width: wp('8%'),
    height: hp('8%'),
    marginRight: wp('3%'),
  },
  Emailimg: {
    width: wp('8%'),
    height: hp('8%'),
    marginRight: wp('3%'),
  },
  applebutton: {
    width: wp('87%'),
    height: hp('6%'),
    backgroundColor: '#A78BFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    marginTop: hp('2%'),
    flexDirection: 'row',
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  googlebutton: {
    width: wp('87%'),
    height: hp('6%'),
    backgroundColor: '#FEC89A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    marginTop: hp('1%'),
    flexDirection: 'row',
    shadowColor: '#FEC89A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  Emailbutton: {
    width: wp('87%'),
    height: hp('6%'),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    marginTop: hp('1%'),
    flexDirection: 'row',
  },
  appleText: {
    fontSize: RFValue(14),
    fontWeight: '400',
    color: '#FFFFFF',
  },
  googleText: {
    fontSize: RFValue(14),
    fontWeight: '400',
    color: '#1F2024',
  },
  EmailText: {
    fontSize: RFValue(14),
    fontWeight: '400',
    color: '#FFFFFF',
  },
  dividerline: {
    backgroundColor: '#494A50',
    width: wp('36%'),
    height: hp('0.12%'),
  },
  demoText: {
    color: '#A78BFA',
    fontSize: RFValue(14),
    fontWeight: '700',
  },
  dot: {
    width: wp('1%'),
    height: wp('1%'),
    borderRadius: wp('0.8'),
    backgroundColor: '#8F9098',
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
  },
  lastTexts: {
    fontSize: RFValue(10),
    fontWeight: 'semi-bold',
    color: '#8F9098',
  },
  privacyText: {
    color: '#A78BFA',
    fontSize: RFValue(10),
    fontWeight: '600',
    marginLeft: wp('1%'),
  },
});
