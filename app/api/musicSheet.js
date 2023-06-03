import { basePath } from './config';

export function generateMusicSheetSolutionImageApi(data) {
    const url = `${basePath}/generate-music-sheet-solution-image`;

    const params = {
        method: 'POST',
        body: JSON.stringify(data),
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
        .then((result) => {
            if (!result) {
                return {
                    ok: false,
                    message: 'Error interno del servidor.',
                };
            } else {
                return {
                    ok: result.ok,
                    message: result.message,
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

export function generateMusicSheetReferenceImageApi(data) {
    const url = `${basePath}/generate-music-sheet-reference-image`;

    const params = {
        method: 'POST',
        body: JSON.stringify(data),
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
        .then((result) => {
            if (!result) {
                return {
                    ok: false,
                    message: 'Error interno del servidor.',
                };
            } else {
                return {
                    ok: result.ok,
                    message: result.message,
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

export function getMusicSheetSolutionFileApi(idUser) {
    const url = `${basePath}/get-muic-sheet-solution-file/${idUser}`;

    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.url;
        })
        .catch((err) => {
            return err.message;
        });
}

export function getMusicSheetReferenceFileApi(idUser) {
    const url = `${basePath}/get-muic-sheet-reference-file/${idUser}`;

    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.url;
        })
        .catch((err) => {
            return err.message;
        });
}
