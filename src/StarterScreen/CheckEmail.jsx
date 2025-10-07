import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '../ReuseableComponents/CustomButton';
const img = require('../assets/Onboardingimg/CheckEmailimg.png');

const CheckEmail = ({ route, navigation }) => {
  const { userEmail } = route.params;
  const openmailapp = async () => {
    const androidUrl = 'googlegmail://inbox';
    const iosUrl = 'googlegmail://';
    const webfallbackUrl = 'https://mail.google.com/';

    try {
      if (Platform.OS === 'android') {
        // Android
        const canOpen = await Linking.canOpenURL(androidUrl);
        if (canOpen) {
          await Linking.openURL(androidUrl);
        } else {
          await Linking.openURL(webfallbackUrl);
        }
      } else {
        // IOS
        const canOpen = await Linking.canOpenURL(iosUrl);
        if (canOpen) {
          await Linking.openURL(iosUrl);
        } else {
          await Linking.openURL(webfallbackUrl);
        }
      }
    } catch (error) {
      Alert.alert('Error,Unable to open Gmail app');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={img} style={styles.img} resizeMode="contain" />
        <Text style={styles.title}>Check your Email</Text>
        <Text style={styles.description}>We sent a link to {userEmail} </Text>
        {/* buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp('5%'),
          }}
        >
          <CustomButton
            title="Open mail app"
            onPress={openmailapp}
            style={{ width: wp('43%'), marginRight: wp('4%') }}
          />
          <CustomButton
            title="Resend in 30s"
            style={{ width: wp('43%'), backgroundColor: '#FEC89A' }}
            TextStyle={{ color: '#1F2024' }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp('2%'),
          }}
        >
          <Text
            style={{
              color: '#8F9098',
              fontSize: RFValue(13),
              fontWeight: '600',
            }}
          >
            Entered the wrong email?
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                fontSize: RFValue(13),
                color: '#A78BFA',
                fontWeight: '600',
                marginLeft: wp('1%'),
              }}
            >
              Change
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CheckEmail;
const styles = StyleSheet.create({
  img: {
    width: wp('24'),
    height: hp('12'),
    marginTop: hp('20%'),
  },
  title: {
    color: '#2F3036',
    fontSize: RFValue('16'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  description: {
    color: '#71727A',
    fontSize: RFValue(12),
    fontWeight: '600',
    marginTop: hp('2%'),
  },
});
