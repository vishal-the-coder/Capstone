import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {COLOR} from '../util/Color';
import {HomeScreen, LittleLemonUser} from '../util/Constant';
import {windowWidth} from '../util/Dimensions';

const Onboarding = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [showError, setShowError] = useState(false);

  const saveInitialData = () => {
    setShowError(false);
    if (email.trim() && firstName.trim() !== '') {
      const data = {email: email.trim(), firstName: firstName.trim()};
      AsyncStorage.setItem(LittleLemonUser, JSON.stringify(data));
      navigation.navigate(HomeScreen);
    } else {
      setShowError(true);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../img/littleLemonLogo.png')}
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Little Lemon</Text>
        <View style={styles.centerContainerView}>
          <View>
            <Text style={styles.location}>Chicago</Text>
            <Text style={styles.description}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <View>
            <Image
              source={require('../img/restauranfood.png')}
              style={styles.mainImage}
            />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.form}>
          <Text style={styles.inputTitle}>First name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="first name"
            onChangeText={text => setFirstName(text)}
            mode="outlined"
          />
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="email"
            onChangeText={text => setEmail(text)}
            mode="outlined"
          />
          {showError && (
            <Text style={styles.errorText}>Both field are mandatory</Text>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <View></View>
        <View></View>
        <Pressable onPress={saveInitialData} style={styles.btn}>
          <Text style={styles.btntxt}>Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.WHITE,
  },
  centerContainer: {backgroundColor: COLOR.MAIN_GREEN, padding: 16},
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLOR.MAIN_YELLOW,
    marginVertical: 8,
  },
  centerContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    fontSize: 28,
    color: COLOR.WHITE,
  },
  description: {
    fontSize: 18,
    color: COLOR.WHITE,
    marginVertical: 16,
    width: windowWidth / 1.7,
  },
  mainImage: {
    height: windowWidth / 3,
    width: windowWidth / 3,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  body: {
    flex: 5,
    backgroundColor: COLOR.WHITE,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLOR.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logo: {
    height: windowWidth / 6,
    width: windowWidth / 2,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 28,
    fontWeight: '700',
    color: COLOR.MAIN_YELLOW,
  },
  inputTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: COLOR.BLACK,
    marginTop: windowWidth / 30,
    marginBottom: windowWidth / 60,
  },
  textInput: {
    width: windowWidth - windowWidth / 5,
    borderRadius: 8,
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: COLOR.DARK_YELLOW,
    color: COLOR.MAIN_GREEN,
    fontWeight: '500',
    fontSize: 18,
  },
  btn: {
    paddingHorizontal: windowWidth / 50,
    paddingVertical: windowWidth / 70,
    backgroundColor: COLOR.MAIN_GREEN,
    borderRadius: 3,
    width: (windowWidth - windowWidth / 5) / 3,
  },
  btntxt: {
    fontSize: 24,
    color: COLOR.WHITE,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 5,
    fontWeight: '500',
    fontSize: 14,
    color: COLOR.RED,
    backgroundColor: COLOR.DARK_YELLOW,
    paddingHorizontal: 5,
  },
});
