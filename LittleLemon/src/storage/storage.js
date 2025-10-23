import AsyncStorage from "@react-native-async-storage/async-storage";

// Asyn Storage function to save data
export const saveData = async (key,value) => {
    await AsyncStorage.setItem(key,value);
}

// Asyn Storage function to retrieve data
export const retrieveData = async (key) => {
    return await AsyncStorage.getItem(key);
}

// Asyn Storage function to delete the key.
export const deleteKey = async (key) => {
    await AsyncStorage.removeItem(key);
    console.log(`Key "${key}" deleted successfully`);
}  

// Asyn Storage function to merge the item.
export const mergeData = async (key,value) => {
    await AsyncStorage.mergeItem(key,value);
}