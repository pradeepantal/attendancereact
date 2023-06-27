import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { fontScale } = Dimensions.get("window");
// const BASE_URL = 'http://192.168.1.22:8000/api/v1/';
const BASE_URL = 'https://e231-122-176-50-200.ngrok-free.app/api/v1/';

export const { windowWidth } = Dimensions.get("window").width;
export const { windowHeight } = Dimensions.get("window").height;

export function getFontSize(inputFontSize: any) {
    return inputFontSize / fontScale;
}

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const clearAllAsync = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }
}


export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export const apiCall = async(url, options) => {
    return await fetch(BASE_URL+ url, options)
        .then(function (res) {            
            return res.json();
        })
        .then(function (resJson) {
            return resJson;
        })
}