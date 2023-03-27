import React from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import {
    PRIMARY_COLOR,
    QUARTER_COLOR,
} from '../../../utils/colorPalette';

export default function SolutionIntervalo({ route }) {
    const { intervalo } = route.params;
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Notas escuchadas:</Text>
                <Text style={styles.nameAcorde}>{intervalo.Notas.split(",").join(" - ")}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Intervalo escuchado:</Text>
                <Text style={styles.nameAcorde}>{intervalo.Intervalo}</Text>
            </View>
        </>
    );
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