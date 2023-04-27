import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';
import { ListItem, Icon } from '@rneui/themed';
import RBSheet from 'react-native-raw-bottom-sheet';

import OverlayPicker from './OverlayPicker';
import OverlayFormModule from './OverlayFormModule';
import { getCourseInstituteApi, getInstituteApi } from '../../api/institute';
import Loading from '../Loading';
import { getCursoPersonal, getModulesApi, getTeacherCourses } from '../../api/course';
import { PRIMARY_COLOR } from '../../../utils/colorPalette';
import {
    getStorageIsStudent,
    getStorageItem,
    ID_USER,
} from '../../../utils/asyncStorageManagement';

export default function BottomSheetInfoGral(props) {
    const {
        instituteGral,
        courseGral,
        moduleGral,
        nameConfigGral,
        descriptionConfigGral,
        setInstituteGral,
        setCourseGral,
        setModuleGral,
        setNameConfigGral,
        setDescriptionConfigGral,
        refRBSheet,
    } = props;
    // Institute
    const [institute, setInstitute] = useState({ id: null, name: '' });
    const [institutes, setInstitutes] = useState([]);
    // Course
    const [course, setCourse] = useState({ id: null, name: '' });
    const [courses, setCourses] = useState([]);
    // Module
    const [module, setModule] = useState({ id: null, name: '' });
    const [modules, setModules] = useState([]);
    // Configuration dictation
    const [nameConfig, setNameConfig] = useState('');
    const [descriptionConfig, setDescriptionConfig] = useState('');
    // Overlay
    const [visibleInstitute, setVisibleInstitute] = useState(false);
    const [visibleCourse, setVisibleCourse] = useState(false);
    const [visibleModule, setVisibleModule] = useState(false);
    const [titleOverlay, setTitleOverlay] = useState('');
    const [msjErrorOverlay, setMsjErrorOverlay] = useState('');
    const [visibleAddModule, setVisibleAddModule] = useState(false);

    const [isStudent, setIsStudent] = useState(true);

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setCourse({ id: null, name: '' });
    //     setModule({ id: null, name: '' });
    // }, [institute]);

    useEffect(() => {
        setModule({ id: null, name: '' });
    }, [course]);

    const initialStateOpen = async () => {
        // setInstitute(instituteGral);
        setCourse(courseGral);
        setModule(moduleGral);
        setNameConfig(nameConfigGral);
        setDescriptionConfig(descriptionConfigGral);

        var isStudentResponse = await getStorageIsStudent();
        setIsStudent(isStudentResponse);

        if (isStudentResponse) {
            // setInstitute({ id: '1', name: 'UTEC' });

            const idUser = await getStorageItem(ID_USER);
            const courseResult = await getCursoPersonal(idUser);
            await setCourse({
                id: courseResult.curso_objeto.id,
                name: courseResult.curso_objeto.Nombre,
            });
        }
    };

    // const editInstitute = async () => {
    //     setLoading(true);

    //     // Get institutes
    //     const institutesResult = await getInstituteApi();
    //     if (institutesResult.ok) {
    //         var resInstitutes = [];
    //         institutesResult.institutes.forEach((iRes) => {
    //             resInstitutes.push({ id: iRes.id, name: iRes.Nombre });
    //         });
    //         await setInstitutes(resInstitutes);
    //     }
    //     await setMsjErrorOverlay('');
    //     setTitleOverlay('Seleccionar Instituto');
    //     await setVisibleInstitute(!visibleInstitute);

    //     setLoading(false);
    // };

    const editCourse = async () => {
        setLoading(true);
        var idUser = await getStorageItem(ID_USER);

        Promise.all([getCursoPersonal(idUser), getTeacherCourses(idUser)]).then(async (values) => {
            const personalCourseResult = values[0];
            const coursesResult = values[1];

            if (
                personalCourseResult &&
                personalCourseResult.ok &&
                coursesResult &&
                coursesResult.ok
            ) {
                var resCourses = [];
                resCourses.push({
                    id: personalCourseResult.curso_objeto.id,
                    name: personalCourseResult.curso_objeto.Nombre,
                });
                coursesResult.cursos.forEach((cRes) => {
                    resCourses.push({ id: cRes.id, name: cRes.Nombre });
                });
                setCourses(resCourses);

                if (resCourses.length > 0) {
                    await setMsjErrorOverlay('');
                } else {
                    await setMsjErrorOverlay(
                        'No existen cursos a los que esté inscripto.'
                    );
                }
            }
          }).catch(async err => {
            await setMsjErrorOverlay(
                'No existen cursos a los que esté inscripto.'
            );
          });

        // Get courses
        // if (institute.id) {
            // const coursesResult = await getTeacherCourses(await getStorageItem(ID_USER));
            // // const coursesResult = await getCourseInstituteApi(institute.id);
            // if (coursesResult.ok) {
            //     var resCourses = [];
            //     coursesResult.cursos.forEach((cRes) => {
            //         resCourses.push({ id: cRes.id, name: cRes.Nombre });
            //     });
            //     setCourses(resCourses);

            //     if (resCourses.length > 0) {
            //         await setMsjErrorOverlay('');
            //     } else {
            //         await setMsjErrorOverlay(
            //             'No existen cursos para el instituto seleccionado (Vea el instituto que seleccionó).'
            //         );
            //     }
            // }
        // } else {
        //     await setMsjErrorOverlay(
        //         'No existen cursos para el instituto seleccionado (Vea el instituto que seleccionó).'
        //     );
        // }

        setTitleOverlay('Seleccionar Curso');
        await setVisibleCourse(!visibleCourse);
        setLoading(false);
    };

    const editModule = async () => {
        setLoading(true);

        // Get modules
        if (course.id) {
            const modulesResult = await getModulesApi(course.id);
            if (modulesResult.ok) {
                var resModules = [];
                modulesResult.modules.forEach((mRes) => {
                    resModules.push({ id: mRes.id, name: mRes.Nombre });
                });
                setModules(resModules);

                if (resModules.length > 0) {
                    await setMsjErrorOverlay('');
                } else {
                    await setMsjErrorOverlay(
                        'No existen módulos para el curso seleccionado. Cambie de curso o inserte nuevos módulos.'
                    );
                }
            }
        } else {
            await setMsjErrorOverlay(
                'No existen módulos para el curso seleccionado. Cambie de curso o inserte nuevos módulos.'
            );
        }

        setTitleOverlay('Seleccionar Módulo');
        await setVisibleModule(!visibleModule);
        setLoading(false);
    };

    const addModule = () => {
        setVisibleAddModule(true);
    };

    const onChangeNameConfig = (event) => {
        setNameConfig(event.nativeEvent.text);
    };

    const onChangeDescriptionConfig = (event) => {
        setDescriptionConfig(event.nativeEvent.text);
    };

    const confirmation = () => {
        // setInstituteGral(institute);
        setCourseGral(course);
        setModuleGral(module);
        setNameConfigGral(nameConfig);
        setDescriptionConfigGral(descriptionConfig);

        refRBSheet.current.close();
    };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            // closeOnPressMask={false}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={async () => {
                await initialStateOpen();
            }}
            height={Dimensions.get('window').height * 0.75}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                },
            }}
        >
            {loading ? (
                <Loading isVisible={true} text="Cargando" />
            ) : (
                <>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.titleBottom}>
                            Configuración general
                        </Text>
                        <Button
                            title="Confirmar"
                            onPress={() => confirmation()}
                            buttonStyle={{
                                backgroundColor: PRIMARY_COLOR,
                                paddingHorizontal: 15,
                                marginTop: 10,
                            }}
                        />
                    </View>
                    <ScrollView>
                        <View>
                            <Input
                                placeholder="Nombre"
                                containerStyle={styles.inputForm}
                                onChange={(e) => onChangeNameConfig(e)}
                                label="Nombre de la configuración"
                                value={nameConfig}
                            />
                            <Input
                                placeholder="Descripción"
                                containerStyle={styles.inputForm}
                                onChange={(e) => onChangeDescriptionConfig(e)}
                                label="Descripción de la configuración"
                                value={descriptionConfig}
                            />
                        </View>

                        {/* <ListItem key={0} bottomDivider>
                            <ListItem.Content style={styles.content}>
                                <View style={styles.contentListLeft}>
                                    <ListItem.Title>Instituto</ListItem.Title>
                                    <ListItem.Subtitle>
                                        {institute.name
                                            ? institute.name
                                            : 'Sin definir'}
                                    </ListItem.Subtitle>
                                </View>

                                <View style={styles.contentListRight}>
                                    {!isStudent ? (
                                        <Icon
                                            type="material-community"
                                            name="pencil-outline"
                                            onPress={() => editInstitute()}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </View>
                            </ListItem.Content>
                        </ListItem> */}

                        <ListItem key={0} bottomDivider>
                            <ListItem.Content style={styles.content}>
                                <View style={styles.contentListLeft}>
                                    <ListItem.Title>Courso</ListItem.Title>
                                    <ListItem.Subtitle>
                                        {course.name
                                            ? course.name
                                            : 'Sin definir'}
                                    </ListItem.Subtitle>
                                </View>

                                <View style={styles.contentListRight}>
                                    {!isStudent ? (
                                        <Icon
                                            type="material-community"
                                            name="pencil-outline"
                                            onPress={() => editCourse()}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </View>
                            </ListItem.Content>
                        </ListItem>

                        <ListItem key={1} bottomDivider>
                            <ListItem.Content style={styles.content}>
                                <View style={styles.contentListLeftTwo}>
                                    <ListItem.Title>Módulo</ListItem.Title>
                                    <ListItem.Subtitle>
                                        {module.name
                                            ? module.name
                                            : 'Sin definir'}
                                    </ListItem.Subtitle>
                                </View>
                                <View style={styles.contentListRightTwo}>
                                    <Icon
                                        type="material-community"
                                        name="plus-thick"
                                        onPress={() => addModule()}
                                        containerStyle={{ width: '50%' }}
                                    />
                                    <Icon
                                        type="material-community"
                                        name="pencil-outline"
                                        onPress={() => editModule()}
                                        containerStyle={{ width: '50%' }}
                                    />
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    </ScrollView>
                </>
            )}

            {/* <OverlayPicker
                visible={visibleInstitute}
                setVisible={setVisibleInstitute}
                values={institutes}
                setValue={setInstitute}
                msjErrorOverlay={msjErrorOverlay}
                titleOverlay={titleOverlay}
            /> */}
            <OverlayPicker
                visible={visibleCourse}
                setVisible={setVisibleCourse}
                values={courses}
                setValue={setCourse}
                msjErrorOverlay={msjErrorOverlay}
                titleOverlay={titleOverlay}
            />
            <OverlayPicker
                visible={visibleModule}
                setVisible={setVisibleModule}
                values={modules}
                setValue={setModule}
                msjErrorOverlay={msjErrorOverlay}
                titleOverlay={titleOverlay}
            />
            <OverlayFormModule
                visible={visibleAddModule}
                setVisible={setVisibleAddModule}
                idCourse={course.id}
                nameCourse={course.name}
                setModule={setModule}
            />
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    listOne: {
        marginTop: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        textAlign: 'left',
    },
    titleSingle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonRight: {
        textAlign: 'right',
    },
    content: {
        flexDirection: 'row',
        width: '100%',
    },
    contentTitle: {
        flexDirection: 'row',
        margin: 10,
    },
    contentListLeft: {
        textAlign: 'left',
        width: '80%',
    },
    contentListLeftTwo: {
        textAlign: 'left',
        width: '70%',
    },
    contentListRight: {
        textAlign: 'right',
        width: '20%',
    },
    contentListRightTwo: {
        flexDirection: 'row',
        textAlign: 'right',
        width: '30%',
    },
    inputForm: {
        width: '100%',
        marginTop: 20,
    },
    titleBottom: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '70%',
    },
});
