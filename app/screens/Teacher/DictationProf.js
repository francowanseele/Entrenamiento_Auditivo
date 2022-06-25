import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    Text,
    Alert,
} from 'react-native';
import { ListItem, Icon, Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {
    BACKGROUNDHOME,
    TEXTHOME,
    ITEMSHOME,
} from '../../styles/styleValues';
import {
    getModulesApi,
    getAllCourse,
    addTeacherCourse,
    getCursoPersonal,
    getTeacherCourses,
    addCourseApi,
    getConfigDictationApi,
    hasPermissionEditCourseApi,
} from '../../api/course';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import {
    getStorageItem,
    ID_CURRENT_CURSE,
    ID_PERSONAL_COURSE,
    ID_USER,
    setStorageCurrentCourse,
} from '../../../utils/asyncStorageManagement';
import Loading from '../../components/Loading';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SummaryCreateDictation from '../Teacher/SummaryCreateDictation';
import {
    PRIMARY_COLOR,
    QUARTER_COLOR,
    SECONDARY_COLOR,
} from '../../../utils/colorPalette';
import SelectCourse from '../../components/BottomSheetOptions/SelectCourse';
import { DELAY_LONG_PRESS } from '../../../utils/constants';
import EditModuleConfig from '../../components/BottomSheetOptions/EditModuleConfig';
import NewCourse from '../../components/BottomSheetOptions/NewCourse';
import { getInstituteByUserApi } from '../../api/institute';

export default function DictationProf() {
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation();
    const [modules, setModules] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [updateCoursesStudent, setUpdateCoursesStudent] = useState(false);
    const [updateAllCourses, setUpdateAllCourses] = useState(false);
    const [personalCourse, setPersonalCourse] = useState('');
    const [pressed, setPressed] = useState(-3);
    const [idCourseSelectedHistory, setIdCourseSelectedHistory] = useState(null);
    const [updateAllModules, setUpdateAllModules] = useState(false);

    // Select course - bottom sheet SelectCourse
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [personalCourseData, setPersonalCourseData] = useState({
        name: '',
        description: '',
    });

    // Edit Module or Config 
    const [idModuleToEdit, setIdModuleToEdit] = useState(null);
    const [idConfigDictationToEdit, setIdConfigDictationToEdit] = useState(null);
    const [isModuleToEdit, setIsModuleToEdit] = useState(false);
    const [isConfigDictationToEdit, setIsConfigDictationToEdit] = useState(false);
    const [nameToEdit, setNameToEdit] = useState('');
    const [descriptionToEdit, setDescriptionToEdit] = useState('');
    const [idCourseToEdit, setIdCourseToEdit] = useState(null);
    const [permissionToEdit, setPermissionToEdit] = useState(true);

    // new coruse
    const [institutes, setInstitutes] = useState([]);
    const [visibleOverlayInstitute, setVisibleOverlayInstitute] = useState(false);
    const [instituteLocal, setInstituteLocal] = useState(null);
    const [msgErrorOverlay, setMsgErrorOverlay] = useState('');
    const [titleOverlay, setTitleOverlay] = useState('');
    const [courseNameLocal, setCourseNameLocal] = useState('');
    const [courseDescriptionLocal, setCourseDescriptionLocal] = useState('');

    // UseRef
    const refRBSheet_SelectCourse = useRef();
    const refRBSheet_EditModuleConfig = useRef();
    const refRBSheet_NewCourse = useRef();

    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const open_summaryCreateDictation = async (config, module) => {
        const configResut = await getConfigDictationApi(config.id);

        navigation.navigate('summaryDictaction', {
            dictationRhythmic: null,
            institute: 'falta',
            course: { name: getNombreCurso(cursoSeleccionado).name },
            module: { name: module.Nombre },
            nameConfig: configResut.config.nombre,
            descriptionConfig: configResut.config.descripcion,
            giro_melodico_regla: configResut.config.giro_melodico_regla,
            notas_inicio: configResut.config.notas_inicio,
            notas_fin: configResut.config.notas_fin,
            clave_prioridad: configResut.config.clave_prioridad,
            escala_diatonica_regla: configResut.config.escala_diatonica_regla,
            nota_base: configResut.config.nota_base,
            nro_compases: configResut.config.nro_compases,
            simple: configResut.config.simple,
            compas_regla: configResut.config.compas_regla,
            celula_ritmica_regla: configResut.config.celula_ritmica_regla,
            BPM: 128,
            tesitura: null,
            isOnlyView: true,
        });
    };

    // useEffect(() => {
    //     setLoading(true);
    //     getStorageItem(ID_CURRENT_CURSE).then((idCourse) => {
    //         if (idCourse) {
    //             getModulesApi(idCourse).then((dataModules) => {
    //                 if (dataModules.ok) {
    //                     var modulesRes = [];
    //                     dataModules.modules.forEach((m) => {
    //                         modulesRes.push({ module: m, open: false });
    //                     });
    //                     setModules(modulesRes);
    //                     //setLoading(false);
    //                 } else {
    //                     setModules([]);
    //                 }
    //             });
    //         }
    //     });
    //     setLoading(false);
    // }, [currentCourse]);

    useEffect(() => {
        setLoading(true);
        getAllCourse().then((result) => {
            if (result.ok) {
                var publicCourses = [];
                result.cursos.forEach((curso) => {
                    if (curso.Personal == false) {
                        publicCourses.push({
                            id: curso.id,
                            Descripcion: curso.Descripcion,
                            Nombre: curso.Nombre,
                            Personal: curso.Personal,
                        });
                    }
                });

                setAllCourses(publicCourses);
            }
        });

        getStorageItem(ID_USER).then((userId) => {
            getCursoPersonal(userId).then((res) => {
                if(res.ok) {
                    setPersonalCourseData({
                        name: res.curso_objeto.Nombre,
                        description: res.curso_objeto.Descripcion,
                    });
                }
            })

            // Get institutes of the current user
            getInstituteByUserApi(userId).then((institutesResult) => {
                if(institutesResult.ok){
                    var res = [];
                    res.push({
                        id: null,
                        name: 'SIN INSTITUTO'
                    })
                    institutesResult.institutes.forEach(i => {
                        res.push({
                            id: i.InstitutoId,
                            name: i.Nombre,
                        });
                    });
                    setInstitutes(res);
                    // setInstituteLocal(res[0]);
                }
            })
        })

        getStorageItem(ID_CURRENT_CURSE).then((idCurrentCurseResult) => {
            if (idCurrentCurseResult) {
                setCursoSeleccionado(idCurrentCurseResult);

                getModulesApi(idCurrentCurseResult).then((modulesResponse) => {
                    if (modulesResponse.ok) {
                        var modulesRes = [];
                        modulesResponse.modules.forEach((m) => {
                            modulesRes.push({ module: m, open: false });
                        });
                        setModules(modulesRes);
                    } else {
                        setModules([]);
                    }
                });
            }
        });
        setLoading(false);
    }, []);

    useEffect(() => {
        setLoading(true);

        getModulesApi(cursoSeleccionado).then((modulesResponse) => {
            if (modulesResponse.ok) {
                var modulesRes = [];
                modulesResponse.modules.forEach((m) => {
                    modulesRes.push({ module: m, open: false });
                });
                setModules(modulesRes);
            } else {
                setModules([]);
            }
        });

        setLoading(false);
    }, [updateAllModules])
    

    useEffect(() => {
        setLoading(true);
        getAllCourse().then((result) => {
            if (result.ok) {
                var publicCourses = [];
                result.cursos.forEach((curso) => {
                    if (curso.Personal == false) {
                        publicCourses.push({
                            id: curso.id,
                            Descripcion: curso.Descripcion,
                            Nombre: curso.Nombre,
                            Personal: curso.Personal,
                        });
                    }
                });

                setAllCourses(publicCourses);
            }
        });
        setLoading(false);
    }, [updateAllCourses]);

    const getNombreCurso = (idCourse) => {
        if (idCourse == personalCourse) {
            return personalCourseData;
        }
        if (idCourse == 'Nuevo Curso') {
            return {
                name: 'Nuevo Curso',
            }
        }
        for (let e in allCourses) {
            if (idCourse == allCourses[e].id) {
                return {
                    name: allCourses[e].Nombre,
                    description: allCourses[e].Descripcion,
                }
            }
        }
    };

    const getCurso = (idCourse) => {
        for (let e in courses) {
            if (idCourse == courses[e].id) {
                return courses[e];
            }
        }
    };

    const selectCoursePressed = async (courseSelect, courses) => {
        const idCurrent = await getStorageItem(ID_CURRENT_CURSE);
        var encontre = false;
        if (courses) {
            for (let i = 0; i < courses.length; i++) {
                const c = courses[i];
                if (c.id == idCurrent) {
                    encontre = true;
                    await setPressed(i);
                }
            }
        }
        if (!encontre) {
            await setPressed(-2);
        }
    };
    

    useEffect(() => {
        setLoading(true);
        
        getStorageItem(ID_USER).then((idUser) => {
            getStorageItem(ID_PERSONAL_COURSE).then((idPersonalCourse) => {
                selectCoursePressed(idPersonalCourse);
                setPersonalCourse(idPersonalCourse);
            })
            if (idUser) {
                // getCursoPersonal(parseInt(idUser)).then((result) => {
                //     if (result.ok) {
                //         setPersonalCourse(result.curso_objeto.id);
                //     }
                // });

                getTeacherCourses(parseInt(idUser)).then((result) => {
                    if (result.ok) {
                        setCourses(result.cursos);

                        if (result.cursos.length > 0) {
                            setCurrentCourse(result.cursos[0].id);
                            setStorageCurrentCourse(result.cursos[0].id);
                        }
                        // setPressed(-0);
                        // selectCoursePressed(result.cursos[0].curso, courses);

                        // selectCoursePressed(result.cursos[0].id, result.cursos);
                    }
                });
            }
        });
        setLoading(false);
    }, [updateCoursesStudent]);

    const open_closeModulePress = (module) => {
        var modRes = [];
        modules.forEach((m) => {
            if (m.module.id == module.module.id) {
                modRes.push({ module: m.module, open: !m.open });
            } else {
                modRes.push({ module: m.module, open: m.open });
            }
        });
        setModules(modRes);
    };

    const getColor = (index) => {
        if (index == cursoSeleccionado) {
            return SECONDARY_COLOR;
        } else {
            return 'black';
        }
    };

    const getBorderWith = (index) => {
        if (index == cursoSeleccionado) {
            return 3;
        } else {
            return 1;
        }
    };

    const getLetterCourse = (nombre) => {
        if (nombre) {
            const arrPalabras = nombre.split(' ');
            if (arrPalabras.length == 0) {
                return 'NA';
            } else if (arrPalabras.length == 1) {
                return arrPalabras[0].charAt(0);
            } else {
                var secondLetter = '';
                for (let i = 1; i < arrPalabras.length; i++) {
                    const p = arrPalabras[i];
                    if (p.length > 3) {
                        secondLetter = arrPalabras[i].charAt(0);
                        break;
                    }
                }
                return arrPalabras[0].charAt(0) + secondLetter;
            }
        }
    };

    const renderLetterCourse = (nombre) => {
        if (nombre == 'Curso Personal') {
            return <Text style={styles.textHistIG}>P</Text>;
        } else if (nombre == 'Nuevo Curso') {
            return <Text style={styles.textHistIG}>+</Text>;
        } else {
            return (
                <Text style={styles.textHistIG}>{getLetterCourse(nombre)}</Text>
            );
        }
    };

    const iconHistory = (index, j) => {
        return (
            <>
                <View
                    style={[
                        styles.contentHistIG,
                        {
                            borderColor: getColor(j.id),
                            borderWidth: getBorderWith(j.id),
                        },
                    ]}
                >
                    {renderLetterCourse(getNombreCurso(j.id).name)}
                </View>
                <Text style={styles.nameHistIG}>{getNombreCurso(j.id).name}</Text>
            </>
        );
    };

    const goToCourse = async (idCurso) => {
        setLoading(true);

        await setStorageCurrentCourse(idCurso);
        setCursoSeleccionado(idCurso);

        const modulesResponse = await getModulesApi(idCurso);

        if (modulesResponse.ok) {
            var modulesRes = [];
            modulesResponse.modules.forEach((m) => {
                modulesRes.push({ module: m, open: false });
            });
            await setModules(modulesRes);
        } else {
            await setModules([]);
        }

        setLoading(false);
    }

    const selectCourseHistory = async (idCurso) => {
        await setIdCourseSelectedHistory(idCurso);
        await setCourseName(getNombreCurso(idCurso).name);
        await setCourseDescription(getNombreCurso(idCurso).description);
        refRBSheet_SelectCourse.current.open();
    };

    const openEditModuleOptions = async (module) => {
        const idCourse = cursoSeleccionado;
        const idUser = await getStorageItem(ID_USER);
        await setLoading(true);
        await setNameToEdit(module.Nombre);
        await setDescriptionToEdit(module.Descripcion);
        await setIsModuleToEdit(true);
        await setIsConfigDictationToEdit(false);
        await setIdModuleToEdit(module.id);
        await setIdConfigDictationToEdit(null);
        await setIdCourseToEdit(idCourse);
        await setLoading(false);

        const hasPermission = await hasPermissionEditCourseApi(idUser, idCourse);
        await setPermissionToEdit(hasPermission.ok && hasPermission.permiso);
        await setLoading(false);

        refRBSheet_EditModuleConfig.current.open();
    }

    const openEditConfigDictationOptions = async (config) => {
        const idCourse = cursoSeleccionado;
        const idUser = await getStorageItem(ID_USER);
        await setLoading(true);
        await setNameToEdit(config.Nombre);
        await setDescriptionToEdit(config.Descripcion);
        await setIsModuleToEdit(false);
        await setIsConfigDictationToEdit(true);
        await setIdModuleToEdit(null);
        await setIdConfigDictationToEdit(config.id);
        await setIdCourseToEdit(idCourse);
        await setLoading(false);

        const hasPermission = await hasPermissionEditCourseApi(idUser, idCourse);
        await setPermissionToEdit(hasPermission.ok && hasPermission.permiso);
        await setLoading(false);

        refRBSheet_EditModuleConfig.current.open();
    }

    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return loading ? (
        <Loading isVisible={true} text="Cargando" />
    ) : (
        <View style={styles.container}>
            <View style={styles.cursoStories}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableHighlight onPress={() => refRBSheet_NewCourse.current.open()}>
                        <>{iconHistory(-3, { id: 'Nuevo Curso' })}</>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={async () => {
                            setLoading(true);
                            selectCourseHistory(personalCourse);
                            setLoading(false);
                        }}
                    >
                        <>{iconHistory(-2, { id: personalCourse })}</>
                    </TouchableHighlight>
                    {courses || courses.length > 0 ? (
                        courses.map((j, index) => (
                            <TouchableHighlight
                                key={index}
                                onPress={async () => {
                                    setLoading(true);
                                    selectCourseHistory(j.id);
                                    setLoading(false);
                                }}
                            >
                                <>{iconHistory(index, j)}</>
                            </TouchableHighlight>
                        ))
                    ) : (
                        <></>
                    )}
                </ScrollView>
            </View>
            <View style={{ flex: 1, backgroundColor: BACKGROUNDHOME }}>
                <ScrollView>
                    {modules != null && modules.length > 0 ? (
                        modules.map((module, i) => (
                            <ListItem.Accordion
                                containerStyle={styles.itemsContainer}
                                content={
                                    <>
                                        <Icon
                                            type="material-community"
                                            name="playlist-music"
                                            iconStyle={styles.iconMenuLeft}
                                        />
                                        <ListItem.Content style={styles.items}>
                                            <ListItem.Title
                                                style={styles.title}
                                            >
                                                {module.module.Nombre}
                                            </ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                key={i}
                                isExpanded={module.open}
                                onPress={() => {
                                    open_closeModulePress(module);
                                }}
                                onLongPress={() => openEditModuleOptions(module.module)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                {module.module.configuracion_dictado.map(
                                    (config, j) => (
                                        <ListItem
                                            containerStyle={styles.subcontent}
                                            key={j}
                                            onPress={() => {
                                                open_summaryCreateDictation(
                                                    config,
                                                    module.module
                                                );
                                            }}
                                            onLongPress={() => openEditConfigDictationOptions(config)}
                                            delayLongPress={DELAY_LONG_PRESS}
                                            bottomDivider
                                        >
                                            <ListItem.Content
                                                style={styles.subitems}
                                            >
                                                <ListItem.Title
                                                    style={styles.title}
                                                >
                                                    {'      ' + config.Nombre}
                                                </ListItem.Title>
                                                <ListItem.Subtitle
                                                    style={{ color: 'black' }}
                                                >
                                                    {'    ' +
                                                        config.Descripcion}
                                                </ListItem.Subtitle>
                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    )
                                )}
                            </ListItem.Accordion>
                        ))
                    ) : (
                        <>
                            <Text
                                style={{ textAlign: 'center', marginTop: 20 }}
                            >
                                No existen módulos para el curso actual.
                            </Text>
                        </>
                    )}
                </ScrollView>

                {/* <Provider>
                    <Portal>
                        <Modal
                            visible={modalVisible}
                            onDismiss={hideModal}
                            contentContainerStyle={styles.containerModal}
                        >
                            <View
                                style={{
                                    height: '100%',
                                    backgroundColor: BACKGROUNDHOME,
                                }}
                            >
                                <ScrollView>
                                    <Tab.Navigator>
                                        <Tab.Screen
                                            name="Seleccionar"
                                            component={inscribirse}
                                        />
                                        <Tab.Screen
                                            name="Crear Curso"
                                            component={CrearCurso}
                                        />
                                    </Tab.Navigator>
                                </ScrollView>
                            </View>
                        </Modal>
                    </Portal>
                </Provider> */}

                <NewCourse
                    refRBSheet={refRBSheet_NewCourse}
                    isTeacher={true}
                    visibleOverlayInstitute={visibleOverlayInstitute}
                    setVisibleOverlayInstitute={setVisibleOverlayInstitute}
                    institutes={institutes}
                    instituteLocal={instituteLocal}
                    setInstituteLocal={setInstituteLocal}
                    courseNameLocal={courseNameLocal}
                    setCourseNameLocal={setCourseNameLocal}
                    courseDescriptionLocal={courseDescriptionLocal}
                    setCourseDescriptionLocal={setCourseDescriptionLocal}
                    updateAllCourses={updateAllCourses}
                    setUpdateAllCourses={setUpdateAllCourses}
                    courses={courses}
                    allCourses={allCourses}
                    updateCoursesStudent={updateCoursesStudent}
                    setUpdateCoursesStudent={setUpdateCoursesStudent}
                />

                <SelectCourse
                    refRBSheet={refRBSheet_SelectCourse}
                    goToCourse={goToCourse}
                    idCourse={idCourseSelectedHistory}
                    courseName={courseName}
                    courseDescription={courseDescription}
                    setUpdateCoursesStudent={setUpdateCoursesStudent}
                    updateCoursesStudent={updateCoursesStudent}
                    setUpdateAllCourses={setUpdateAllCourses}
                    updateAllCourses={updateAllCourses}
                    setPersonalCourseData={setPersonalCourseData}
                />

                <EditModuleConfig
                    refRBSheet={refRBSheet_EditModuleConfig}
                    isModule={isModuleToEdit}
                    isConfigDictation={isConfigDictationToEdit}
                    idCourse={idCourseToEdit}
                    idModule={idModuleToEdit}
                    idConfigDictation={idConfigDictationToEdit}
                    name={nameToEdit}
                    description={descriptionToEdit}
                    setUpdateCoursesStudent={setUpdateCoursesStudent}
                    updateCoursesStudent={updateCoursesStudent}
                    updateAllModules={updateAllModules}
                    setUpdateAllModules={setUpdateAllModules}
                    permissionToEdit={permissionToEdit}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentHistIG: {
        // backgroundColor: 'red',
        // borderWidth: 2,
        width: 80,
        height: 80,
        borderRadius: 40,
        paddingTop: 13,
        marginLeft: 5,
    },
    textHistIG: {
        fontSize: 40,
        width: 80,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    nameHistIG: {
        width: 80,
        textAlign: 'center',
    },
    iconMenuLeft: {
        color: PRIMARY_COLOR,
        // fontWeight: 'bold',
        paddingRight: 5,
        fontSize: 32,
    },
    coursesToAdd: {
        padding: 5,
        height: '6%',
        alignItems: 'center',
        backgroundColor: BACKGROUNDHOME,
    },
    textCourseModal: {
        alignSelf: 'center',
        color: TEXTHOME,
        fontWeight: 'bold',
        fontSize: 20,
    },
    containerModal: {
        // backgroundColor: BACKGROUNDHOME,
        // flex: 0.9,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        // alignSelf: 'center',
    },
    profileImgContainer: {
        marginLeft: 8,
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: -20,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BACKGROUNDHOME,
        marginTop: 10,
    },
    cursoStories: {
        backgroundColor: BACKGROUNDHOME,
        // flex: 0.15,
        // height: '11%',
        borderBottomWidth: 2,
        borderColor: QUARTER_COLOR,
    },
    itemsContainer: {
        flex: 1,
        marginTop: 15,
        backgroundColor: ITEMSHOME,
        flexDirection: 'row',
        width: '97%',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#470000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        elevation: 13,
    },
    items: {
        alignSelf: 'center',
    },
    title: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: 20,
    },
    subcontent: {
        borderLeftWidth: 2,
        borderLeftColor: SECONDARY_COLOR,
        width: '90%',
        alignSelf: 'center',
        // borderRadius: 10,
    },
    subitems: {
        // width: '90%',
        // alignSelf: 'center',
    },
    containerButtons: {
        marginTop: '20%',
    },
    containerButtonOk: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: PRIMARY_COLOR,
    },
    containerButtonCancel: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: QUARTER_COLOR,
    },
    content: {
        flexDirection: 'row',
        width: '100%',
    },
    contentListLeft: {
        textAlign: 'left',
        width: '80%',
    },
    contentListRight: {
        textAlign: 'right',
        width: '20%',
    },
    contentInstituteOption: {
        marginBottom: 15
    }
});
