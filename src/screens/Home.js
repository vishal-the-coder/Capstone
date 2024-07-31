import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MenuItem from '../components/MenuItem';
import {createTable, deleteTable, getData, insertData} from '../db/database';
import {COLOR} from '../util/Color';
import {LittleLemonUser, ProfileScreen} from '../util/Constant';
import {windowWidth} from '../util/Dimensions';
import FetchMenuItem from '../db/FetchMenuItem';

const Home = ({navigation}) => {
  const [userData, setUserData] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [menuList, setMenuList] = useState([]);
  const [searchedList, setSearchedList] = useState();

  const [selection, setSelection] = useState([
    {category: 'Starters', selected: false},
    {category: 'Mains', selected: false},
    {category: 'Desserts', selected: false},
    {category: 'Drinks', selected: false},
    {category: 'Appetizers', selected: false},
    {category: 'Salads', selected: false},
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJ = await AsyncStorage.getItem(LittleLemonUser);
        if (userDataJ) {
          setUserData(JSON.parse(userDataJ));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
      deleteTable();
      createTable();
      await FetchMenuItem();
      const data = await getData();
      setMenuList(data);
    };
    fetchUserData();
  }, []);

  const searchItems = text => {
    setSearchInput(text);
    if (!text.trim()) {
      setSearchedList(null);
      return;
    }
    let tempData = menuList.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchedList(tempData);
  };

  const selectCategory = async item => {
    const updatedSelection = selection.map(menu =>
      menu.category === item.category
        ? {...menu, selected: !menu.selected}
        : menu,
    );

    setSelection(updatedSelection);

    const selectedCategories = updatedSelection
      .filter(menu => menu.selected)
      .map(menu => menu.category.toLowerCase());

    const filteredData = selectedCategories.length
      ? menuList.filter(menuItem =>
          selectedCategories.includes(menuItem.category.toLowerCase()),
        )
      : menuList;

    setSearchedList(filteredData);
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Image
            source={require('../img/littleLemonLogo.png')}
            style={styles.logo}
          />
        </View>
        <Pressable
          style={styles.headerAvatarArea}
          onPress={() => {
            navigation.navigate(ProfileScreen);
          }}>
          <Image
            source={
              userData && userData.avtarImage
                ? {uri: userData.avtarImage}
                : require('../img/profileIcon.png')
            }
            style={styles.headerAvatar}
          />
        </Pressable>
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
        <Searchbar
          placeholder="Search"
          placeholderTextColor={COLOR.MAIN_GREEN}
          value={searchInput}
          style={styles.searchInput}
          icon={() => (
            <FontAwesome name="search" size={24} color={COLOR.MAIN_GREEN} />
          )}
          clearIcon={true}
          cursorColor={COLOR.MAIN_GREEN}
          inputStyle={styles.textInput}
          onChangeText={text => {
            searchItems(text);
          }}
        />
      </View>
      <View style={styles.orderDelivery}>
        <Text style={styles.orderTitle}>ORDER FOR DELIVERY!</Text>
        <View style={styles.tabContainer}>
          <FlatList
            data={selection}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => selectCategory(item)}
                style={[
                  styles.tab,
                  item.selected
                    ? {
                        backgroundColor: COLOR.MAIN_GREEN,
                      }
                    : {
                        backgroundColor: COLOR.LIGHT_GRAY,
                      },
                ]}>
                <Text
                  style={[
                    styles.fitBtnTitle,
                    {
                      color: item.selected ? COLOR.WHITE : COLOR.MAIN_GREEN,
                    },
                  ]}>
                  {item.category}
                  {item.selected && '   X'}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.list}>
          <FlatList
            data={searchedList ?? menuList}
            renderItem={({item}) => <MenuItem item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerCenter: {
    flex: 1,
    paddingLeft: windowWidth / 20,
    alignItems: 'center',
  },
  logo: {
    width: windowWidth / 3,
    height: windowWidth / 12,
  },
  headerAvatarArea: {
    borderRadius: windowWidth / 1,
    overflow: 'hidden',
  },
  headerAvatar: {
    width: windowWidth / 10,
    height: windowWidth / 10,
    resizeMode: 'cover',
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
  orderDelivery: {paddingHorizontal: 16},
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR.BLACK,
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  tab: {
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 16,
    paddingHorizontal: 15,
    fontWeight: '500',
  },
  fitBtnTitle: {fontWeight: '700', fontSize: 16},
  searchInput: {
    backgroundColor: COLOR.WHITE,
    height: windowWidth / 10,
  },
  textInput: {
    color: COLOR.MAIN_GREEN,
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'center',
  },
  list: {height: windowWidth / 1.15},
});
