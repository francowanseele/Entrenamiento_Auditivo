import { basePath } from './config';

export function getDictationApi(idUser, idConfigDictation) {
    const url = `${basePath}/get-dictation/${idUser}?idConfigDictation=${idConfigDictation}`;    
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
                        dictations: result.dictations,
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

export function generateDictationApi(
    idUser,
    idCourse,
    idModule,
    idConfigDictation,
    cantDictation,
    data
) {
    const url = `${basePath}/add-dictation-user/${idUser}?idCourse=${idCourse}&idModule=${idModule}&idConfigDictation=${idConfigDictation}&cantDictation=${cantDictation}`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
                        dictations: result.dictations,
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

export const getUsuarioApi = (email,password) =>{

    const url = `${basePath}/get-user`;    
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"email":email, "password":password}) 
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
                    email: result.email,
                    password: result.password,
                    esDocente: result.esDocente
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
            message: err,
        };
    });    

}