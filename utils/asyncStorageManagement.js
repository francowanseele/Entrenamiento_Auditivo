import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGGED = 'logged';
export const EMAIL = 'email';
export const ID_USER = '_id';
export const IS_STUDENT = 'isStudent';
export const ID_CURRENT_CURSE = '_idCurrentCourse';

// Todos los parámetros se reciben como String
export async function setStorageUserLogged(
    email,
    isStudent,
    _id,
    _idCurrentCourse
) {
    await AsyncStorage.setItem(LOGGED, '1');
    await AsyncStorage.setItem(ID_USER, _id);
    await AsyncStorage.setItem(EMAIL, email);
    await AsyncStorage.setItem(IS_STUDENT, isStudent);
    await AsyncStorage.setItem(ID_CURRENT_CURSE, _idCurrentCourse);
}

export async function setStorageUserLogout() {
    await AsyncStorage.setItem(LOGGED, '0');
    await AsyncStorage.setItem(ID_USER, '');
    await AsyncStorage.setItem(EMAIL, '');
    await AsyncStorage.setItem(ID_CURRENT_CURSE, '');
}

export async function getStorageIsLogged() {
    const emailLogged = await AsyncStorage.getItem(EMAIL);
    return emailLogged !== '' && emailLogged !== null;
}

export async function getStorageIsStudent() {
    const isStudent = await AsyncStorage.getItem(IS_STUDENT);
    return isStudent == '1';
}

export async function getStorageItem(item) {
    const itemValue = await AsyncStorage.getItem(item);
    return itemValue;
}

export async function getParams() {
    const logged = await AsyncStorage.getItem(LOGGED);
    const email = await AsyncStorage.getItem(EMAIL);
    const id = await AsyncStorage.getItem(ID_USER);
    const isStudent = await AsyncStorage.getItem(IS_STUDENT);
    const id_course = await AsyncStorage.getItem(ID_CURRENT_CURSE);
    const data = {
        logged,
        email,
        id,
        isStudent,
        id_course,
    };

    return data;
}
