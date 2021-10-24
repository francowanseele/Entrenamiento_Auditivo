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

export function addStudentCourse(idCourse, idUser) {
    const url = `${basePath}/add-student-course`;

    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idUser:idUser,
            idCourse:idCourse,
        }),
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
                        course: result.course,
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

export function addModulesApi(idCourse, data) {
    const url = `${basePath}/update-module/${idCourse}`;

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
                        course: result.course,
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

export function getAllCourse(){
    const url = `${basePath}/get-all-courses`;
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
                        message: result.message,
                        cursos:result.cursos
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


export function getCursaCoursesStudent(idUser){
    const url = `${basePath}/get-cursa-student`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idUser:idUser
         })
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
                        message: result.message,
                        cursos:result.cursos
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
            console.log(err)
            return {
                ok: false,
                message: 'Error de servidor, vuelva a intentarlo más tarde',
            };
        });
}

export function getCursoPersonal(idUser){
    const url = `${basePath}/get-curso-personal`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idUser:idUser
         })
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
                        message: result.message,
                        curso_personal:result.curso_personal
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
            console.log(err)
            return {
                ok: false,
                message: 'Error de servidor, vuelva a intentarlo más tarde',
            };
        });
}
export function addConfigDictationApi(idCourse, idModule, idUserCreate, data) {
    const url = `${basePath}/add-config-dictation-module?idCourse=${idCourse}&idModule=${idModule}&idUserCreate=${idUserCreate}`;

    const params = {
        method: 'PUT',
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

export async function getStudentsByIdCourse(idCourse) {

    const url = `${basePath}/get_students_course`;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                idCourse:idCourse
             })
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
                        estudiantes: result.estudiantes
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


export async function getTeacherCourses(idUser) {
    const url = `${basePath}/get_teacher_courses`;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idUser:idUser
         })
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
                        cursos: result.cursos
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

export const crearCurso=(nombre,descripcion)=>{
    const url = `${basePath}/add-course`;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name:nombre,
            description:descripcion
         })
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
                        course: result.course
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