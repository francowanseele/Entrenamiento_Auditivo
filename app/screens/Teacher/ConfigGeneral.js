import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfigGeneral({ route }) {
    const navigation = useNavigation();

    const { rhythmic, melodic } = route.params;

    const newConfigDictation = () => {
        rhythmic && navigation.navigate('configRhythmicDictation');
        melodic && navigation.navigate('configMelodicDictation');
    };

    const searchConfigDictation = () => {
        navigation.navigate('findConfigDictation');
    };

    return (
        <View>
            <Text>Configuración general...</Text>
            <Button
                title="Consultar cofigs - Dictados existentes"
                onPress={searchConfigDictation}
            />
            <Button
                title="Nueva cofig - Dictado"
                onPress={newConfigDictation}
            />
        </View>
    );
}
