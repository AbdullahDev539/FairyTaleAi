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
      <StatusBar barStyle={'light-content'} />
      <StarsScreen>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ alignItems: 'center', marginTop: hp('4%') }}>
            <Text style={styles.Text1}>Try Fairy Tales AI</Text>
            <Text style={styles.Text2}>Free for 7 Days</Text>
            <View style={{ marginTop: hp('1%') }}>
              <Text style={styles.Text3}>
                Unlimited bedtime stories, calming voices,{' '}
              </Text>
              <Text style={styles.Text3}>
                and magical moments. Cancel anytime.
              </Text>
            </View>
          </View>
          {/* Annual Plan Card */}
          <View style={{ alignItems: 'center', marginTop: hp('4%') }}>
            <TouchableOpacity
              style={[
                styles.card,
                selectedPlan === 'annual' && styles.selectedCard,
              ]}
              onPress={() => setSelectedPlan('annual')}
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

            {/* Monthly Plan Card */}
            <TouchableOpacity
              style={[
                styles.card,
                selectedPlan === 'monthly' && styles.selectedCard,
              ]}
              onPress={() => setSelectedPlan('monthly')}
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
          </View>
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
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  Text2: {
    fontSize: RFValue(26),
    fontWeight: '600',
    color: '#A78BFA',
  },
  Text3: {
    fontSize: RFValue(12),
    color: '#E8E9F1',
    fontWeight: '300',
  },
  aftertrial: {
    fontSize: RFValue(10),
    color: 'white',
    fontWeight: '300',
  },
  card: {
    backgroundColor: '#1C1C70',
    width: wp('86%'),
    height: hp('14%'),
    borderRadius: wp('4%'),
    padding: wp('5%'),
    marginBottom: hp('1%'),
    borderWidth: 1,
    borderColor: '#444',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#9A5BFF',
    shadowColor: '#9A5BFF',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    borderWidth: 2,
    borderColor: '#fff',
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
