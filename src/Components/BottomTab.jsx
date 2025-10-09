import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeStack from '../Screens/HomeStack';
import FavouriteStack from '../Screens/FavouriteStack';
import ProfileStack from '../Screens/ProfileStack';
import Generate from '../StackScreens/Generate';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, color) => {
  switch (routeName) {
    case 'Home':
      return (
        <Image
          source={
            focused
              ? require('../assets/bookoutline.png')
              : require('../assets/book.png')
          }
          style={{ width: wp('7%'), height: wp('7%'), tintColor: color }}
          resizeMode="contain"
        />
      );

    case 'Favourites':
      return (
        <Image
          source={
            focused
              ? require('../assets/heartoutline.png')
              : require('../assets/heart.png')
          }
          style={{ width: wp('7%'), height: wp('7%'), tintColor: color }}
          resizeMode="contain"
        />
      );

    case 'Profile':
      return (
        <Image
          source={
            focused
              ? require('../assets/profileoutline.png')
              : require('../assets/profile.png')
          }
          style={{ width: wp('7%'), height: wp('7%'), tintColor: color }}
          resizeMode="contain"
        />
      );

    case 'Generate':
      return (
        <View style={{ width: wp('7%'), height: wp('7%') }}>
          <Image
            source={require('../assets/magicpen.png')}
            style={{ width: wp('7%'), height: wp('7%') }}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/lock.png')}
            style={{
              width: wp('3.5%'),
              height: wp('3.5%'),
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}
            resizeMode="contain"
          />
        </View>
      );

    default:
      return null;
  }
};

const App = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        // get the current active screen inside each stack
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

        let hideTab = false;

        // 🔹 Hide tab in all HomeStack screens except main Home
        if (route.name === 'Home' && routeName !== 'Home') {
          hideTab = true;
        }
          if (route.name === 'Favourites' && routeName !== 'Favourites') {
          hideTab = true;
        }

        // 🔹 Hide tab in ProfileStack's VoicePrivacy & PrivacyPolicy
        if (
          route.name === 'Profile' &&
          (routeName === 'VoicePrivacy' || routeName === 'PrivacyPolicy')
        ) {
          hideTab = true;
        }

        return {
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color }) =>
            getTabBarIcon(route.name, focused, color),
          tabBarActiveTintColor: '#A78BFA',
          tabBarInactiveTintColor: '#8F9098',
          tabBarItemStyle: {
            paddingVertical: hp('1.2%'),
            marginHorizontal: wp('3%'),
          },
          tabBarStyle: hideTab
            ? { display: 'none' }
            : {
                height: hp('12%'),
                borderTopLeftRadius: wp('6%'),
                borderTopRightRadius: wp('6%'),
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                overflow: 'hidden',
              },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favourites" component={FavouriteStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen
        name="Generate"
        component={Generate}
        options={{
          tabBarLabelStyle: { color: '#FA8B8B' },
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
