import React from 'react';
import { View, Text } from 'react-native';
import { useApp } from '../Context/RainbowProgress';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Svg, { Path } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';

const HalfCircleProgress = () => {
  const { playsUsed } = useApp();
  const progress = playsUsed / 4;

  const radius = 100;
  const circumference = Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="60" width="60" viewBox="0 0 170 90">
        <Path
          d="M10,70 A70,70 0 0,1 150,70"
          stroke="#ddd"
          strokeWidth="20"
          fill="none"
           strokeLinecap="round"
        />

        <Path
          d="M10,70 A70,70 0 0,1 150,70"
          stroke="#A78BFA"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>

      <View
        style={{
          position: 'absolute',
          top: hp('3%'),
          alignSelf: 'center',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#A78BFA' }}>
          {playsUsed}/3
        </Text>
        
      </View>
       <View   style={{
          position: 'absolute',
          top: hp('5.6%'),
          alignSelf: 'center',
        }} >
       <Text style={{fontSize:RFValue(11),fontWeight: 'bold'}} >Free plays</Text>
       </View>
    </View>
  );
};

export default HalfCircleProgress;
