import { ImageBackground } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const StarsScreen = ({
  children,
  colors = ['#1B1F3B', '#2E3A65', '#182848'],
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require('../assets/stars.png')}
        style={{ flex: 1, width: wp('100%'), height: hp('100%') }}
         blurRadius={2}
      >
        {children}
      </ImageBackground>
    </LinearGradient>
  );
};

export default StarsScreen;
