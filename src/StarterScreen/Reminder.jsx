

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
              We’ll notify you 2 days before so you can
            </Text>
            <Text style={styles.Text3}>
              decide to continue or cancel. No surprises.
            </Text>
          </View>
        </View>

        {/* ============ Cards ============ */}
        <View style={{ marginTop: hp('4%') }}>
          {/* First Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selected === 'firstCard' && styles.SelectedCard,
            ]}
            onPress={() => setSelected('firstCard')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.radioOuter}>
                {selected === 'firstCard' && (
                  <View style={styles.radioInner}>
                    <View style={styles.radioInnerWhite} />
                  </View>
                )}
              </View>

              <View style={{ flexShrink: 1 }}>
                <Text
                  style={[
                    styles.cardsText,
                    selected === 'firstCard' && styles.SelectedText,
                  ]}
                >
                  Yes, remind me 2 days before my
                </Text>
                <Text
                  style={[
                    styles.cardsText,
                    selected === 'firstCard' && styles.SelectedText,
                  ]}
                >
                  trial ends.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Second Card */}
          <TouchableOpacity
            style={[
              styles.card,
              { height: hp('9%') },
              selected === 'SecondCard' && styles.SelectedCard,
            ]}
            onPress={() => setSelected('SecondCard')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.radioOuter}>
                {selected === 'SecondCard' && (
                  <View style={styles.radioInner}>
                    <View style={styles.radioInnerWhite} />
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.cardsText,
                  selected === 'SecondCard' && styles.SelectedText,
                ]}
              >
                No, I’ll remember myself.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <CustomButton
          title="Continue"
          style={{ marginBottom: hp('3%'), marginTop: hp('14%') }}
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
    width: wp('26%'),
    height: hp('14%'),
    marginTop: hp('10%'),
    
  },
  Text1: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    color: '#2F3036',
  },
  Text2: {
    fontSize: RFValue(26),
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
    height: hp('12%'),
    borderRadius: wp('4%'),
    padding: wp('5%'),
    marginBottom: hp('1.5%'),
    borderWidth: 1,
    borderColor: '#C5C6CC',
    flexDirection: 'row',
    alignItems: 'center',
  },
  SelectedCard: {
    borderColor: '#A78BFA',
    // backgroundColor: '#F3EBFF',
   backgroundColor:'rgba(154, 91, 255, 0.11)',
  },
  cardsText: {
    fontSize: RFValue(13),
    color: '#2F3036',
    fontWeight: 'bold',
  },
  SelectedText: {
    color: '#A78BFA', 
    fontWeight: '600',
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
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    backgroundColor: '#A78BFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerWhite: {
    width: wp('2.2%'),
    height: wp('2.2%'),
    borderRadius: wp('1.5%'),
    backgroundColor: '#fff',
  },
});
