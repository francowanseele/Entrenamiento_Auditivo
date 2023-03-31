import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { FIFTH_COLOR, PRIMARY_COLOR, QUARTER_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../utils/colorPalette';
import CalificationOptions from '../../components/Calification/CalificationOptions';
import { useNavigation } from '@react-navigation/native';
import { tipoConfiguracion } from '../../../enums/tipoConfiguracion';
import { addCalification } from '../../api/calification';

export default function SolutionAcorde({ route }) {
    const { acorde } = route.params;

    const navigation = useNavigation();

    const [optionsCalification, setOptionsCalification] = useState(initializeOptionsCalification());

    const confirmFunction = async (option) => {
        // Save calification
        const data = {
            note: null,
            correct: option.correct,
            typeConfig: tipoConfiguracion.ConfiguracionAcordeJazz,
        };
        const result = await addCalification(data, acorde.id);

        if (result.ok) {
            navigation.goBack();
        } else {
            Alert.alert('No se ha podido guardar la calificación.');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acorde escuchado:</Text>
            <Text style={styles.nameAcorde}>{acorde.Nombre}</Text>

            <View style={{marginTop: 30}}>
                <CalificationOptions
                    confirmFunction={confirmFunction}
                    optionsCalification={optionsCalification} 
                />
            </View>
        </View>
    );
}

function initializeOptionsCalification() {
    return [
        {
            label: "Bien",
            correct: true,
        },
        {
            label: "Con errores",
            correct: false,
        },
    ]
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        color: PRIMARY_COLOR,
    },
    nameAcorde: {
        fontSize: 20,
        marginTop: 15,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        borderColor: QUARTER_COLOR
    }
})