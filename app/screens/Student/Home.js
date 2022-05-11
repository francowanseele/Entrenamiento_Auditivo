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
    getCursaCoursesStudent,
    addStudentCourse,
    getCursoPersonal,
    getConfigDictationApi,
} from '../../api/course';
import { Modal, Portal, Provider } from 'react-native-paper';

import {
    getStorageItem,
    ID_CURRENT_CURSE,
    ID_USER,
    setStorageCurrentCourse,
} from '../../../utils/asyncStorageManagement';
import Loading from '../../components/Loading';
import {
    PRIMARY_COLOR,
    QUARTER_COLOR,
    SECONDARY_COLOR,
    TERTIARY_COLOR,
} from '../../../utils/colorPalette';

export default function Home() {
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
    const [personalCourse, setPersonalCourse] = useState('');
    const [pressed, setPressed] = useState(-3);

    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

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

    const getNombreCurso = (idCourse) => {
        if (idCourse == personalCourse) {
            return 'Curso Personal';
        }
        if (idCourse == 'Nuevo Curso') {
            return 'Nuevo Curso';
        }
        for (let e in allCourses) {
            if (idCourse == allCourses[e].id) {
                return allCourses[e].Nombre;
            }
        }
    };

    const selectCoursePressed = async (courseSelect, courses) => {
        const idCurrent = await getStorageItem(ID_CURRENT_CURSE);
        var encontre = false;
        for (let i = 0; i < courses.length; i++) {
            const c = courses[i];
            if (c.id == idCurrent) {
                encontre = true;
                await setPressed(i);
            }
        }
        if (!encontre) {
            await setPressed(-2);
        }
    };

    useEffect(() => {
        setLoading(true);
        getStorageItem(ID_USER).then((idUser) => {
            if (idUser) {
                getCursoPersonal(idUser).then((resultPersonal) => {
                    if (resultPersonal.ok) {
                        setPersonalCourse(resultPersonal.curso_objeto.id);
                    }
                });

                getCursaCoursesStudent(idUser).then((result) => {
                    if (result.ok) {
                        setCourses(result.cursos);

                        if (result.cursos.length > 0) {
                            setCurrentCourse(result.cursos[0].id);
                            setStorageCurrentCourse(result.cursos[0].id);
                            selectCoursePressed(
                                result.cursos[0].id,
                                result.cursos
                            );
                        }
                        // setPressed(-2);
                    }
                });
                // getCursoPersonal(idUser).then((result) => {
                //     if (result.ok) {
                //         setPersonalCourse(result.curso_personal);
                //     }
                // });
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

    const configDictationIn = async (config, module) => {
        // setLoading(true);

        const configResut = await getConfigDictationApi(config.id);

        // setLoading(false);

        if (configResut.ok) {
            navigation.navigate('config_dictation', {
                configDictation: configResut.config,
                module: module,
            });
        }
    };
    const addStudentToCourse = (idCourse) => {
        hideModal();
        getStorageItem(ID_USER).then((idUser) => {
            if (idCourse) {
                addStudentCourse(idCourse, idUser).then((result) => {
                    if (result.ok) {
                        Alert.alert(
                            'Te has inscripto en un nuevo curso exitosamente'
                        );
                        setUpdateCoursesStudent(!updateCoursesStudent);
                    } else {
                        Alert.alert('No te has podido inscribir al curso');
                    }
                });
            } else {
                Alert.alert('No te has podido inscribir al curso');
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
                    {/* <Text>CP</Text> */}
                    {renderLetterCourse(getNombreCurso(j.id))}
                </View>
                <Text style={styles.nameHistIG}>{getNombreCurso(j.id)}</Text>
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

    const getCursesToSubscribe = (allCourses) => {
        var res = [];
        allCourses.forEach((c) => {
            var inCourse = false;
            courses.forEach((courseUser) => {
                if (c.id == courseUser.id) {
                    inCourse = true;
                }
            });
            if (!inCourse) {
                res.push(c);
            }
        });
        return res;
    };

    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return (
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
                            {iconHistory(-3, { id: 'Nuevo Curso' })}
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
                                Nuevo Curso
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
                            // await setPressed(-2);
                            // if (personalCourse) {
                            //     await setStorageCurrentCourse(personalCourse);
                            //     await setCurrentCourse(personalCourse);
                            // }
                            // await setLoading(false);
                        }}
                    >
                        <>
                            {iconHistory(-2, {
                                id: personalCourse,
                            })}
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
                    {courses ? (
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
                                    selectCourseHistory(j.id);
                                    setLoading(false);

                                    // await setLoading(true);
                                    // await setPressed(index);
                                    // if (j.curso_cursado) {
                                    //     await setStorageCurrentCourse(
                                    //         j.curso_cursado
                                    //     );
                                    //     await setCurrentCourse(j.curso_cursado);
                                    // }
                                    // await setLoading(false);
                                }}
                            >
                                <>
                                    {iconHistory(index, j)}
                                    {/* <Image
                                        source={{
                                            uri:
                                                'https://ui-avatars.com/api/?color=' +
                                                TEXTHOME +
                                                '&background=' +
                                                BACKGROUNDHOME +
                                                '&name=' +
                                                getNombreCurso(j.curso_cursado),
                                        }}
                                        style={styles.profileImg}
                                    />
                                    <Text style={{ alignSelf: 'center' }}>
                                        {getNombreCurso(j.curso_cursado)}
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
                            >
                                {module.module.configuracion_dictado.map(
                                    (config, j) => (
                                        <ListItem
                                            containerStyle={styles.subcontent}
                                            key={j}
                                            onPress={() => {
                                                configDictationIn(
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

                <Provider style={{ flex: 0.1 }}>
                    <Portal style={{ flex: 0.2 }}>
                        <Modal
                            visible={modalVisible}
                            onDismiss={hideModal}
                            contentContainerStyle={styles.containerModal}
                        >
                            <View style={styles.containerModal}>
                                <ScrollView styles={{ flex: 1 }}>
                                    {getCursesToSubscribe(allCourses).map(
                                        (e, i) => (
                                            <ListItem
                                                containerStyle={{
                                                    width: '100%',
                                                }}
                                                key={i}
                                                bottomDivider
                                                onPress={() => {
                                                    addStudentToCourse(e.id);
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
                                                        {e.Nombre}
                                                    </ListItem.Title>
                                                    <ListItem.Subtitle
                                                        style={{
                                                            color: 'black',
                                                            fontSize: 15,
                                                            color: PRIMARY_COLOR,
                                                        }}
                                                    >
                                                        {e.Descripcion}
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
                                            //     <Text
                                            //         key={index}
                                            //         style={styles.textCourseModal}
                                            //     >
                                            //         {e.nombre}
                                            //     </Text>
                                            // </TouchableOpacity>
                                        )
                                    )}
                                </ScrollView>
                            </View>
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
        color: PRIMARY_COLOR,
        paddingRight: 5,
        fontSize: 32,
    },
    container: {
        flexDirection: 'column',
        backgroundColor: BACKGROUNDHOME,
        marginTop: 10,
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
    //   profileImg: {

    //     height: 80,
    //     width: 80,
    //     borderRadius: 40,
    //   },
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
    title: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: 20,
    },
    subcontent: {
        borderLeftWidth: 2,
        borderLeftColor: SECONDARY_COLOR,
        //backgroundColor: ITEMSHOME,
        width: '90%',
        alignSelf: 'center',
        //borderRadius: 10,
    },
    subitems: {
        //width: '90%',
        //alignSelf: 'center',
    },
});
