import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadItem(key) {
    try {
        return JSON.parse(await AsyncStorage.getItem(key));
    } catch (e) {
        console.error(`Error loading item '${key}' from local storage:`, e);
    }
}

export async function saveItem(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error saving item ${key} with value '${value}' in local storage:`, e);
    }
}

export async function deleteItem(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error(`Error removing item ${key} in local storage:`, e);
    }
}
