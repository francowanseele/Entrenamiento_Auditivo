import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Calification from '../screens/Student/Calification';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="calification"
                component={Calification}
                options={{ title: 'Calificaciones' }}
            />
        </Stack.Navigator>
    );
}
