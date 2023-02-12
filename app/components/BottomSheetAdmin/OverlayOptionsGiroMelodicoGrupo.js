import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import { PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR_WRONG } from '../../../utils/colorPalette';
import { add, edit, remove } from '../../api/giro_melodico_grupo';

export default function OverlayOptionsGiroMelodicoGrupo(props) {
    const { visible, setVisible, refRBSheet, grupo, initialStateOpen, isAddGrupo, isSubgrupoOption } = props;

    const [deleteOption, setDeleteOption] = useState(false);
    const [addSubgrupo, setAddSubgrupo] = useState(false);
    const [editGrupo, setEditGrupo] = useState(false);
    const [newSubgrupoName, setNewSubgrupoName] = useState("");
    const [newGrupoName, setNewGrupoName] = useState("");

    useEffect(() => {
        if (visible) {
            setEditGrupo(false);
            setDeleteOption(false);
            setNewSubgrupoName("");
            setAddSubgrupo(false);
            setNewGrupoName("");
        }
    }, [visible])
    

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const cancel = () => {
        setVisible(!visible);
    };

    const deleteGrupoOption = () => {
        setDeleteOption(true);
    }

    const addSubgrupoOption = () => {
        setNewSubgrupoName("");
        setAddSubgrupo(true);
    }

    const addNewSubgrupo = async () => {
        if (newSubgrupoName == "") {
            Alert.alert('Debe ingresar un nombre para el subgrupo.');
        } else {
            const data = {
                name: newSubgrupoName,
                level: 1, 
                subGrupoId: grupo.id,
            };
    
            const resultGrupoAdded = await add(data);
    
            if (resultGrupoAdded.ok) {
                Alert.alert('Subgrupo creado correctamente.');
            } else {
                Alert.alert('Error al agregar un nuevo grupo.');
            }
    
            setVisible(!visible);

            initialStateOpen();
        }
    }

    const addGrupo = async () => {
        if (newGrupoName == "") {
            Alert.alert('Debe ingresar un nombre para el grupo.');
        } else {
            const data = {
                name: newGrupoName,
                level: 0, 
                subGrupoId: null,
            };
    
            const resultGrupoAdded = await add(data);
    
            if (resultGrupoAdded.ok) {
                Alert.alert('Grupo creado correctamente.');
            } else {
                Alert.alert('Error al agregar un nuevo grupo.');
            }
    
            setVisible(!visible);

            initialStateOpen();
        }
    }

    const editGrupoOption = () => {
        setNewSubgrupoName(grupo.Nombre);
        setEditGrupo(true);
    }

    const editGrupoAction = async () => {
        
        if (newSubgrupoName == "") {
            Alert.alert('Debe ingresar un nombre para el subgrupo.');
        } else {
            const data = {...grupo, name: newSubgrupoName};
    
            const resultGrupoAdded = await edit(grupo.id, data);
    
            if (resultGrupoAdded.ok) {
                Alert.alert('Subgrupo editado correctamente.');
            } else {
                Alert.alert('Error al editar un grupo.');
            }
    
            setVisible(!visible);

            initialStateOpen();
        }
    }

    const deleteGrupo = async () => {
        const result = await remove(grupo.id);

        if (result.ok) {
            Alert.alert('El grupo ha sido eliminado.');
        } else {
            Alert.alert('No se ha podido eliminar el grupo.');
        }

        setVisible(!visible);
        refRBSheet.current.close();
    }

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={
                !addSubgrupo && !editGrupo && !isAddGrupo
                    ? styles.overlayOptionsContainer
                    : styles.overlayOptionsContainerAddSubgrupo
            }
        >
            {deleteOption ? (
                <View style={styles.container}>
                    <Text style={styles.title}>Eliminar {isSubgrupoOption ? "Subgrupo" : "Grupo"} "{grupo?.Nombre}"</Text>
                    <Text style={styles.msj}>
                        Se eliminará el {isSubgrupoOption ? "Subgrupo" : "Grupo"} seleccionado{isSubgrupoOption ? "." : "y todos sus subgrupos."} Los Giros melódicos asociados al este serán movidos a una categoría "Sin Grupo" (no serán eliminados).
                    </Text>

                    <Button
                        title="Eliminar"
                        onPress={deleteGrupo}
                        buttonStyle={styles.buttonDeleteConfirmation}
                    />
                    <Button
                        title="Cancelar"
                        onPress={() => cancel()}
                        titleStyle={{color: PRIMARY_COLOR}}
                        type='clear'
                    />
                </View>
            ) : addSubgrupo ? (
                <ScrollView>
                    <View>
                        <Text style={styles.title}>
                            Agregar nuevo subgrupo para "{grupo?.Nombre}"
                        </Text>
                        <Input
                            placeholder="Nombre"
                            containerStyle={styles.inputForm}
                            onChange={(e) => setNewSubgrupoName(e.nativeEvent.text)}
                            label={"Nombre del subgrupo"}
                            value={newSubgrupoName}
                        />
                    </View>
                    <View style={styles.contentButtons}>
                        <Button
                            title="Confirmar"
                            onPress={addNewSubgrupo}
                            buttonStyle={{
                                backgroundColor: PRIMARY_COLOR,
                                paddingHorizontal: 15,
                                marginTop: 10,
                            }}
                        />
                        <Button
                            title="Cancelar"
                            onPress={cancel}
                            buttonStyle={{
                                marginTop: 10,
                            }}
                            titleStyle={{
                                color: TEXT_COLOR_WRONG,
                                textDecorationLine: 'underline',
                            }}
                            type="clear"
                        />
                    </View>
                </ScrollView>
            ) : editGrupo ? (
                <ScrollView>
                    <View>
                        <Text style={styles.title}>
                            Modificar {isSubgrupoOption ? "Subgrupo" : "Grupo"} "{grupo?.Nombre}"
                        </Text>
                        <Input
                            placeholder="Nombre"
                            containerStyle={styles.inputForm}
                            onChange={(e) => setNewSubgrupoName(e.nativeEvent.text)}
                            label={"Nombre del grupo"}
                            value={newSubgrupoName}
                        />
                    </View>
                    <View style={styles.contentButtons}>
                        <Button
                            title="Confirmar"
                            onPress={editGrupoAction}
                            buttonStyle={{
                                backgroundColor: PRIMARY_COLOR,
                                paddingHorizontal: 15,
                                marginTop: 10,
                            }}
                        />
                        <Button
                            title="Cancelar"
                            onPress={cancel}
                            buttonStyle={{
                                marginTop: 10,
                            }}
                            titleStyle={{
                                color: TEXT_COLOR_WRONG,
                                textDecorationLine: 'underline',
                            }}
                            type="clear"
                        />
                    </View>
                </ScrollView>
            ) : isAddGrupo ? (
                <ScrollView>
                    <View>
                        <Text style={styles.title}>
                            Crear nuevo grupo
                        </Text>
                        <Input
                            placeholder="Nombre"
                            containerStyle={styles.inputForm}
                            onChange={(e) => setNewGrupoName(e.nativeEvent.text)}
                            label={"Nombre del grupo"}
                            value={newGrupoName}
                        />
                    </View>
                    <View style={styles.contentButtons}>
                        <Button
                            title="Confirmar"
                            onPress={addGrupo}
                            buttonStyle={{
                                backgroundColor: PRIMARY_COLOR,
                                paddingHorizontal: 15,
                                marginTop: 10,
                            }}
                        />
                        <Button
                            title="Cancelar"
                            onPress={cancel}
                            buttonStyle={{
                                marginTop: 10,
                            }}
                            titleStyle={{
                                color: TEXT_COLOR_WRONG,
                                textDecorationLine: 'underline',
                            }}
                            type="clear"
                        />
                    </View>
                </ScrollView>
            ) : isSubgrupoOption ? (
                <View style={styles.container}>
                    <Text style={styles.title}>Acciones para "{grupo?.Nombre}"</Text>
                    <Button
                        title="Editar"
                        onPress={editGrupoOption}
                        buttonStyle={styles.buttonSecondary}
                    />
                    <Button
                        title="Cancelar"
                        onPress={cancel}
                        buttonStyle={styles.buttonTertiary}
                        titleStyle={{color: PRIMARY_COLOR}}
                        type='clear'
                    />
                    <Button
                        title="Eliminar grupo"
                        onPress={() => deleteGrupoOption()}
                        buttonStyle={styles.buttonDelete}
                        titleStyle={{color: 'darkred'}}
                        type='clear'
                    />
                </View>
            ) : (   
                <View style={styles.container}>
                    <Text style={styles.title}>Acciones para "{grupo?.Nombre}"</Text>
                    <Button
                        title="Crear subgrupo"
                        onPress={addSubgrupoOption}
                        buttonStyle={styles.buttonPrimary}
                    />
                    <Button
                        title="Editar"
                        onPress={editGrupoOption}
                        buttonStyle={styles.buttonSecondary}
                    />
                    <Button
                        title="Cancelar"
                        onPress={cancel}
                        buttonStyle={styles.buttonTertiary}
                        titleStyle={{color: PRIMARY_COLOR}}
                        type='clear'
                    />
                    <Button
                        title="Eliminar grupo"
                        onPress={() => deleteGrupoOption()}
                        buttonStyle={styles.buttonDelete}
                        titleStyle={{color: 'darkred'}}
                        type='clear'
                    />
                </View>
            )}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlayOptionsContainer: {
        width: '100%',
        height: '50%',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: 15,
    },
    title: {
        marginBottom: 50,
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonPrimary: {
        backgroundColor: PRIMARY_COLOR,
        marginVertical: 15
    },
    buttonSecondary: {
        backgroundColor: SECONDARY_COLOR,
    },
    buttonTertiary: {
        marginVertical: 15,
        color: PRIMARY_COLOR,
    },
    buttonDelete: {
        marginTop: 50,
    },
    msj: {
        fontSize: 17,
        marginBottom: 15,
    },
    buttonDeleteConfirmation: {
        backgroundColor: 'darkred'
    },
    overlayOptionsContainerAddSubgrupo: {
        width: '100%',
        height: '100%',
        paddingTop: '20%',
    },
    inputForm: {
        width: '100%',
        marginTop: 20,
    },
    contentButtons: {
        flexDirection: 'row',
    },
})