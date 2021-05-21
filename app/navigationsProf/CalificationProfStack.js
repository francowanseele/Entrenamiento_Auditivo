import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalificationProf from '../screens/Teacher/CalificationProf';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="calificationprof"
                component={CalificationProf}
                options={{ title: 'Calificaciones - Estudiantes' }}
            />
        </Stack.Navigator>
    );
}
