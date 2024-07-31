import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {COLOR} from '../util/Color';

const MenuItem = ({item}) => {
  // console.log('item from Menu Item Component :::::: ', item);
  return (
    <View style={styles.menuItem}>
      <View style={styles.textContainer}>
        <Text style={styles.menuItemTitle}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price}</Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
        }}
        style={styles.menuItemImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.LIGHT_GRAY,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#333',
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

export default MenuItem;
