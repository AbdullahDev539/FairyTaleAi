import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../StackScreens/Profile';
import PrivacyPolicy from '../StackScreens/PrivacyPolicy';
import VoiceProfile from '../StackScreens/VoiceProfile';
const ProfileStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="VoiceProfile" component={VoiceProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
