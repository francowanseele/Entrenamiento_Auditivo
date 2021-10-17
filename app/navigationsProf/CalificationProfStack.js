import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalificationProf from '../screens/Teacher/CalificationProf';
import { TOPSCREENHOME, TEXTHOME } from '../styles/styleValues';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="calificationprof"
                component={CalificationProf}
                options={{ 
                    title: 'Calificaciones',
                    headerStyle: {
                        backgroundColor: TOPSCREENHOME,
                      },
                      headerTintColor: TEXTHOME,
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                     }}
            />
        </Stack.Navigator>
    );
}
