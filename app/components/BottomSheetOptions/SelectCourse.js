import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getParams, getStorageIsAdmin, setStorageCurrentCourse } from '../../../utils/asyncStorageManagement';
import { BACKGROUND_COLOR_WRONG, BORDER_COLOR_WRONG, FIFTH_COLOR, PRIMARY_COLOR, QUARTER_COLOR, TERTIARY_COLOR, TEXT_COLOR_WRONG } from '../../../utils/colorPalette';
import { CLOSE_BOTTOM_SHEET } from '../../../utils/constants';
import { editCourseApi, removeCourseApi, unregisterStudentFromCourseApi, unregisterTeacherFromCourseApi } from '../../api/course';

export default function SelectCourse(props) {
    const {
        refRBSheet,
        goToCourse,
        idCourse,
        courseName,
        courseDescription,
        setUpdateCoursesStudent,
        updateCoursesStudent,
        setUpdateAllCourses,
        updateAllCourses,
        setPersonalCourseData,
    } = props;

    const [bootomSheetType, setBootomSheetType] = useState('');
    const [showUnregisterOption, setShowUnregisterOption] = useState(true);
    const [showDeleteOption, setShowDeleteOption] = useState(false);

    // Bootom sheet - Confirmation
    const [confirmationTitle, setConfirmationTitle] = useState('');
    const [confirmationText, setConfirmationText] = useState('');

    // Bottom sheet - Edit
    const [courseNameLocal, setCourseNameLocal] = useState('');
    const [courseDescriptionLocal, setCourseDescriptionLocal] = useState('');
    const [isStudentLocal, setIsStudentLocal] = useState(false);

    const [height, setHeight] = useState(0.5);

    const initialStateOpen = async () => {
        setBootomSheetType('');
        setHeight(0.5);

        const {idPersonalCourse, isStudent } = await getParams();
        const isAdmin = await getStorageIsAdmin();
        await setIsStudentLocal(isStudent == '1');
        await setShowUnregisterOption(idPersonalCourse != idCourse);
        await setShowDeleteOption(idPersonalCourse != idCourse && isAdmin);
        await setCourseNameLocal(courseName);
        await setCourseDescriptionLocal(courseDescription);
    };

    const goToCourseOption = () => {
        refRBSheet.current.close();
        goToCourse(idCourse);
    }

    const editOption = async () => {
        refRBSheet.current.close();
        setTimeout(async () => {
            await setHeight(0.8);
            refRBSheet.current.open();
            setTimeout(async () => {
                await setBootomSheetType('edit');
            }, 10);
        }, CLOSE_BOTTOM_SHEET);
        
    }

    const unregisterCourse = async () => {
        const { id, isStudent, idPersonalCourse } = await getParams();
        const data = {
            idUser: parseInt(id), 
            idCourse: idCourse,
        };
        if (isStudentLocal){
            const result = await unregisterStudentFromCourseApi(data);
            if (result.ok) {
                refRBSheet.current.close();
            }
        } else {
            const result = await unregisterTeacherFromCourseApi(data);
            if (result.ok) {
                refRBSheet.current.close();
            }
        }

        await setStorageCurrentCourse(idPersonalCourse);
        await setUpdateCoursesStudent(!updateCoursesStudent);
    }

    const unregisterCourseOption = () => {
        setConfirmationTitle('Desmatricularse');
        setConfirmationText('¿Está seguro que desea desmatricularse del curso ' + courseName + '?');
        setBootomSheetType('unregister');
    }

    const deleteCourseOption = () => {
        setConfirmationTitle('Eliminar');
        setConfirmationText('¿Está seguro que desea eliminar el curso ' + courseName + '? Los estudiantes que estén inscriptos a este curso serán desmatriculados automáticamente.');
        setBootomSheetType('delete');
    }

    const deleteCourse = async () => {
        const { idPersonalCourse } = await getParams();
        const result = await removeCourseApi(idCourse);
        if (result.ok) {
            Alert.alert('Curso eliminado correctamente.')
        } else {
            Alert.alert('Algo sucedió mal, no se pudo eliminar el curso :(')
        }

        refRBSheet.current.close();
        await setStorageCurrentCourse(idPersonalCourse);
        await setUpdateCoursesStudent(!updateCoursesStudent);
    }

    const editCourse = async () => {
        const { id, idPersonalCourse } = await getParams();
        const data = {
            name: courseNameLocal, 
            description: courseDescriptionLocal,
        };
        const courseEdited = await editCourseApi(data, idCourse, id);
        if (courseEdited.ok) {
            refRBSheet.current.close();
        }

        await setUpdateCoursesStudent(!updateCoursesStudent);
        await setUpdateAllCourses(!updateAllCourses);
        if (idCourse == idPersonalCourse) {
            await setPersonalCourseData({
                name: courseNameLocal,
                description: courseDescriptionLocal,
            });
        }
    }

    const onChangeCourseNameLocal = (event) => {
        setCourseNameLocal(event.nativeEvent.text);
    };

    const onChangeCourseDescriptionLocal = (event) => {
        setCourseDescriptionLocal(event.nativeEvent.text);
    };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={() => {
                initialStateOpen();
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
            {bootomSheetType == 'unregister' ? (
                <View style={styles.containerConfirmation}>
                    <Text style={styles.confirmationTitle}>
                        {confirmationTitle}
                    </Text>
                    <Text style={styles.confirmationText}>
                        {confirmationText}
                    </Text>
                    <View style={styles.containerButtons}>
                        <Button
                            buttonStyle={styles.containerButtonOk}
                            title="Confirmar"
                            onPress={unregisterCourse}
                        />
                        <Button
                            buttonStyle={styles.containerButtonCancel}
                            title="Cancelar"
                            onPress={() => setBootomSheetType('')}
                        />
                    </View>
                </View>
            ) : bootomSheetType == 'edit' ? (
                <View style={styles.containerConfirmation}>
                    <Text style={styles.editTitle}>Editar curso</Text>
                    <Input
                        placeholder="Nombre"
                        // containerStyle={styles.inputForm}
                        onChange={(e) => onChangeCourseNameLocal(e)}
                        label="Nombre del curso"
                        value={courseNameLocal}
                    />
                    <Input
                        placeholder="Descripción"
                        // containerStyle={styles.inputForm}
                        onChange={(e) => onChangeCourseDescriptionLocal(e)}
                        label="Descripción del curso"
                        value={courseDescriptionLocal}
                    />
                    <View style={styles.containerButtons}>
                        <Button
                            buttonStyle={styles.containerButtonOk}
                            title="Confirmar"
                            onPress={editCourse}
                        />
                        <Button
                            buttonStyle={styles.containerButtonCancel}
                            title="Cancelar"
                            onPress={() => refRBSheet.current.close()}
                        />
                    </View>
                </View>
            ) : bootomSheetType == 'delete' ? (
                <View style={styles.containerConfirmation}>
                    <Text style={styles.confirmationTitle}>
                        {confirmationTitle}
                    </Text>
                    <Text style={styles.confirmationText}>
                        {confirmationText}
                    </Text>
                    <View style={styles.containerButtons}>
                        <Button
                            buttonStyle={styles.containerButtonOkDelete}
                            title="Eliminar"
                            onPress={deleteCourse}
                        />
                        <Button
                            buttonStyle={styles.containerButtonOk}
                            title="Cancelar"
                            onPress={() => setBootomSheetType('')}
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <View style={styles.containerCourseInfo}>
                        <Text style={styles.textCourseName}>{courseName}</Text>
                        <Text style={styles.textCourseDescription}>{courseDescription}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.container}
                        onPress={goToCourseOption}
                    >
                        <Icon
                            name="arrow-right-bold-box-outline"
                            type="material-community"
                            iconStyle={styles.iconOption}
                        />
                        <Text style={styles.options}>Ir al curso</Text>
                    </TouchableOpacity>
                    {!isStudentLocal && (
                        <TouchableOpacity
                            style={styles.container}
                            onPress={editOption}
                        >
                            <Icon
                                name="pencil-outline"
                                type="material-community"
                                iconStyle={styles.iconOption}
                            />
                            <Text style={styles.options}>Editar curso</Text>
                        </TouchableOpacity>
                    )}
                    {showUnregisterOption && (
                        <TouchableOpacity
                            style={styles.container}
                            onPress={unregisterCourseOption}
                        >
                            <Icon
                                name="logout"
                                type="material-community"
                                iconStyle={styles.iconOption}
                            />
                            <Text style={styles.options}>
                                Desmatricularme del curso
                            </Text>
                        </TouchableOpacity>
                    )}
                    {showDeleteOption && (
                        <TouchableOpacity
                        style={styles.container}
                        onPress={deleteCourseOption}
                        >
                            <Icon
                                name="delete-alert"
                                type="material-community"
                                iconStyle={styles.iconOptionDelete}
                            />
                            <Text style={styles.optionsDelete}>
                                Eliminar curso PERMANENTEMENTE
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    textCourseName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: PRIMARY_COLOR
    },
    textCourseDescription: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray',
    },
    containerCourseInfo: {
        marginHorizontal: 10,
        marginTop: 10,
        borderLeftWidth: 2,
        borderStyle: 'solid',
        borderColor: PRIMARY_COLOR,
        backgroundColor: FIFTH_COLOR,
        padding: 10,
        borderRadius: 5,
    }, 
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
    iconOptionDelete: {
        fontSize: 20,
        paddingVertical: 10,
        paddingLeft: 25,
        paddingRight: 5,
        color: TEXT_COLOR_WRONG,
    },
    options: {
        fontSize: 18,
        paddingRight: 15,
        paddingVertical: 10,
    },
    optionsDelete: {
        fontSize: 18,
        paddingRight: 15,
        paddingVertical: 10,
        color: TEXT_COLOR_WRONG,
    },
    confirmationTitle: {
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    editTitle: {
        fontSize: 22,
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
    containerButtonOkDelete: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: TEXT_COLOR_WRONG,
    },
    containerButtonCancel: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: QUARTER_COLOR,
    },
});
