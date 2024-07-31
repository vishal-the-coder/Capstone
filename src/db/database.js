import {useState} from 'react';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'LittleLemon',
    location: 'default',
  },
  () => {},
  error => console.log('Error while call database  ::: ', error),
);

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'menu_item ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price DOUBLE, category TEXT, image TEXT )',
    );
  });
};

export const insertData = async (name, description, price, category, image) => {
  try {
    await db.transaction(async tx => {
      await tx.executeSql(
        'INSERT INTO menu_item (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, category, image],
      );
    });
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

export const getData = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id, name, description, price, category, image FROM menu_item',
        [],
        (tx, results) => {
          let tempArr = [];
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            tempArr.push(item);
          }
          resolve(tempArr); // Resolve with the data
        },
        (tx, error) => {
          console.error('Error occurred while fetching data: ', error);
          reject(error); // Reject with an error
        }
      );
    });
  });
};

export const deleteTable = () => {
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS menu_item');
  });
};
