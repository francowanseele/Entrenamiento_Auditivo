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
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({});
