import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Module() {
    const navigation = useNavigation();

    const openDictado = () => {
        console.log('open dictado');
    };

    return (
        <View>
            <Button title="Dictado 01" onPress={openDictado} />
            <Button title="Dictado 02" onPress={openDictado} />
            <Button title="Dictado 03" onPress={openDictado} />
            <Button title="Dictado 04" onPress={openDictado} />
            <Button title="Dictado 05" onPress={openDictado} />
        </View>
    );
}
