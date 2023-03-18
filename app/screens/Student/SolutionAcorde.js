import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { FIFTH_COLOR, PRIMARY_COLOR, QUARTER_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../utils/colorPalette';

export default function SolutionAcorde({ route }) {
    const { acorde } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Acorde escuchado:</Text>
            <Text style={styles.nameAcorde}>{acorde.Nombre}</Text>
        </View>
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