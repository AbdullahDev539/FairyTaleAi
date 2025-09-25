import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../ReuseableComponents/CustomButton';
import { RFValue } from 'react-native-responsive-fontsize';
const img = require('../assets/Onboardingimg/buke.png');
const TrialConfirmation = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: hp('24%'),
        backgroundColor: '#FAF0E1',
      }}
    >
      <Image source={img} style={styles.img} resizeMode="contain" />

      <View style={{ alignItems: 'center' }}>
        <Text style={styles.Text1}>Your free trial</Text>
        <Text style={styles.Text2}>has started</Text>
        <View style={{ marginTop: hp('1%') }}>
          <Text style={styles.Text3}>Welcome to Fairy Tales AI </Text>
          <Text style={styles.Text3}>bedtime just got magical.</Text>
        </View>
      </View>
      <CustomButton
        title="Explore Stories"
        onPress={() => navigation.navigate('Login')}
        style={{ marginTop: hp('20%') }}
      />
    </View>
  );
};

export default TrialConfirmation;
const styles = StyleSheet.create({
  img: {
    width: wp('30%'),
    height: hp('20%'),
    alignSelf: 'center',
  },
  Text1: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    color: '#2F3036',
  },
  Text2: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    color: '#A78BFA',
  },
  Text3: {
    fontSize: RFValue(16),
    color: '#71727A',
    fontWeight: 'semi-bold',
  },
});
