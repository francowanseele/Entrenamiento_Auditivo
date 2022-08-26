import AsyncStorage from '@react-native-async-storage/async-storage';
import { roles } from '../enums/roles';

export const LOGGED = 'logged';
export const EMAIL = 'email';
export const ID_USER = '_id';
export const IS_STUDENT = 'isStudent';
export const ID_CURRENT_CURSE = '_idCurrentCourse';
export const ID_PERSONAL_COURSE = 'idPersonalCourse';
export const ROL = '_rolADA';
export const TOKEN = '_token';
export const REFRESH_TOKEN = '_refreshToken';

// Variables temporales estudiante
export const STU_LAST_COURSE = 'stuLastCourse';
export const STU_LAST_MODULE = 'stuLastModule';

// Variables temporales docente
export const DOC_LAST_INSTITUTE = 'docLastInstitute';
export const DOC_LAST_COURSE = 'docLastCourse';
export const DOC_LAST_MODULE = 'docLastModule';

// Todos los parámetros se reciben como String
export async function setStorageUserLogged(
    email,
    isStudent,
    _id,
    _idCurrentCourse,
    idPersonalCourse,
    rol,
    token,
    refreshToken
) {
    await AsyncStorage.setItem(LOGGED, '1');
    await AsyncStorage.setItem(ID_USER, _id.toString());
    await AsyncStorage.setItem(EMAIL, email);
    await AsyncStorage.setItem(IS_STUDENT, isStudent.toString());
    if (token) await AsyncStorage.setItem(TOKEN, token);
    if (refreshToken) await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
    if (idPersonalCourse)
        await AsyncStorage.setItem(
            ID_PERSONAL_COURSE,
            idPersonalCourse.toString()
        );
    if (_idCurrentCourse)
        await AsyncStorage.setItem(
            ID_CURRENT_CURSE,
            _idCurrentCourse.toString()
        );
    if (rol) await AsyncStorage.setItem(ROL, rol.toString());
}

export async function setStorageUserLogout() {
    await AsyncStorage.setItem(LOGGED, '0');
    await AsyncStorage.setItem(ID_USER, '');
    await AsyncStorage.setItem(EMAIL, '');
    await AsyncStorage.setItem(ID_CURRENT_CURSE, '');
    await AsyncStorage.setItem(ID_PERSONAL_COURSE, '');
    await AsyncStorage.setItem(ROL, '');
    await AsyncStorage.setItem(TOKEN, '');
    await AsyncStorage.setItem(REFRESH_TOKEN, '');
}

export async function setStorageCurrentCourse(idCourse) {
    await AsyncStorage.setItem(ID_CURRENT_CURSE, idCourse.toString());
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
    const idPersonalCourse = await AsyncStorage.getItem(ID_PERSONAL_COURSE);
    const data = {
        logged,
        email,
        id,
        isStudent,
        id_course,
        idPersonalCourse,
    };

    return data;
}

// Token
export async function getToken() {
    const tokenLocal = await AsyncStorage.getItem(TOKEN);
    // console.log('-------');
    // console.log(tokenLocal);
    return tokenLocal;
}

export async function setToken(token) {
    await AsyncStorage.setItem(TOKEN, token);
    return;
}

// Refresh Token
export async function getRefreshToken() {
    return await AsyncStorage.getItem(REFRESH_TOKEN);
    
}

export async function setRefreshToken(refreshToken) {
    await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
    return; 
}

export async function getToeknAndRefreshToken() {
    try {
        const tokenLocal = await AsyncStorage.getItem(TOKEN);
        const refreshTokenLocal = await AsyncStorage.getItem(REFRESH_TOKEN);
        return {
            token: tokenLocal,
            refreshToken: refreshTokenLocal,
        };
    } catch (error) {
        console.log(error);
    }
}

// Rol
export async function getStorageIsAdmin() {
    const isAdminAux = await AsyncStorage.getItem(ROL);
    return isAdminAux == roles.admin;
}

// Manage var temp Teacher
export async function setVarTemp_Teacher(_idInstitute, _idCourse, _idModule) {
    await AsyncStorage.setItem(DOC_LAST_INSTITUTE, _idInstitute.toString());
    await AsyncStorage.setItem(DOC_LAST_COURSE, _idCourse.toString());
    await AsyncStorage.setItem(DOC_LAST_MODULE, _idModule.toString());
}

export async function getVarTemp_Teacher() {
    const lastInstitute = await AsyncStorage.getItem(DOC_LAST_INSTITUTE);
    const lastCourse = await AsyncStorage.getItem(DOC_LAST_COURSE);
    const lastModule = await AsyncStorage.getItem(DOC_LAST_MODULE);

    const data = {
        lastInstitute,
        lastCourse,
        lastModule,
    };
    return data;
}
