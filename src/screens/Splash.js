import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {windowHeight, windowWidth} from '../util/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HomeScreen, LittleLemonUser, OnboardingScreen} from '../util/Constant';

const Splash = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      const isLoggedInData = await AsyncStorage.getItem(LittleLemonUser);
      isLoggedInData
        ? navigation.navigate(HomeScreen)
        : navigation.navigate(OnboardingScreen);
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../img/littleLemonLogo.png')}
        style={styles.image}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth / 1.5,
    height: windowHeight / 5,
    resizeMode: 'contain',
  },
});
