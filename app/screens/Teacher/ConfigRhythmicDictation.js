import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfigRhythmicDictation({ route }) {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Configuración rítmica...</Text>
        </View>
    );
}
