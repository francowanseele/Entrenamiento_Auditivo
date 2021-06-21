import { basePath } from './config';

export function melodicDictationApi(data) {
    const url = `${basePath}/melodic-dictation`;

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
                
                if (result.ok) {
                    return {
                        ok: true,
                        clave:result.configuracion.clave,
                        escalaDiatonica:result.configuracion.escalaDiatonica,
                        dictado: result.dictado,
                        dictadoTraducido: result.dictadoTraducido,
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

export function rhythmicDictationApi(data) {
    const url = `${basePath}/rhythmic-dictation`;

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
                // console.log(result)
                if (result.ok) {                   
                    return {
                        ok: true,                        
                        figurasDictado: result.figuras,
                        figurasConCompas: result.dictado,
                        numerador: result.numerador,
                        denominador: result.denominador
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
