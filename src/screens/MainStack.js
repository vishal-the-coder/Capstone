import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  OnboardingScreen,
  ProfileScreen,
  SplashScreen,
} from '../util/Constant';
import Onboarding from './Onboarding';
import Home from './Home';
import Profile from './Profile';
import Splash from './Splash';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Splash}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SplashScreen} component={Splash} />
      <Stack.Screen name={OnboardingScreen} component={Onboarding} />
      <Stack.Screen name={HomeScreen} component={Home} />
      <Stack.Screen name={ProfileScreen} component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStack;
