import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const readingbook = require('../assets/Generate/reading.png');
const magicwand = require('../assets/Generate/magicwand.png');

const GenerateScreen = () => {
  const [form, setForm] = useState({
    childName: '',
    animalName: '',
    storytheme: '',
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FAF0E1' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('6'),
        }}
      >
        <View style={{ marginTop: hp('3%') }}>
          <Image
            source={readingbook}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Personalized Storytime</Text>
        <Text style={[styles.description,{marginTop: hp('1%')}]}>
          Create magical stories featuring your child’s name,
        </Text>
        <Text style={styles.description}> favorite animal,
          and theme.</Text>

        <Text style={styles.label}>Child Name</Text>
        <LinearGradient
          colors={['#FA8B8B', '#A78BFA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/Generate/Baby.png')}
              style={styles.inputImage}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor="#71727A"
              value={form.childName}
              onChangeText={text => setForm({ ...form, childName: text })}
            />
          </View>
        </LinearGradient>

        <Text style={styles.label}>Favourite Animal</Text>
        <LinearGradient
          colors={['#FA8B8B', '#A78BFA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/Generate/Dog.png')}
              style={styles.inputImage}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Favourite Animal"
              placeholderTextColor="#71727A"
              value={form.animalName}
              onChangeText={text => setForm({ ...form, animalName: text })}
            />
          </View>
        </LinearGradient>

        <Text style={styles.label}>Story Theme</Text>
        <LinearGradient
          colors={['#FA8B8B', '#A78BFA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/Generate/Moon.png')}
              style={styles.inputImage}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Story Theme"
              placeholderTextColor="#71727A"
              value={form.storytheme}
              onChangeText={text => setForm({ ...form, storytheme: text })}
            />
          </View>
        </LinearGradient>

        <View style={styles.comingContainer}>
          <View style={styles.comingContent}>
            <Image
              source={magicwand}
              style={{
                width: wp('12%'),
                height: hp('6%'),
                marginLeft: wp('2%'),
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: '#2F3036',
                  fontWeight: '700',
                }}
              >
                Coming Soon
              </Text>
              <Text
                style={{
                  fontSize: RFValue(10),
                  fontWeight: '400',
                  color: '#494A50',
                }}
              >
                Personalized stories in your child’s name!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.generatebutton}>
          <BlurView
            style={styles.blurBackground}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <Ionicons
            name="lock-closed"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={{ color: '#FFFFFF', fontSize: RFValue(14) }}>
            Generate Story
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default GenerateScreen;

const styles = StyleSheet.create({
  image: {
    width: wp('30%'),
    height: hp('10%'),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: '700',
    color: '#1F2024',
    marginTop: hp('1%'),
    textAlign: 'center',
  },
  description: {
    color: '#71727A',
    fontSize: RFValue(13),
    
    fontWeight: 400,
    textAlign: 'center',
  },
  gradientBorder: {
    width: wp('85%'),
    height: hp('6%'),
    borderRadius: wp('4%'),
    padding: wp('0.5%'),
    marginTop: hp('1%'),
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: RFValue(12),
    marginLeft: wp('2%'),
    fontWeight: '400',
  },
  inputImage: {
    width: wp('7%'),
    height: hp('7%'),
    resizeMode: 'contain',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF0E1',
    borderRadius: wp('4%'),
    paddingHorizontal: wp('3%'),
  },
  label: {
    color: '#1F2024',
    fontSize: RFValue(12),
    fontWeight: '700',
    marginTop: hp('2%'),
    alignSelf: 'flex-start',
    marginLeft: wp('8%'),
  },
  comingContainer: {
    width: wp('94%'),
    height: hp('8%'),
    borderRadius: wp('8%'),
    padding: wp('3%'),
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
  },
  comingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    paddingHorizontal: wp('1%'),
    gap: 14,
  },

  generatebutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp('24%'),
    overflow: 'hidden',
    width: wp('88%'),
    height: hp('6%'),
    backgroundColor: '#A78BFA',
  },

  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    marginBottom: hp('3%'),
    backgroundColor: 'rgba(167, 139, 250, 0.3)',
    height: hp('100%'),
  },
});
