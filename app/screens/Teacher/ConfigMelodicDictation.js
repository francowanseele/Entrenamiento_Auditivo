import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfigMelodicDictation({ route }) {
    const navigation = useNavigation();

    const goToConfigRhythmicDictation = () => {
        navigation.navigate('configRhythmicDictation');
    };

    return (
        <View>
            <Text>Configuración melódica...</Text>
            <Button title="Siguiente" onPress={goToConfigRhythmicDictation} />
        </View>
    );
}
