import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';

import { addModulesApi, getModulesApi } from '../../api/course';

export default function OverlayPicker(props) {
    const { visible, setVisible, idCourse, nameCourse, setModule } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const confirmation = async () => {
        const data = {
            name: name,
            description: description,
        };

        const resultAddModule = await addModulesApi(idCourse, data);
        if (resultAddModule.ok) {
            const resultModules = await getModulesApi(idCourse);
            var dataModule = { id: null, name: '' };
            resultModules.modules.forEach((m) => {
                if (m.nombre == name && m.descripcion == description) {
                    dataModule = {
                        id: m._id,
                        name: m.nombre,
                    };
                }
            });
            setModule(dataModule);
            setVisible(!visible);
        } else {
            // TODO error al agregar un módulo
            console.log('error al agregar módulo nuevo');
        }
    };

    const cancel = () => {
        setVisible(!visible);
    };

    const onChange = (event, nro) => {
        if (nro == 1) {
            setName(event.nativeEvent.text);
        } else if (nro == 2) {
            setDescription(event.nativeEvent.text);
        }
    };

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={styles.overlaySelectPicker}
        >
            {idCourse != null ? (
                <ScrollView>
                    <View>
                        <Text style={styles.title}>
                            Nuevo Módulo para el curso {nameCourse}
                        </Text>
                        <Input
                            placeholder="Nombre"
                            containerStyle={styles.inputForm}
                            onChange={(e) => onChange(e, 1)}
                            label="Nombre del Módulo"
                            value={name}
                        />
                        <Input
                            placeholder="Descripción"
                            containerStyle={styles.inputForm}
                            onChange={(e) => onChange(e, 2)}
                            label="Descripción del Módulo"
                            value={description}
                        />
                    </View>
                    <View style={styles.contentButtons}>
                        <Button title="Confirmar" onPress={confirmation} />
                        <Button title="Cancelar" onPress={cancel} />
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.containerError}>
                    <Text style={styles.titleError}>UPS...</Text>
                    <Text style={styles.msjError}>
                        Seleccione un curso antes de crear un nuevo Módulo
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
        width: '90%',
        height: '40%',
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
