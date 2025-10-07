import {
  View,
  Text,
  Image,
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
import { RFValue } from 'react-native-responsive-fontsize';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CustomButton from '../ReuseableComponents/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
const lockimg = require('../assets/Onboardingimg/EnterCodeimg.png');

const Cell_Count = 6;
const EnterCodeScreen = ({ route, navigation }) => {
  const { userEmail } = route.params;
  const [value, setValue] = useState('');

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={lockimg} style={styles.img} resizeMode="contain" />
        <Text style={styles.title}>Enter 6-digit code</Text>
        <Text style={[styles.description, { marginTop: hp('1%') }]}>
          A 6-digit code was sent to{' '}
        </Text>
        <Text style={styles.description}>{userEmail}</Text>
        <CodeField
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={Cell_Count}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          rootStyle={styles.codeFieldroot}
          renderCell={({ index, symbol, isFocused }) => (
            <LinearGradient
              key={index}
              colors={
                isFocused ? ['#FA8B8B', '#A78BFA'] : ['#C5C6CC', '#C5C6CC']
              } // gradient when focused, gray when not
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBorder}
            >
              <View
                style={styles.innerCell}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text style={[styles.cellText, isFocused && styles.focusText]}>
                  {isFocused ? <Cursor /> : symbol}
                </Text>
              </View>
            </LinearGradient>
          )}
        />

        <TouchableOpacity style={{ marginTop: hp('8%') }}>
          <Text
            style={{
              color: '#A78BFA',
              fontWeight: 'bold',
              fontSize: RFValue(14),
            }}
          >
            Resend code
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="Enter Code"
          onPress={() => navigation.navigate('BottomTab')}
          style={{
            backgroundColor: '#A78BFA',
            marginTop: hp('4%'),
            marginBottom: hp('2%'),
          }}
        />
      </View>
    </ScrollView>
  );
};

export default EnterCodeScreen;
const styles = StyleSheet.create({
  img: {
    width: wp('20%'),
    height: hp('14%'),
    marginTop: hp('10%'),
  },
  title: {
    fontSize: RFValue(26),
    fontWeight: 'bold',
    color: '#2F3036',
  },
  description: {
    fontSize: RFValue(13),
    fontWeight: '500',
    color: '#71727A',
  },
  codeFieldroot: {
    flexDirection: 'row',
    marginTop: hp('6%'),
  },
  gradientBorder: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('2.5%'),
    padding: 2,
    marginHorizontal: wp('2%'),
  },
  innerCell: {
    flex: 1,
    borderRadius: wp('2.5%'),
    backgroundColor: '#FAF0E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: '#1F2024',
    fontSize: RFValue(18),
    textAlign: 'center',
    fontWeight: '600',
  },
  focusText: {
    color: '#FA8B8B',
  },
});
