import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favourites from '../StackScreens/Favourites';
import StoryDetail from '../StackScreens/StoryDetail';
import StoryPage from '../StackScreens/StoryPage';
import { AppProvider } from '../Context/RainbowProgress';
import Listen from '../StackScreens/Listen';
const FavouriteStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <AppProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="StoryPage" component={StoryPage} />
        <Stack.Screen name='Listen' component={Listen}/>
      </Stack.Navigator>
    </AppProvider>
  );
};

export default FavouriteStack;
