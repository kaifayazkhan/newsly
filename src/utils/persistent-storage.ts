import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log("Error storing data")
    }
};

export const getData = async (key: string) => {
    try {
        const res = await AsyncStorage.getItem(key);
        return res !== null ? JSON.parse(res) : null;

    } catch (e) {
        console.log("Error in retrieving data")
    }
};

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log("Error in removing data")
    }

    console.log('Data removed successfully.')
}