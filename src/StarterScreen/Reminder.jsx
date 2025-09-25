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
import CustomButton from '../ReuseableComponents/CustomButton';
import { RFValue } from 'react-native-responsive-fontsize';
const Reminderimg = require('../assets/Onboardingimg/confetti.png');
const Reminder = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={Reminderimg} style={styles.img} resizeMode="contain" />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.Text1}>Want a reminder </Text>
          <Text style={styles.Text2}>before your trial ends?</Text>
          <View style={{ marginTop: hp('1.5%') }}>
            <Text style={styles.Text3}>
              We’ll notify you 2 days before so you can{''}
            </Text>
            <Text style={styles.Text3}>
              decide to continue or cancel. No surprises.
            </Text>
          </View>
        </View>

        <View style={{ marginTop: hp('4%') }}>
          <TouchableOpacity
            style={[
              styles.card,
              selected === 'firstCard' && styles.SelectedCard,
            ]}
            onPress={() => setSelected('firstCard')}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.radioOuter}>
                {selected === 'firstCard' && (
                  <View style={styles.radioInner}>
                    <View style={styles.radioInnerWhite} />
                  </View>
                )}
              </View>
              <Text style={styles.cardsText}>
                Yes, remind me 2 days before my trial ends.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.card,
              { height: hp('10%') },
              selected === 'SecondCard' && styles.SelectedCard,
            ]}
            onPress={() => setSelected('SecondCard')}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.radioOuter}>
                {selected === 'SecondCard' && (
                  <View style={styles.radioInner}>
                    <View style={styles.radioInnerWhite} />
                  </View>
                )}
              </View>
              <Text style={styles.cardsText}>No, I’ll remember myself.</Text>
            </View>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Continue"
          style={{ marginBottom: hp('3%'), marginTop: hp('10%') }}
          disabled={!selected}
          onPress={() => navigation.navigate('TrialConfirmation')}
        />
      </View>
    </ScrollView>
  );
};

export default Reminder;
const styles = StyleSheet.create({
  img: {
    width: wp('20%'),
    height: hp('20%'),
    marginTop: hp('5%'),
  },
  Text1: {
    fontSize: RFValue(28),
    fontWeight: '600',
    color: '#2F3036',
  },
  Text2: {
    fontSize: RFValue(28),
    fontWeight: '600',
    color: '#A78BFA',
  },
  Text3: {
    fontSize: RFValue(14),
    color: '#71727A',
    fontWeight: '300',
  },
  card: {
    width: wp('86%'),
    height: hp('13%'),
    borderRadius: wp('4%'),
    padding: wp('5%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#C5C6CC',
    flexDirection: 'row',

    alignItems: 'center',
  },
  SelectedCard: {
    borderColor: '#9A5BFF',
    backgroundColor: '#F3EBFF',
  },
  radioOuter: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    borderWidth: 2,
    borderColor: '#E8E9F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  radioInner: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    borderRadius: wp('2%'),
    backgroundColor: '#9A5BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerWhite: {
    width: wp('1.8%'),
    height: wp('1.8%'),
    borderRadius: wp('1%'),
    backgroundColor: '#fff',
  },
  cardsText: {
    fontSize: RFValue(12),
    fontWeight: '400',
    color: '#2F3036',
  },
});
