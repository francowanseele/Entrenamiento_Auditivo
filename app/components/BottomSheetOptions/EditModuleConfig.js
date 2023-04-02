import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getParams, getStorageIsAdmin, getStorageIsStudent, setStorageCurrentCourse } from '../../../utils/asyncStorageManagement';
import { FIFTH_COLOR, PRIMARY_COLOR, QUARTER_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, TEXT_COLOR_WRONG } from '../../../utils/colorPalette';
import { CLOSE_BOTTOM_SHEET } from '../../../utils/constants';
import { editConfigDictationApi, editCourseApi, editModuleApi, removeConfigurationApi, removeModuleApi, unregisterStudentFromCourseApi, unregisterTeacherFromCourseApi } from '../../api/course';
import Loading from '../Loading';

export default function EditModuleConfig(props) {
    const {
        refRBSheet,
        isModule,
        isConfigDictation,
        idCourse,
        idModule,
        idConfigDictation,
        name,
        description,
        setUpdateCoursesStudent,
        updateCoursesStudent,
        updateAllModules,
        setUpdateAllModules,
        permissionToEdit,
        tipoConfigToEdit,
        updateScreenFunction
    } = props;

    const [bootomSheetType, setBootomSheetType] = useState('');

    const [confirmationTitle, setConfirmationTitle] = useState('');
    const [confirmationText, setConfirmationText] = useState('');

    // Bottom sheet - Edit
    const [nameLocal, setNameLocal] = useState('');
    const [descriptionLocal, setDescriptionLocal] = useState('');
    const [showDeleteOption, setShowDeleteOption] = useState(false);

    const [height, setHeight] = useState(0.5);

    const initialStateOpen = async () => {        
        setBootomSheetType('');
        setHeight(0.5);

        await setNameLocal(name);
        await setDescriptionLocal(description);

        const isAdmin = await getStorageIsAdmin();
        await setShowDeleteOption(isAdmin);
    };

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

    const deleteModuleOption = () => {
        setConfirmationTitle('Eliminar');
        setConfirmationText(`¿Está seguro que desea eliminar el ${isModule ? 'módulo' : 'generador'} ${name}? Los estudiantes que quieran entrenarse con este ${isModule ? 'módulo' : 'generador'} ya no podrán hacerlo.`);
        setBootomSheetType('delete');
    }

    const deleteModuleConfig = async () => {
        let ok = false;
        if (isModule) {
            const result = await removeModuleApi(idModule);
            ok = result.ok;
        } else {
            const result = await removeConfigurationApi(idConfigDictation, tipoConfigToEdit);
            ok = result.ok;
        }

        if (ok) {
            Alert.alert(`${isModule ? 'Módulo' : 'Generador'} eliminado correctamente.`)
        } else {
            Alert.alert(`Algo sucedió mal, no se pudo eliminar el ${isModule ? 'Módulo' : 'Generador'} :(`)
        }

        updateScreenFunction();
        refRBSheet.current.close();
    }

    const edit = async () => {
        const { id } = await getParams();
        const data = {
            name: nameLocal, 
            description: descriptionLocal,
        };

        if(isModule) {
            const edited = await editModuleApi(data, idCourse, id, idModule);
            if (edited.ok) {
                refRBSheet.current.close();
                await setUpdateAllModules(!updateAllModules);
            }
        } else {
            const edited = await editConfigDictationApi(data, idCourse, id, idConfigDictation, tipoConfigToEdit);
            if (edited.ok) {
                refRBSheet.current.close();
                await setUpdateAllModules(!updateAllModules);
            }
        }

        await setUpdateCoursesStudent(!updateCoursesStudent);       
    }

    const onChangeNameLocal = (event) => {
        setNameLocal(event.nativeEvent.text);
    };

    const onChangeDescriptionLocal = (event) => {
        setDescriptionLocal(event.nativeEvent.text);
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
            {bootomSheetType == 'edit' ? (
                !permissionToEdit ? (
                    <View style={styles.containerConfirmation}>
                        <Text style={styles.editTitle}>
                            No tienes permiso de editar
                        </Text>
                    </View>
                ) : (
                    <View style={styles.containerConfirmation}>
                        <Text style={styles.editTitle}>
                            Editar{' '}
                            {isModule
                                ? 'Módulo'
                                : isConfigDictation
                                ? 'Configuración'
                                : ''}
                        </Text>
                        <Input
                            placeholder="Nombre"
                            onChange={(e) => onChangeNameLocal(e)}
                            label={`Nombre de ${
                                isModule
                                    ? 'Módulo'
                                    : isConfigDictation
                                    ? 'Configuración'
                                    : ''
                            }`}
                            value={nameLocal}
                        />
                        <Input
                            placeholder="Descripción"
                            onChange={(e) => onChangeDescriptionLocal(e)}
                            label={`Descripción de ${
                                isModule
                                    ? 'Módulo'
                                    : isConfigDictation
                                    ? 'Configuración'
                                    : ''
                            }`}
                            value={descriptionLocal}
                        />
                        <View style={styles.containerButtons}>
                            <Button
                                buttonStyle={styles.containerButtonOk}
                                title="Confirmar"
                                onPress={edit}
                            />
                            <Button
                                buttonStyle={styles.containerButtonCancel}
                                title="Cancelar"
                                onPress={() => refRBSheet.current.close()}
                            />
                        </View>
                    </View>
                )
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
                            onPress={deleteModuleConfig}
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
                    <TouchableOpacity
                        style={styles.container}
                        onPress={editOption}
                    >
                        <Icon
                            name="pencil-outline"
                            type="material-community"
                            iconStyle={styles.iconOption}
                        />
                        <Text style={styles.options}>
                            Editar{' '}
                            {isModule
                                ? 'Módulo'
                                : isConfigDictation
                                ? 'Configuración'
                                : ''}
                        </Text>
                    </TouchableOpacity>
                    {showDeleteOption && (
                        <TouchableOpacity
                            style={styles.container}
                            onPress={deleteModuleOption}
                        >
                            <Icon
                                name="delete-alert"
                                type="material-community"
                                iconStyle={styles.iconOptionDelete}
                            />
                            <Text style={styles.optionsDelete}>
                                Eliminar {isModule ? 'módulo' : 'generador'} PERMANENTEMENTE
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
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
    containerButtonCancel: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: QUARTER_COLOR,
    },
    containerButtonOkDelete: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: TEXT_COLOR_WRONG,
    },
});
