import React from 'react';
import { View, Text } from 'react-native';
import { useApp } from '../Context/RainbowProgress';
import Svg, { Path } from 'react-native-svg';

const HalfCircleProgress = () => {
  const { playsUsed } = useApp();
  const progress = playsUsed / 4;

  const radius = 100;
  const circumference = Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="56" width="56" viewBox="0 0 160 80">
        <Path
          d="M10,70 A70,70 0 0,1 150,70"
          stroke="#ddd"
          strokeWidth="15"
          fill="none"
        />

        <Path
          d="M10,70 A70,70 0 0,1 150,70"
          stroke="#A78BFA"
          strokeWidth="15"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>

      <View
        style={{
          position: 'absolute',
          top: 30,
          alignSelf: 'center',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#A78BFA' }}>
          {playsUsed}/3
        </Text>
      </View>
    </View>
  );
};

export default HalfCircleProgress;
