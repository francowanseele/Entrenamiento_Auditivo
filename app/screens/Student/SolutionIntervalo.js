import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { tipoConfiguracion } from '../../../enums/tipoConfiguracion';
import {
    PRIMARY_COLOR,
    QUARTER_COLOR,
} from '../../../utils/colorPalette';
import CalificationOptions from '../../components/Calification/CalificationOptions';
import { useNavigation } from '@react-navigation/native';
import { addCalification } from '../../api/calification';

export default function SolutionIntervalo({ route }) {
    const { intervalo } = route.params;

    const navigation = useNavigation();

    const [optionsCalification, setOptionsCalification] = useState(initializeOptionsCalification());

    const showInterval = (intervalInput) => {
        let interval = intervalInput;
        interval = interval.split("A").join("+");
        interval = interval.split("d").join("-");
        interval = interval.split("P").join("J");
        return interval
    }

    const confirmFunction = async (option) => {
        // Save calification
        const data = {
            note: null,
            correct: option.correct,
            typeConfig: tipoConfiguracion.ConfiguracionIntervalo,
        };
        const result = await addCalification(data, intervalo.id);

        if (result.ok) {
            navigation.goBack();
        } else {
            Alert.alert('No se ha podido guardar la calificación.');
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Notas escuchadas:</Text>
                <Text style={styles.nameAcorde}>{intervalo.Notas.split(",").join(" - ")}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Intervalo escuchado:</Text>
                <Text style={styles.nameAcorde}>{showInterval(intervalo.Intervalo)}</Text>
            </View>

            <View style={{marginTop: 30}}>
                <CalificationOptions
                    confirmFunction={confirmFunction}
                    optionsCalification={optionsCalification} 
                />
            </View>
        </>
    );
}

function initializeOptionsCalification(){
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