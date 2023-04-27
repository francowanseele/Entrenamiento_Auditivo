import React, {useState} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { ListItem, Icon } from '@rneui/themed';
import RBSheet from 'react-native-raw-bottom-sheet';
import { PRIMARY_COLOR, QUARTER_COLOR } from '../../../utils/colorPalette';
import { CLOSE_BOTTOM_SHEET } from '../../../utils/constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OverlayPicker from '../CreateDictationProf/OverlayPicker';
import { addCourseApi, addStudentCourse, addTeacherCourse } from '../../api/course';
import { getStorageItem, ID_USER } from '../../../utils/asyncStorageManagement';

export default function NewCourse(props) {
    const {
        refRBSheet,
        isTeacher,
        visibleOverlayInstitute,
        setVisibleOverlayInstitute,
        institutes,
        instituteLocal,
        setInstituteLocal,
        courseNameLocal,
        setCourseNameLocal,
        courseDescriptionLocal,
        setCourseDescriptionLocal,
        updateAllCourses,
        setUpdateAllCourses,
        courses,
        allCourses,
        updateCoursesStudent,
        setUpdateCoursesStudent,
    } = props;

    const [bootomSheetType, setBootomSheetType] = useState('');
    const [height, setHeight] = useState(isTeacher ? 0.5 : 0.75);

    const onPressSubmit = async () => {
        if (courseNameLocal != '' && courseDescriptionLocal != '') {
            const idUser = await getStorageItem(ID_USER);
            const data = {
                name: courseNameLocal,
                description: courseDescriptionLocal,
                personal: false,
                idInstitute: instituteLocal.id,
                idUser: parseInt(idUser),
            };
            addCourseApi(data).then((result) => {
                if (result.ok) {
                    Alert.alert('Nuevo curso creado exitosamente');
                    setCourseNameLocal('');
                    setCourseDescriptionLocal('');
                    setUpdateAllCourses(!updateAllCourses);
                    refRBSheet.current.close();
                } else {
                    Alert.alert('No se ha podrido crear el curso');
                }
            });
        } else {
            Alert.alert('El nombre o descripcion son vacios');
        }
    };

    const selectInstitute = async () => {
        setVisibleOverlayInstitute(!visibleOverlayInstitute);
    }

    const initialStateOpen = async () => {
        if (isTeacher) {
            await setHeight(0.5);
            await setBootomSheetType('');

            await setCourseNameLocal('');
            await setCourseDescriptionLocal('');
            await setInstituteLocal(institutes[0]);
        } else {
            await setHeight(0.75);
            await setBootomSheetType('selectCourse');
        }
    }

    const selectCourse = () => {
        refRBSheet.current.close();
        setTimeout(async () => {
            await setHeight(0.8);
            refRBSheet.current.open();
            setTimeout(async () => {
                await setBootomSheetType('selectCourse');
            }, 10);
        }, CLOSE_BOTTOM_SHEET);
    }

    const createCourse = () => {
        refRBSheet.current.close();
        setTimeout(async () => {
            await setHeight(0.8);
            refRBSheet.current.open();
            setTimeout(async () => {
                await setBootomSheetType('createCourse');
            }, 10);
        }, CLOSE_BOTTOM_SHEET);
    }

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

    const courseSelected = (idCourse) => {
        if (isTeacher) {
            addTeacherToCourse(idCourse);
        } else {
            addStudentToCourse(idCourse);
        }
    }

    const addTeacherToCourse = (idCourse) => {
        refRBSheet.current.close();
        getStorageItem(ID_USER).then((idUser) => {
            if (idCourse) {
                addTeacherCourse(idCourse, idUser).then((result) => {
                    if (result.ok) {
                        Alert.alert(
                            'Te has matriculado a un nuevo curso!'
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

    const addStudentToCourse = (idCourse) => {
        refRBSheet.current.close();
        getStorageItem(ID_USER).then((idUser) => {
            if (idCourse) {
                addStudentCourse(idCourse, idUser).then((result) => {
                    if (result.ok) {
                        Alert.alert(
                            'Te has matriculado a un nuevo curso!'
                        );
                        setUpdateCoursesStudent(!updateCoursesStudent);
                    } else {
                        Alert.alert('No te has podido matricular al curso');
                    }
                });
            } else {
                Alert.alert('No te has podido matricular al curso');
            }
        });
    };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={async () => {
                await initialStateOpen();
            }}
            height={Dimensions.get('window').height * height}
            closeDuration={CLOSE_BOTTOM_SHEET}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                },
            }}
        >
            <View style={{marginBottom: 35}}>
                {bootomSheetType == 'createCourse' ? (
                    <View style={styles.containerConfirmation}>
                        <ScrollView
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                            }}
                        >
                            <Text style={styles.confirmationTitle}>
                                Crear Curso
                            </Text>
                            <Input
                                placeholder="Nombre"
                                onChange={(e) =>
                                    setCourseNameLocal(e.nativeEvent.text)
                                }
                                label={'Nombre del Curso'}
                                value={courseNameLocal}
                            />

                            <Input
                                placeholder="Nombre"
                                onChange={(e) =>
                                    setCourseDescriptionLocal(
                                        e.nativeEvent.text
                                    )
                                }
                                label={'Descripción del Curso'}
                                value={courseDescriptionLocal}
                            />

                            {institutes && institutes.length > 1 && (
                                <View style={styles.contentInstituteOption}>
                                    <ListItem key={0}>
                                        <ListItem.Content
                                            style={styles.content}
                                        >
                                            <View
                                                style={styles.contentListLeft}
                                            >
                                                <ListItem.Title>
                                                    Instituto
                                                </ListItem.Title>
                                                <ListItem.Subtitle>
                                                    {instituteLocal
                                                        ? instituteLocal.name
                                                        : ''}
                                                </ListItem.Subtitle>
                                            </View>

                                            <View
                                                style={styles.contentListRight}
                                            >
                                                <Icon
                                                    type="material-community"
                                                    name="pencil-outline"
                                                    onPress={() =>
                                                        selectInstitute()
                                                    }
                                                />
                                            </View>
                                        </ListItem.Content>
                                    </ListItem>
                                </View>
                            )}

                            <View style={styles.containerButtons}>
                                <Button
                                    buttonStyle={styles.containerButtonOk}
                                    title="Crear"
                                    onPress={onPressSubmit}
                                />
                                <Button
                                    buttonStyle={styles.containerButtonCancel}
                                    title="Cancelar"
                                    onPress={() =>
                                        refRBSheet.current.close()
                                    }
                                />
                            </View>
                        </ScrollView>
                    </View>
                ) : bootomSheetType == 'selectCourse' ? (
                    <View style={styles.containerConfirmation}>
                        <Text style={styles.editTitle}>Matricularme</Text>
                        {getCursesToSubscribe(allCourses).length == 0 ? (
                            <View>
                                <Text>No tiene cursos disponibles para matricularse.</Text>
                            </View>
                        ) : (
                            <ScrollView>
                                {getCursesToSubscribe(allCourses).map((e, i) => (
                                    <ListItem
                                        containerStyle={{ width: '100%' }}
                                        key={i}
                                        bottomDivider
                                        onPress={() => {
                                            courseSelected(e.id);
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
                                ))}
                            </ScrollView>
                        )}
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity
                            style={styles.container}
                            onPress={selectCourse}
                        >
                            <Icon
                                name="arrow-right-bold-box-outline"
                                type="material-community"
                                iconStyle={styles.iconOption}
                            />
                            <Text style={styles.options}>Matricularme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.container}
                            onPress={createCourse}
                        >
                            <Icon
                                name="plus"
                                type="material-community"
                                iconStyle={styles.iconOption}
                            />
                            <Text style={styles.options}>Crear curso</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {isTeacher && (
                    <OverlayPicker
                        visible={visibleOverlayInstitute}
                        setVisible={setVisibleOverlayInstitute}
                        values={institutes}
                        setValue={setInstituteLocal}
                        msjErrorOverlay={''}
                        titleOverlay={'Seleccionar Instituto'}
                    />
                )}
            </View>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
    },
    iconOption: {
        fontSize: 20,
        paddingVertical: 10,
        paddingLeft: 25,
        paddingRight: 5,
        color: PRIMARY_COLOR,
    },
    options: {
        fontSize: 18,
        paddingRight: 15,
        paddingVertical: 10,
    },
    confirmationTitle: {
        fontSize: 18,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    editTitle: {
        fontSize: 18,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    confirmationText: {
        fontSize: 20,
        paddingHorizontal: 15,
    },
    containerConfirmation: {
        position: 'relative',
        height: '100%',
    },
    containerButtons: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        marginBottom: '20%',
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
