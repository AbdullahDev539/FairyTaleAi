import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '../../src/ReuseableComponents/CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
const img1 = require('../assets/Onboardingimg/EnterEmailimg.png');

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email address')
    .required('Email is required'),
});
const EnterEmailScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={img1} style={styles.img1} resizeMode="contain" />
        <Text style={styles.title}>Enter your Email</Text>
        <Text style={[styles.description, { marginTop: hp('2%') }]}>
          We’ll send a sign-in link that{' '}
        </Text>
        <Text style={styles.description}>works for 15 minutes.</Text>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            navigation.navigate('CheckEmail', { userEmail: values.email });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Text style={styles.label}>Email Address</Text>
              <LinearGradient
                colors={['#FA8B8B', '#A78BFA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <View style={styles.inputContainer}>
                  <Icon
                    name="email"
                    size={24}
                    color="#FA8B8B"
                    style={{ marginLeft: wp('4%') }}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Email"
                    keyboardType="email-address"
                    placeholderTextColor="#71727A"
                    autoCapitalize="none"
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                  />
                </View>
              </LinearGradient>

              {/* Error Message */}
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <CustomButton
                onPress={handleSubmit}
                title="Send magic link"
                style={{ marginTop: hp('1.7%') }}
              />
              {/* DividerLine */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: hp('1%'),
                }}
              >
                <View style={styles.dividerline} />
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: '#71727A',
                    fontWeight: 'semi-bold',
                    marginLeft: wp('2.5%'),
                    marginRight: wp('2.5%'),
                  }}
                >
                  OR
                </Text>
                <View style={styles.dividerline} />
              </View>
              {/* Code button */}
              <CustomButton
                title="Use a 6-digit code instead"
                style={{
                  backgroundColor: '#FEC89A',
                  marginTop: hp('1.5%'),
                  marginBottom: hp('2%'),
                }}
                TextStyle={{ color: '#1F2024' }}
                onPress={() => {
                  if (values.email && !errors.email) {
                    navigation.navigate('EnterCodeScreen', {
                      userEmail: values.email,
                    });
                  }
                }}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default EnterEmailScreen;
const styles = StyleSheet.create({
  img1: {
    width: wp('24'),
    height: hp('12'),
    marginTop: hp('16%'),
  },
  title: {
    color: '#2F3036',
    fontSize: RFValue(28),
    fontWeight: '800',
  },
  description: {
    color: '#71727A',
    fontSize: RFValue(16),
    fontWeight: '400',
  },
  gradientBorder: {
    width: wp('86%'),
    height: hp('7%'),
    borderRadius: wp('3%'),
    padding: 2,
    marginTop: hp('1%'),
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF0E1',
    borderRadius: wp('3%'),
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    marginLeft: wp('2%'),
  },

  error: {
    color: 'red',
    fontSize: RFValue(12),
    marginTop: hp('1%'),
    alignSelf: 'flex-start',
    marginLeft: wp('7%'),
  },
  dividerline: {
    backgroundColor: '#C5C6CC',
    width: wp('36%'),
    height: hp('0.2%'),
  },
  label: {
    color: '#2F3036',
    fontSize: RFValue(14),
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: wp('7%'),
    marginTop: hp('3%'),
  },
});
