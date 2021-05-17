import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    const moduloIn = () => {
        // Consultar si tiene dictados generados, si los tiene mostrarlos
        // si no tiene ningun generar 5 dictados nuevos y listarlos en la screen Module.js
        console.log('ver dictados del modulo');
        navigation.navigate('module');
    };

    return (
        <View>
            <Button title="Modulo 01" onPress={moduloIn} />
            <Button title="Modulo 02" onPress={moduloIn} />
            <Button title="Modulo 03" onPress={moduloIn} />
        </View>
    );
}
