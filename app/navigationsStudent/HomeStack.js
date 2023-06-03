import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Student/Home';
import Dictation from '../screens/Student/Dictation';
import Solution from '../screens/Student/Solution';
import ConfigDictation from '../screens/Student/ConfigDictation';
import {
    TOPSCREEN,
    TEXTHOME,
    TABSCREENHOMETEXT,
    TOPSCREENHOME,
} from '../styles/styleValues';
import ConfigAcordesJazz from '../screens/Student/ConfigAcordesJazz';
import AcordesPlay from '../screens/Student/AcordesPlay';
import SolutionAcorde from '../screens/Student/SolutionAcorde';
import ConfigIntervalo from '../screens/Student/ConfigIntervalo';
import IntervalosPlay from '../screens/Student/IntervalosPlay';
import SolutionIntervalo from '../screens/Student/SolutionIntervalo';
import ConfigDictadoArmonico from '../screens/Student/ConfigDictadoArmonico';
import DictaroArmonicoPlay from '../screens/Student/DictaroArmonicoPlay';
import SolutionDictadoArmonico from '../screens/Student/SolutionDictadoArmonico';

const Stack = createStackNavigator();

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    title: 'Curso',
                    //headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="config_dictation"
                component={ConfigDictation}
                options={{
                    title: 'Dictados',
                    // headerStyle: {
                    //     backgroundColor: TOPSCREENHOME,
                    // },
                    // headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="config_acordes_jazz"
                component={ConfigAcordesJazz}
                options={{
                    title: 'Acordes jazz',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="config_intervalos"
                component={ConfigIntervalo}
                options={{
                    title: 'Intervalos',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="config_dictados_armonicos"
                component={ConfigDictadoArmonico}
                options={{
                    title: 'Dictados',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="acordes_play"
                component={AcordesPlay}
                options={{
                    title: 'Acorde',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="dictado_armonico_play"
                component={DictaroArmonicoPlay}
                options={{
                    title: 'Dictado',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="intervalos_play"
                component={IntervalosPlay}
                options={{
                    title: 'Intervalo',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="dictation"
                component={Dictation}
                options={{
                    title: 'Dictado',
                    // headerStyle: {
                    //     backgroundColor: TOPSCREENHOME,
                    // },
                    // headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="solution"
                component={Solution}
                options={{
                    title: 'Solucion',
                    // headerStyle: {
                    //     backgroundColor: TOPSCREENHOME,
                    // },
                    // headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="solution_acorde"
                component={SolutionAcorde}
                options={{
                    title: 'Solución',
                    // headerStyle: {
                    //     backgroundColor: TOPSCREENHOME,
                    // },
                    // headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="solution_dictado_armonico"
                component={SolutionDictadoArmonico}
                options={{
                    title: 'Solución',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="solution_intervalo"
                component={SolutionIntervalo}
                options={{
                    title: 'Solución',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({});
