import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeProf() {
    const navigation = useNavigation();

    const configureRhythmicDictation = () => {
        navigation.navigate('configGeneral', {
            rhythmic: true,
            melodic: false,
        });
    };

    const configureMelodicDictation = () => {
        navigation.navigate('configGeneral', {
            rhythmic: false,
            melodic: true,
        });
    };

    return (
        <View>
            <Button
                title="Dictados Rítmicos"
                onPress={configureRhythmicDictation}
            />
            <Button
                title="Dictados Melódicos"
                onPress={configureMelodicDictation}
            />
        </View>
    );
}
