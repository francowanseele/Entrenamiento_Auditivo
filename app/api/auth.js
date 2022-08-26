import { basePath } from './config';
import jwtDecode from 'jwt-decode';
import {
    getRefreshToken,
    getToken,
    setRefreshToken,
    setStorageUserLogout,
    setToken,
} from '../../utils/asyncStorageManagement';

export async function getAccessTokenApi() {
    const accessToken = await getToken();
    if (!accessToken || accessToken === null || accessToken == '') {
        return null;
    } else {
        return willExpireToken(accessToken) ? null : accessToken;
    }
}

export async function getRefreshTokenApi() {
    const refreshToken = await getRefreshToken();
    if (!refreshToken || refreshToken === null || refreshToken == '') {
        return null;
    } else {
        return willExpireToken(refreshToken) ? null : refreshToken;
    }
}

// refresh token, if refresh token expired deslogueo user
export async function refreshAccessTokenApi(refreshToken) {
    const url = `${basePath}/refresh-access-token`;
    const bodyObj = {
        refreshToken: refreshToken,
    };
    const params = {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            if (response.status === 501) {
                return null;
            } else {
                return response.json();
            }
        })
        .then(async (result) => {
            if (!result) {
                //Deslogueo user
                await logout();
                return {
                    ok: false,
                    message: "Logout."
                };
            } else {
                await setToken(result.accessToken);
                await setRefreshToken(result.refreshToken);
                return {
                    token: result.accessToken,
                    refreshToken: result.refreshToken,
                };
            }
        })
        .catch((err) => {
            return {
                ok: false,
                message: 'Error de servidor, vuelva a intentarlo más tarde',
            };
        });
}

export async function logout() {
    await setStorageUserLogout();
}

export function willExpireToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;

    // Convert date to unix format
    const now = (Date.now() + seconds) / 1000;

    // return true if expired
    return now > exp;
}
