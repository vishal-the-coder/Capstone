import {insertData} from './database';

const FetchMenuItem = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
    );
    const json = await response.json();

    json.menu.forEach(async item => {
      await insertData(
        item.name,
        item.description,
        item.price,
        item.category,
        item.image,
      );
    });
  } catch (error) {
    console.error(error);
  }
};

export default FetchMenuItem;
