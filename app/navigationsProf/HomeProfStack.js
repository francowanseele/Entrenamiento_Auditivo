import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeProf from '../screens/Teacher/HomeProf';
import ConfigGeneral from '../screens/Teacher/ConfigGeneral';
import ConfigMelodicDictation from '../screens/Teacher/ConfigMelodicDictation';
import ConfigRhythmicDictation from '../screens/Teacher/ConfigRhythmicDictation';
import FindConfigDictation from '../screens/Teacher/FindConfigDictation';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="homeprof"
                component={HomeProf}
                options={{ title: 'Configuraciones de dictados' }}
            />
            <Stack.Screen
                name="configGeneral"
                component={ConfigGeneral}
                options={{ title: 'Configuración general' }}
            />
            <Stack.Screen
                name="configMelodicDictation"
                component={ConfigMelodicDictation}
                options={{ title: 'Configuración Melódica' }}
            />
            <Stack.Screen
                name="configRhythmicDictation"
                component={ConfigRhythmicDictation}
                options={{ title: 'Configuración Rítmica' }}
            />
            <Stack.Screen
                name="findConfigDictation"
                component={FindConfigDictation}
                options={{ title: 'Configuraciones existente' }}
            />
        </Stack.Navigator>
    );
}
