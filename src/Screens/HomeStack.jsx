import { StackScreen } from 'react-native-screens';
import Home from '../Screens/Home';
import StoryDetail from '../StackScreens/StoryDetail';
import StoryPage from '../StackScreens/StoryPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Listen from '../StackScreens/Listen';
import CreateVoice from '../StackScreens/CreateVoice';
import RecordingVoice from '../StackScreens/RecordingVoice';
import ProcessingVoiceScreen from '../StackScreens/ProcessingVoiceScreen';
import ClonedVoice from '../StackScreens/ClonedVoice';
import { AppProvider } from '../Context/RainbowProgress';
const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <AppProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="StoryPage" component={StoryPage} />
        <Stack.Screen name="Listen" component={Listen} />
        <Stack.Screen name="CreateVoice" component={CreateVoice} />
        <Stack.Screen name="RecordingVoice" component={RecordingVoice} />
        <Stack.Screen
          name="ProcessingVoiceScreen"
          component={ProcessingVoiceScreen}
        />
        <Stack.Screen name="ClonedVoice" component={ClonedVoice} />
      </Stack.Navigator>
    </AppProvider>
  );
};

export default HomeStack;
