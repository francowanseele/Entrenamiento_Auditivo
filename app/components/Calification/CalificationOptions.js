import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, ScrollView } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { PRIMARY_COLOR, QUARTER_COLOR } from '../../../utils/colorPalette';

export default function CalificationOptions(props) {
    const { optionsCalification, confirmFunction } = props;
    // optionsCalification = [ { label: string, note: int, correct: bool } ]

    const [optionSelected, setOptionSelected] = useState(null);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const selectOption = (opt) => {
        setOptionSelected(opt);
        setVisible(true);
    }

    const confirmation = () => {
        confirmFunction(optionSelected);
        setVisible(!visible);
    }

    return (
        <ScrollView>
            {optionsCalification.map((opt, i) => (
                <Button
                    titleStyle={styles.titleButtonOption}
                    buttonStyle={styles.buttonOption}
                    key={i}
                    title={opt.label}
                    type='outline'
                    onPress={() => selectOption(opt)}
                />
            ))}

            <Overlay 
                isVisible={visible} 
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.overlayOptions}
            >
                <ScrollView>
                    <Text style={styles.ovelayTitle}>Como estimativo, consideras que en el ejercicio has tenido: "{optionSelected?.label}" ?</Text>
                    <Text style={styles.ovelayContent}>Esto nos sirve para guardar tu progreso y ayudarte en a mejorar en lo que te haga falta. Nadie más que tu verá tus calificaciones.</Text>
                    <View style={styles.contentButtons}>
                        <Button
                            containerStyle={styles.buttonConfirmation}
                            buttonStyle={styles.buttonStyleConfirmationOk}
                            title={'Aceptar'}
                            onPress={() => confirmation()}
                        />
                        <Button
                            containerStyle={styles.buttonConfirmation}
                            buttonStyle={styles.buttonStyleConfirmationCancel}
                            title={'Cancelar'}
                            onPress={toggleOverlay}
                        />
                    </View>
                </ScrollView>
            </Overlay>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleButtonOption: {
        color: PRIMARY_COLOR,
    },
    buttonOption: {
        marginVertical: 5,
        width: '100%',
    },
    overlayOptions: {
        width: '90%',
        height: '60%',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    ovelayTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        marginBottom: 25
    },
    ovelayContent: {
        fontSize: 16,
    },
    contentButtons: {
        marginTop: 50,
        flexDirection: 'row',
        width: '100%',
    },
    buttonConfirmation: {
        width: '50%'
    },
    buttonStyleConfirmationOk: {
        backgroundColor: PRIMARY_COLOR
    },
    buttonStyleConfirmationCancel: {
        backgroundColor: QUARTER_COLOR
    }
})
