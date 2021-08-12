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
                    issueConfig: result.issueConfig,
                    message: 'Error interno del servidor.',
                };
            } else {
                if (result.ok) {
                    return {
                        ok: true,
                        issueConfig: result.issueConfig,
                        dictations: result.dictations,
                    };
                } else {
                    return {
                        ok: false,
                        issueConfig: result.issueConfig,
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
                    esDocente: result.esDocente,
                    id_user:result.id_user,
                    personal_course:result.personal_course
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


// Enviar a la api ejemplo:
// {
//     "email":"martin@hotmail.com",
//     "id_dictado":"60da1135017a8f1f875dd686",
//     "resuelto": {"fecha": "2021-06-28T18:13:09.041+00:00", "nota":12 }
// }
export const setAutoevaluacion = (email,id_dictado,notaResultado) =>{
    const url = `${basePath}/set-nuevo-resultado`;
    // console.log(email+id_dictado+notaResultado)    
    const fecha = new Date();
    const fechaFinal = fecha.toUTCString(); // "14/6/2020"
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"email":email, "id_dictado":id_dictado,"resuelto":{"fecha":fechaFinal,"nota":notaResultado} }) 
    };
    return fetch(url, params)
    .then((response) => {
        // console.log(response)
        if (response.status === 501) {
            return null;
        } else {
            return true
        }
    })
}