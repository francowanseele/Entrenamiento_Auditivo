import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {
    BACKGROUNDHOME,
    TEXTHOME,
    ITEMSHOME,
    TOPSCREENHOME,
} from '../../styles/styleValues';
import {
    getModulesApi,
    getAllCourse,
    addTeacherCourse,
    getCursoPersonal,
    getTeacherCourses,
    crearNuevoCurso,
    addCourseApi,
} from '../../api/course';
import { Modal, Portal, Provider, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import {
    getStorageItem,
    ID_CURRENT_CURSE,
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
    TERTIARY_COLOR,
} from '../../../utils/colorPalette';
import { addCourseToInstituteApi } from '../../api/institute';

export default function DictationProf() {
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation();
    const [modules, setModules] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [updateCoursesStudent, setUpdateCoursesStudent] = useState(false);
    const [updateAllCourses, setUpdateAllCourses] = useState(false);
    const [personalCourse, setPersonalCourse] = useState('');
    const [pressed, setPressed] = useState(-3);

    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const open_summaryCreateDictation = (config, module) => {
        navigation.navigate('summaryDictaction', {
            dictationRhythmic: null,
            institute: 'falta',
            course: { name: getNombreCurso(cursoSeleccionado) },
            module: { name: module.nombre },
            nameConfig: config.nombre,
            descriptionConfig: config.descripcion,
            giro_melodico_regla: config.giro_melodico_regla,
            notas_inicio: config.notas_inicio,
            notas_fin: config.notas_fin,
            clave_prioridad: config.clave_prioridad,
            escala_diatonica_regla: config.escala_diatonica_regla,
            nota_base: config.nota_base,
            nro_compases: config.nro_compases,
            simple: config.simple,
            compas_regla: config.compas_regla,
            celula_ritmica_regla: config.celula_ritmica_regla,
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
                    if (curso.personal == false) {
                        publicCourses.push({
                            _id: curso._id,
                            descripcion: curso.descripcion,
                            nombre: curso.nombre,
                            personal: curso.personal,
                        });
                    }
                });

                setAllCourses(publicCourses);
            }
        });

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
        getAllCourse().then((result) => {
            if (result.ok) {
                var publicCourses = [];
                result.cursos.forEach((curso) => {
                    if (curso.personal == false) {
                        publicCourses.push({
                            _id: curso._id,
                            descripcion: curso.descripcion,
                            nombre: curso.nombre,
                            personal: curso.personal,
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
            return 'Curso Personal';
        }
        if (idCourse == 'Nuevo Curso') {
            return 'Nuevo Curso';
        }
        for (let e in allCourses) {
            if (idCourse == allCourses[e]._id) {
                return allCourses[e].nombre;
            }
        }
    };

    const getCurso = (idCourse) => {
        for (let e in courses) {
            if (idCourse == courses[e]._id) {
                return courses[e];
            }
        }
    };

    const selectCoursePressed = async (courseSelect, courses) => {
        const idCurrent = await getStorageItem(ID_CURRENT_CURSE);
        var encontre = false;
        for (let i = 0; i < courses.length; i++) {
            const c = courses[i];
            if (c.curso == idCurrent) {
                encontre = true;
                setPressed(i);
            }
        }
        if (!encontre) {
            setPressed(-2);
        }
    };

    useEffect(() => {
        setLoading(true);
        getStorageItem(ID_USER).then((idUser) => {
            if (idUser) {
                getCursoPersonal(idUser).then((result) => {
                    if (result.ok) {
                        setPersonalCourse(result.curso_personal);
                    }
                });

                getTeacherCourses(idUser).then((result) => {
                    if (result.ok) {
                        setCourses(result.cursos);

                        if (result.cursos.length > 0) {
                            setCurrentCourse(result.cursos[0]);
                            setStorageCurrentCourse(result.cursos[0].curso);
                        }
                        // setPressed(-0);
                        // selectCoursePressed(result.cursos[0].curso, courses);
                        selectCoursePressed(
                            result.cursos[0].curso,
                            result.cursos
                        );
                    }
                });
            }
        });
        setLoading(false);
    }, [updateCoursesStudent]);

    const open_closeModulePress = (module) => {
        var modRes = [];
        modules.forEach((m) => {
            if (m.module._id == module.module._id) {
                modRes.push({ module: m.module, open: !m.open });
            } else {
                modRes.push({ module: m.module, open: m.open });
            }
        });
        setModules(modRes);
    };

    const addStudentToCourse = (idCourse) => {
        hideModal();
        getStorageItem(ID_USER).then((idUser) => {
            if (idCourse) {
                addTeacherCourse(idCourse, idUser).then((result) => {
                    if (result.ok) {
                        Alert.alert(
                            'Nuevo curso a dictar agregado exitosamente'
                        );
                        setUpdateCoursesStudent(!updateCoursesStudent);
                    } else {
                        Alert.alert('No se ha podrido agregar el curso');
                    }
                });
            } else {
                Alert.alert('No se ha podrido agregar el curso');
            }
        });
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

    const getCursesToSubscribe = (allCourses) => {
        var res = [];
        allCourses.forEach((c) => {
            var inCourse = false;
            courses.forEach((courseUser) => {
                if (c._id == courseUser.curso) {
                    inCourse = true;
                }
            });
            if (!inCourse) {
                res.push(c);
            }
        });
        return res;
    };

    const inscribirse = () => {
        return (
            <View
                style={
                    {
                        // flex: 1,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                    }
                }
            >
                {/* <ScrollView styles={{ flex: 1 }}> */}
                <ScrollView>
                    {getCursesToSubscribe(allCourses).map((e, i) => (
                        <ListItem
                            containerStyle={{ width: '100%' }}
                            key={i}
                            bottomDivider
                            onPress={() => {
                                addStudentToCourse(e._id);
                            }}
                        >
                            {/* <Icon name={item.icon} /> */}
                            <ListItem.Content>
                                <ListItem.Title
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                    }}
                                >
                                    {e.nombre}
                                </ListItem.Title>
                                <ListItem.Subtitle
                                    style={{
                                        color: 'black',
                                        fontSize: 15,
                                        color: PRIMARY_COLOR,
                                    }}
                                >
                                    {e.descripcion}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>

                        // <TouchableOpacity
                        //     onPress={() => {
                        //         addStudentToCourse(e._id);
                        //     }}
                        //     key={index}
                        //     style={styles.coursesToAdd}
                        // >
                        //     <Text key={index} style={styles.textCourseModal}>
                        //         {e.nombre}
                        //     </Text>
                        // </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    // const inscribirse = () => {
    //     // if (!allCourses) return <Loading isVisible={true} text="Cargando" />;
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             {console.log(allCourses)}
    //             {console.log('-------------------')}
    //             {console.log(allCourses[0].nombre)}
    //             <ScrollView styles={{ flex: 1 }}>
    //                 {allCourses.map((e, index) => (
    //                     // <Text>{e.nombre}</Text>
    //                     <TouchableOpacity
    //                         onPress={() => {
    //                             addStudentToCourse(e._id);
    //                         }}
    //                         key={index}
    //                         style={styles.coursesToAdd}
    //                     >
    //                         <Text style={styles.textCourseModal}>
    //                             {e.nombre}
    //                         </Text>
    //                     </TouchableOpacity>
    //                 ))}
    //             </ScrollView>
    //         </View>
    //     );
    // };

    const crearCurso = () => {
        const [nombreValue, setNombre] = useState('');
        const [descripcion, setDescripcion] = useState('');
        const onPressSubmit = () => {
            if (nombreValue != '' && descripcion != '') {
                const data = {
                    name: nombreValue,
                    description: descripcion,
                    personal: false,
                };
                addCourseApi(data).then((result) => {
                    if (result.ok) {
                        const dataCourse = {
                            idCourse: result.course._id,
                        };

                        addCourseToInstituteApi(dataCourse).then(
                            (resultInstitute) => {
                                if (resultInstitute.ok) {
                                    Alert.alert(
                                        'Nuevo curso creado exitosamente'
                                    );
                                    setNombre('');
                                    setDescripcion('');
                                    setUpdateAllCourses(!updateAllCourses);
                                    hideModal;
                                } else {
                                    Alert.alert(
                                        'No se ha podrido crear el curso'
                                    );
                                }
                            }
                        );
                    } else {
                        Alert.alert('No se ha podrido crear el curso');
                    }
                });

                // crearNuevoCurso(nombreValue, descripcion).then((result) => {
                //     if (result.ok) {
                //         Alert.alert('Nuevo curso creado exitosamente');
                //         setNombre('');
                //         setDescripcion('');
                //         setUpdateAllCourses(!updateAllCourses);
                //         hideModal;
                //     } else {
                //         Alert.alert('No se ha podrido crear el curso');
                //     }
                // });
            } else {
                Alert.alert('El nombre o descripcion son vacios');
            }
        };
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: BACKGROUNDHOME,
                }}
            >
                <Text style={{ height: 30, color: TEXTHOME, marginTop: 30 }}>
                    Nombre de Curso
                </Text>
                <TextInput
                    style={{ height: 30, width: '80%' }}
                    onChangeText={(text) => setNombre(text)}
                    value={nombreValue}
                ></TextInput>

                <Text style={{ height: 30, color: TEXTHOME, marginTop: 30 }}>
                    Descripcion de Curso
                </Text>
                <TextInput
                    style={{ height: 30, width: '80%' }}
                    value={descripcion}
                    onChangeText={(text) => setDescripcion(text)}
                ></TextInput>

                <TouchableHighlight
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        alignItems: 'center',
                    }}
                    onPress={onPressSubmit}
                >
                    <Text
                        style={{ height: 30, color: TEXTHOME, marginTop: 10 }}
                    >
                        {' '}
                        Crear{' '}
                    </Text>
                </TouchableHighlight>
            </View>
        );
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
                            borderColor: getColor(j.curso),
                            borderWidth: getBorderWith(j.curso),
                        },
                    ]}
                >
                    {renderLetterCourse(getNombreCurso(j.curso))}
                </View>
                <Text style={styles.nameHistIG}>{getNombreCurso(j.curso)}</Text>
            </>
        );
    };

    const selectCourseHistory = async (idCurso) => {
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
    };

    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return loading ? (
        <Loading isVisible={true} text="Cargando" />
    ) : (
        <View style={styles.container}>
            <View style={styles.cursoStories}>
                <ScrollView
                    // style={{ flex: 0.2 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableHighlight
                        // style={[
                        //     styles.profileImgContainer,
                        //     { borderColor: TEXTHOME, borderWidth: 2 },
                        // ]}
                        onPress={showModal}
                    >
                        <>
                            {iconHistory(-3, { curso: 'Nuevo Curso' })}
                            {/* <Image
                                source={{
                                    uri:
                                        'https://ui-avatars.com/api/?color=' +
                                        TEXTHOME +
                                        '&background=' +
                                        BACKGROUNDHOME +
                                        '&name=Nuevo',
                                }}
                                style={styles.profileImg}
                            />
                            <Text style={{ alignSelf: 'center' }}>
                                Nuevo personal
                            </Text> */}
                        </>
                    </TouchableHighlight>
                    <TouchableHighlight
                        // style={[
                        //     styles.profileImgContainer,
                        //     { borderColor: getColor(-2), borderWidth: 2 },
                        // ]}
                        onPress={async () => {
                            setLoading(true);
                            selectCourseHistory(personalCourse);
                            setLoading(false);

                            // await setLoading(true);
                            // if (personalCourse) {
                            //     await setPressed(-2);
                            //     await setStorageCurrentCourse(personalCourse);
                            //     await setCurrentCourse(personalCourse);
                            // }
                            // await setLoading(false);
                        }}
                    >
                        <>
                            {iconHistory(-2, { curso: personalCourse })}
                            {/* <Image
                                source={{
                                    uri:
                                        'https://ui-avatars.com/api/?color=' +
                                        TEXTHOME +
                                        '&background=' +
                                        BACKGROUNDHOME +
                                        '&name=Personal',
                                }}
                                style={styles.profileImg}
                            />
                            <Text style={{ alignSelf: 'center' }}>
                                Curso personal
                            </Text> */}
                        </>
                    </TouchableHighlight>
                    {courses || courses.length > 0 ? (
                        courses.map((j, index) => (
                            <TouchableHighlight
                                key={index}
                                // style={[
                                //     styles.profileImgContainer,
                                //     {
                                //         borderColor: getColor(index),
                                //         borderWidth: 5,
                                //     },
                                // ]}
                                onPress={async () => {
                                    setLoading(true);
                                    selectCourseHistory(j.curso);
                                    setLoading(false);

                                    // await setLoading(true);
                                    // if (j.curso) {
                                    //     await setPressed(index);
                                    //     await setStorageCurrentCourse(j.curso);
                                    //     await setCurrentCourse(j.curso);
                                    // }
                                    // await setLoading(false);
                                }}
                            >
                                <>
                                    {iconHistory(index, j)}
                                    {/* <View
                                        style={[
                                            styles.contentHistIG,
                                            {
                                                borderColor: getColor(index),
                                                borderWidth:
                                                    getBorderWith(index),
                                            },
                                        ]}
                                    >
                                        <Text style={styles.textHistIG}>A</Text>
                                    </View>
                                    <Text style={styles.nameHistIG}>
                                        {getNombreCurso(j.curso)}
                                    </Text> */}
                                </>
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
                                                {module.module.nombre}
                                            </ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                key={i}
                                isExpanded={module.open}
                                onPress={() => {
                                    open_closeModulePress(module);
                                }}
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
                                            bottomDivider
                                        >
                                            <ListItem.Content
                                                style={styles.subitems}
                                            >
                                                <ListItem.Title
                                                    style={styles.title}
                                                >
                                                    {'      ' + config.nombre}
                                                </ListItem.Title>
                                                <ListItem.Subtitle
                                                    style={{ color: 'black' }}
                                                >
                                                    {'    ' +
                                                        config.descripcion}
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

                <Provider style={{ flex: 0.1 }}>
                    <Portal style={{ flex: 0.2 }}>
                        <Modal
                            visible={modalVisible}
                            onDismiss={hideModal}
                            contentContainerStyle={styles.containerModal}
                        >
                            <Tab.Navigator>
                                <Tab.Screen
                                    name="Seleccionar"
                                    component={inscribirse}
                                />
                                <Tab.Screen
                                    name="Crear Curso"
                                    component={crearCurso}
                                />
                            </Tab.Navigator>
                        </Modal>
                    </Portal>
                </Provider>
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
        color: TEXTHOME,
        fontWeight: 'bold',
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
        backgroundColor: BACKGROUNDHOME,
        flex: 0.9,
        width: '90%',
        height: '90%',
        borderRadius: 10,
        alignSelf: 'center',
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
        color: TEXTHOME,
        fontWeight: 'bold',
        fontSize: 20,
    },
    subcontent: {
        borderWidth: 1,
        backgroundColor: ITEMSHOME,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    subitems: {
        width: '90%',
        alignSelf: 'center',
    },
});
