import AsyncStorage from '@react-native-community/async-storage';

const _storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
    console.warn('Async insert Error-->' + error.message());
  }
};
const _retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    console.warn('Async read Error-->' + error.message());
  }
};
const _logout = () => {
  AsyncStorage.clear();
};

export {_storeData, _retrieveData, _logout};
