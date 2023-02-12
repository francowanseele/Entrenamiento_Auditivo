import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import { PRIMARY_COLOR, TEXT_COLOR_WRONG } from '../../../utils/colorPalette';

import { add } from '../../api/giro_melodico_grupo';

export default function OverlayFormGiroMelodicoGrupo(props) {
    const { visible, setVisible, subGrupoId, nameSubGrupo, setElement, error } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const confirmation = async () => {
        const data = {
            name: name,
            level: subGrupoId ? 1 : 0, 
            subGrupoId: subGrupoId,
        };

        const resultGrupoAdded = await add(data);

        if (resultGrupoAdded.ok) {
            setElement(resultGrupoAdded.element);
        } else {
            Alert.alert('Error al agregar un nuevo grupo. Consulte con soporte.');
        }

        setVisible(!visible);
    };

    const cancel = () => {
        setVisible(!visible);
    };

    const onChange = (event) => {
        setName(event.nativeEvent.text);
    };

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={
                !error
                    ? styles.overlaySelectPicker
                    : styles.overlaySelectPickerError
            }
        >
            {!error ? (
                <ScrollView>
                    <View>
                        <Text style={styles.title}>
                            {subGrupoId ?  "Agregar nuevo subgrupo para " + nameSubGrupo : "Agregar nuevo grupo"}
                        </Text>
                        <Input
                            placeholder="Nombre"
                            containerStyle={styles.inputForm}
                            onChange={(e) => onChange(e)}
                            label={subGrupoId ? "Nombre del subgrupo": "Nombre del grupo"}
                            value={name}
                        />
                    </View>
                    <View style={styles.contentButtons}>
                        <Button
                            title="Confirmar"
                            onPress={confirmation}
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
            ) : (
                <View style={styles.containerError}>
                    <Text style={styles.titleError}>UPS...</Text>
                    <Text style={styles.msjError}>
                        Seleccione un GRUPO antes de agregar un nuevo SUBGRUPO.
                    </Text>
                </View>
            )}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    inputForm: {
        width: '100%',
        marginTop: 20,
    },
    overlaySelectPicker: {
        width: '100%',
        height: '100%',
        paddingTop: '20%',
    },
    overlaySelectPickerError: {
        width: '100%',
        height: '50%',
    },
    containerTitle: {
        flexDirection: 'row',
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%',
    },
    btnOk: {
        width: '20%',
    },
    containerError: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: 15,
    },
    titleError: {
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold',
    },
    msjError: {
        fontSize: 17,
    },
    contentButtons: {
        flexDirection: 'row',
    },
});
