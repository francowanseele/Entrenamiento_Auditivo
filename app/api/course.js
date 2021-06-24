import { basePath } from './config';

export function getModulesApi(idCourse) {
    const url = `${basePath}/get-module-by-curse/${idCourse}`;

    const params = {
        method: 'GET',
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
                if (result.ok) {
                    return {
                        ok: true,
                        modules: result.modules,
                        message: result.message,
                    };
                } else {
                    return {
                        ok: false,
                        message: result.message,
                    };
                }
            }
        })
        .catch((err) => {
            return {
                ok: false,
                message: 'Error de servidor, vuelva a intentarlo más tarde',
            };
        });
}
