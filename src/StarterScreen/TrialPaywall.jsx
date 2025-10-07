import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import StarsScreen from '../ReuseableComponents/StarsScreen';
import { Shadow } from 'react-native-shadow-2';

const TrialPaywall = ({ navigation, route }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const type = route?.params?.type || 'Trial';

  const handleContinue = async () => {
    if (type === 'upgrade') {
      navigation.replace('BottomTab');
    } else {
      navigation.navigate('Reminder');
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <StarsScreen>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp('10%'),
            }}
          >
            <Text style={styles.Text1}>Try Fairy Tales AI</Text>
            <Text style={styles.Text2}>Free for 7 Days</Text>
            <View style={{ marginTop: hp('1%') }}>
              <Text style={styles.Text3}>
                Unlimited bedtime stories, calming voices,
              </Text>
              <Text style={styles.Text3}>
                and magical moments. Cancel anytime.
              </Text>
            </View>
          </View>

          {/* Annual Plan Card */}
          <View style={{ alignItems: 'center', marginTop: hp('4%') }}>
            {selectedPlan === 'annual' ? (
              <Shadow
                distance={9}
                startColor={'rgba(167,139,250,0.5)'}
                offset={[0, 0]}
                radius={wp('4%')}
              >
                <TouchableOpacity
                  style={[styles.card, styles.selectedCard]}
                  onPress={() => setSelectedPlan('annual')}
                  activeOpacity={0.9}
                >
                  <View style={styles.row}>
                    <View style={styles.radioOuter}>
                      {selectedPlan === 'annual' && (
                        <View style={styles.radioInner}>
                          <View style={styles.radioInnerWhite} />
                        </View>
                      )}
                    </View>
                    <View>
                      <Text style={styles.planTitle}>Annual Plan</Text>
                      <Text style={styles.planSub}>Best Value – Save 40%</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.price}>€99/year</Text>
                    <Text style={styles.aftertrial}>After trial</Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
            ) : (
              <TouchableOpacity
                style={[styles.card]}
                onPress={() => setSelectedPlan('annual')}
                activeOpacity={0.9}
              >
                <View style={styles.row}>
                  <View style={styles.radioOuter} />
                  <View>
                    <Text style={styles.planTitle}>Annual Plan</Text>
                    <Text style={styles.planSub}>Best Value – Save 40%</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.price}>€99/year</Text>
                  <Text style={styles.aftertrial}>After trial</Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Monthly Plan Card */}
            {selectedPlan === 'monthly' ? (
              <Shadow
                distance={7}
                startColor={'rgba(167,139,250,0.5)'}
                offset={[0, 0]}
                radius={wp('4%')}
              >
                <TouchableOpacity
                  style={[styles.card, styles.selectedCard]}
                  onPress={() => setSelectedPlan('monthly')}
                  activeOpacity={0.9}
                >
                  <View style={styles.row}>
                    <View style={styles.radioOuter}>
                      {selectedPlan === 'monthly' && (
                        <View style={styles.radioInner}>
                          <View style={styles.radioInnerWhite} />
                        </View>
                      )}
                    </View>
                    <View>
                      <Text style={styles.planTitle}>Monthly Plan</Text>
                      <Text style={styles.planSub}>Save 10%</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.price}>€9.99/month</Text>
                    <Text style={styles.aftertrial}>After trial</Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
            ) : (
              <TouchableOpacity
                style={[styles.card]}
                onPress={() => setSelectedPlan('monthly')}
                activeOpacity={0.9}
              >
                <View style={styles.row}>
                  <View style={styles.radioOuter} />
                  <View>
                    <Text style={styles.planTitle}>Monthly Plan</Text>
                    <Text style={styles.planSub}>Save 10%</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.price}>€9.99/month</Text>
                  <Text style={styles.aftertrial}>After trial</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Continue Button */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp('14%'),
            }}
          >
            <CustomButton
              title="Continue with Apple Pay"
              disabled={!selectedPlan}
              onPress={() => handleContinue()}
            />
            <Text style={styles.lastText}>
              No charge today. Cancel anytime before your trial ends.
            </Text>
          </View>
        </View>
      </StarsScreen>
    </ScrollView>
  );
};

export default TrialPaywall;

const styles = StyleSheet.create({
  imgback: {
    width: wp('100%'),
    height: hp('100%'),
  },
  Text1: {
    fontSize: RFValue(30),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  Text2: {
    fontSize: RFValue(29),
    fontWeight: '600',
    color: '#A78BFA',
  },
  Text3: {
    fontSize: RFValue(14),
    color: '#E8E9F1',
    fontWeight: '300',
  },
  aftertrial: {
    fontSize: RFValue(10),
    color: 'white',
    fontWeight: '300',
  },
  card: {
    backgroundColor: '#182848',
    width: wp('86%'),
    height: hp('12%'),
    borderRadius: wp('4%'),
    padding: wp('5%'),
    marginBottom: hp('2%'),
    borderWidth: 0.5,
    borderColor: '#C5C6CC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#1E1E1E',
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  radioInner: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    backgroundColor: '#1F2024',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerWhite: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    backgroundColor: '#fff',
  },
  planTitle: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#fff',
  },
  planSub: {
    fontSize: RFValue(10),
    color: '#FEC89A',
  },
  price: {
    fontSize: RFValue(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  lastText: {
    fontSize: RFValue(10),
    color: '#C5C6CC',
    fontWeight: '300',
    marginTop: hp('2%'),
  },
});
