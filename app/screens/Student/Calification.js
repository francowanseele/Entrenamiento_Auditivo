import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BACKGROUNDHOME, ITEMSHOME } from '../../styles/styleValues';
import { LinearGradient } from 'expo-linear-gradient';

export default function Calification() {
    return (
        <LinearGradient
            style={styles.lineargradient}
            // Background Linear Gradient
            colors={[BACKGROUNDHOME, BACKGROUNDHOME, ITEMSHOME, ITEMSHOME]}
        >
            <View>
                <Text>Calificaciones...</Text>
            </View>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    lineargradient: {
        height: '100%',
    },
});
