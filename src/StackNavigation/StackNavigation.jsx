import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrialPaywall from '../StarterScreen/TrialPaywall';
import Reminder from '../StarterScreen/Reminder';
import TrialConfirmation from '../StarterScreen/TrialConfirmation';
import BottomTab from '../Components/BottomTab';
import Login from '../StarterScreen/Login';
import EnterEmailScreen from '../StarterScreen/EnterEmailScreen';
import CheckEmail from '../StarterScreen/CheckEmail';
import EnterCodeScreen from '../StarterScreen/EnterCodeScreen';
import { FavoritesProvider } from '../Context/FavoritesContext';
import PrivacyPolicy from '../StackScreens/PrivacyPolicy';
import OnboardingScreen from '../StarterScreen/OnboardingScreen';
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <FavoritesProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="Reminder" component={Reminder} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EnterEmailScreen" component={EnterEmailScreen} />
        <Stack.Screen name="CheckEmail" component={CheckEmail} />
        <Stack.Screen name="EnterCodeScreen" component={EnterCodeScreen} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="TrialConfirmation" component={TrialConfirmation} />
        <Stack.Screen name="TrialPaywall" component={TrialPaywall} />
      </Stack.Navigator>
    </FavoritesProvider>
  );
};

export default StackNavigation;
