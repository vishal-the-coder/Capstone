import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {COLOR} from '../util/Color';
import {HomeScreen, LittleLemonUser, OnboardingScreen} from '../util/Constant';
import {windowWidth} from '../util/Dimensions';

const Profile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avtarImage, setAvtarImage] = useState('');
  const [notifications, setNotifications] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await AsyncStorage.getItem(LittleLemonUser);
      if (fetchedData) {
        const parsedData = JSON.parse(fetchedData);
        setFirstName(parsedData.firstName || '');
        setLastName(parsedData.lastName || '');
        setEmail(parsedData.email || '');
        setPhoneNumber(parsedData.phoneNumber || '');
        setAvtarImage(parsedData.avtarImage || '');
        setNotifications(
          parsedData.notifications || {
            orderStatuses: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false,
          },
        );
      }
    };
    fetchData();
  }, []);

  const handleToggleSwitch = key => {
    setNotifications({...notifications, [key]: !notifications[key]});
  };

  const logout = () => {
    AsyncStorage.setItem(LittleLemonUser, '');
    navigation.navigate(OnboardingScreen);
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
    })
      .then(image => {
        setAvtarImage(image.path);
      })
      .catch(err => console.log('Denied permission', err));
  };

  const saveChanges = () => {
    const saveData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      avtarImage,
      notifications,
    };
    AsyncStorage.setItem(LittleLemonUser, JSON.stringify(saveData));
    navigation.navigate(HomeScreen);
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesome name="arrow-left" size={24} color={COLOR.MAIN_GREEN} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image
            source={require('../img/littleLemonLogo.png')}
            style={styles.logo}
          />
        </View>
        <Image
          source={
            avtarImage ? {uri: avtarImage} : require('../img/profileIcon.png')
          }
          style={styles.headerAvatar}
        />
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Personal information</Text>

          <View style={styles.avatarContainer}>
            <Image
              source={
                avtarImage
                  ? {uri: avtarImage}
                  : require('../img/profileIcon.png')
              }
              style={styles.avatar}
            />
            <View style={styles.avatarButtons}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: COLOR.MAIN_GREEN, marginRight: 5},
                ]}
                onPress={selectImage}>
                <Text style={[styles.buttonText, {color: COLOR.WHITE}]}>
                  Change
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {borderWidth: 1, borderColor: COLOR.MAIN_GREEN},
                ]}
                onPress={() => {
                  setAvtarImage('');
                }}>
                <Text style={[styles.buttonText, {color: COLOR.GRAY}]}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.inputTitle}>First name</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Text style={styles.inputTitle}>Last name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.inputTitle}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <Text style={styles.notificationsTitle}>Email notifications</Text>
          {Object.keys(notifications).map(key => (
            <View key={key} style={styles.notificationRow}>
              <Text>{key.split(/(?=[A-Z])/).join(' ')}</Text>
              <Switch
                value={notifications[key]}
                onValueChange={() => handleToggleSwitch(key)}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderWidth: 1,
                  borderColor: COLOR.MAIN_GREEN,
                  width: windowWidth / 3,
                },
              ]}
              onPress={() => {
                navigation.navigate(HomeScreen);
              }}>
              <Text style={[styles.buttonText, {color: COLOR.GRAY}]}>
                Discard changes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: COLOR.MAIN_GREEN, width: windowWidth / 2.8},
              ]}
              onPress={saveChanges}>
              <Text style={[styles.buttonText, {color: COLOR.WHITE}]}>
                Save changes
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 2,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: windowWidth / 3,
    height: windowWidth / 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarButtons: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: COLOR.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputTitle: {},
  notificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: COLOR.MAIN_YELLOW,
    borderColor: COLOR.DARK_YELLOW,
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: COLOR.BLACK,
    fontWeight: '600',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {fontWeight: '500', fontSize: 15},
});

export default Profile;
